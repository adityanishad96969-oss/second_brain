from app.db.chroma import ChromaService
from app.services.embeddings import EmbeddingService


class Retriever:

    def __init__(self):

        self.embedding_service = EmbeddingService()
        self.db = ChromaService()

    def search(
        self,
        query: str,
        k: int = 5
    ):

        query_embedding = self.embedding_service.embed_text(
            query
        )

        results = self.db.similarity_search(
            query_embedding,
            k
        )

        documents = results["documents"][0]
        metadatas = results["metadatas"][0]
        distances = results["distances"][0]

        retrieved = []

        for doc, metadata, distance in zip(
            documents,
            metadatas,
            distances
        ):

            retrieved.append(
                {
                    "text": doc,
                    "source": metadata["source"],
                    "chunk": metadata["chunk"],
                    "distance": round(distance, 4)
                }
            )

        return retrieved