from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.routes.settings import DEFAULT_SETTINGS


class TextChunker:

    def __init__(
        self,
        chunk_size=DEFAULT_SETTINGS["chunk_size"],
        chunk_overlap=DEFAULT_SETTINGS["chunk_overlap"]
    ):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                ""
            ]
        )

    def split(self, text: str, source: str):

     chunks = self.splitter.split_text(text)

     result = []

     for index, chunk in enumerate(chunks):

        result.append(
            {
                "id": index,
                "source": source,
                "text": chunk
            }
        )

     return result