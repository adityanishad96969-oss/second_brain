from sentence_transformers import SentenceTransformer


class EmbeddingService:

    _model = None

    @classmethod
    def get_model(cls):
        if cls._model is None:
            cls._model = SentenceTransformer(
                "all-MiniLM-L6-v2"
            )
        return cls._model

    def embed_text(self, text: str):
        model = self.get_model()
        return model.encode(
            text,
            convert_to_numpy=True
        ).tolist()

    def embed_chunks(self, chunks):
        model = self.get_model()

        result = []

        for chunk in chunks:
            embedding = model.encode(
                chunk["text"],
                convert_to_numpy=True
            ).tolist()

            result.append(
                {
                    **chunk,
                    "embedding": embedding
                }
            )

        return result