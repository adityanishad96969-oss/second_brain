from openai import OpenAI
from app.core.config import settings
from app.services.settings_service import SettingsService


class LLMService:

    _client = None

    @classmethod
    def get_client(cls):
        if cls._client is None:
            cls._client = OpenAI(
                api_key=settings.NVIDIA_API_KEY,
                base_url="https://integrate.api.nvidia.com/v1"
            )

        return cls._client

    def generate(self, prompt: str):

        client = self.get_client()

        ai_settings = SettingsService.load()

        model = ai_settings.get(
            "model",
            "nvidia/nemotron-3-ultra-550b-a55b"
        )

        temperature = ai_settings.get(
            "temperature",
            0.3
        )

        response = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an AI assistant for a Personal Knowledge Base. "
                        "Answer using the provided context when available. "
                        "If the answer is not in the context, say so clearly."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=temperature,
        )

        return response.choices[0].message.content