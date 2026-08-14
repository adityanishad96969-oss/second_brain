import time

from app.services.retriever import Retriever
from app.services.context_builder import build_context
from app.services.llm import LLMService
from app.services.settings_service import SettingsService


class RAGService:

    def __init__(self):
        self.retriever = Retriever()
        self.llm = LLMService()

    def ask(self, question: str):

        total_start = time.perf_counter()

        # -------------------------
        # Load settings
        # -------------------------

        settings = SettingsService.load()

        top_k = max(1, settings["top_k"])

        # -------------------------
        # Retrieval
        # -------------------------

        start = time.perf_counter()

        results = self.retriever.search(
            question,
            k=top_k
        )

        print(
            f"[TIMING] Retrieval: "
            f"{time.perf_counter() - start:.2f}s"
        )

        # -------------------------
        # Check relevance
        # -------------------------

        best_distance = (
            results[0]["distance"]
            if results
            else 999
        )

        # -------------------------
        # No relevant document
        # -------------------------

        if best_distance > 0.8:

            prompt = f"""
You are a helpful AI assistant.

Answer the following question using your own knowledge.

Question:
{question}
"""

            start = time.perf_counter()

            answer = self.llm.generate(prompt)

            print(
                f"[TIMING] NVIDIA LLM: "
                f"{time.perf_counter() - start:.2f}s"
            )

            print(
                f"[TIMING] TOTAL: "
                f"{time.perf_counter() - total_start:.2f}s"
            )

            return {
                "answer": answer,
                "sources": []
            }

        # -------------------------
        # Build context
        # -------------------------

        start = time.perf_counter()

        context = build_context(results)

        print(
            f"[TIMING] Context building: "
            f"{time.perf_counter() - start:.2f}s"
        )

        # -------------------------
        # Build prompt
        # -------------------------

        prompt = f"""
You are a helpful AI assistant.

Answer using the provided document context.

Context:
{context}

Question:
{question}

If the answer is fully supported by the documents, use them.
If the documents are incomplete, you may supplement the answer with your general knowledge.
"""

        # -------------------------
        # LLM
        # -------------------------

        start = time.perf_counter()

        answer = self.llm.generate(prompt)

        print(
            f"[TIMING] NVIDIA LLM: "
            f"{time.perf_counter() - start:.2f}s"
        )

        print(
            f"[TIMING] TOTAL: "
            f"{time.perf_counter() - total_start:.2f}s"
        )

        return {
            "answer": answer,
            "sources": results
        }