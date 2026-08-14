import chromadb

class ChromaService:

    _instance = None

    def __new__(cls):

        if cls._instance is None:

            cls._instance = super().__new__(cls)

            cls._instance.client = chromadb.PersistentClient(
                path="chroma_db"
            )

            cls._instance.collection = (
                cls._instance.client.get_or_create_collection(
                    name="second_brain"
                )
            )

        return cls._instance

    def add_chunks(self, chunks):

        ids = []
        documents = []
        embeddings = []
        metadatas = []

        for chunk in chunks:

            ids.append(
                f"{chunk['source']}_{chunk['id']}"
            )

            documents.append(
                chunk["text"]
            )

            embeddings.append(
                chunk["embedding"]
            )

            metadatas.append(
                {
                    "source": chunk["source"],
                    "chunk": chunk["id"]
                }
            )

        self.collection.add(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas
        )

    def similarity_search(
        self,
        query_embedding,
        k=5
    ):

        return self.collection.query(
            query_embeddings=[query_embedding],
            n_results=k
        )

    def count(self):

        return self.collection.count()

    def delete_document(
        self,
        filename
    ):

        results = self.collection.get()

        ids = []

        for i, metadata in enumerate(
            results["metadatas"]
        ):

            if metadata["source"] == filename:

                ids.append(
                    results["ids"][i]
                )

        if ids:
            self.collection.delete(ids=ids)