from pathlib import Path
from pypdf import PdfReader
from docx import Document


class DocumentLoader:

    @staticmethod
    def load(file_path: str) -> str:
        extension = Path(file_path).suffix.lower()

        if extension == ".pdf":
            return DocumentLoader.read_pdf(file_path)

        elif extension == ".docx":
            return DocumentLoader.read_docx(file_path)

        elif extension == ".txt":
            return DocumentLoader.read_txt(file_path)

        elif extension == ".md":
            return DocumentLoader.read_md(file_path)

        else:
            raise ValueError(
                f"Unsupported file type: {extension}"
            )

    @staticmethod
    def read_pdf(file_path: str) -> str:

        reader = PdfReader(file_path)

        text = ""

        for page in reader.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

        return text

    @staticmethod
    def read_docx(file_path: str) -> str:

        document = Document(file_path)

        return "\n".join(
            paragraph.text
            for paragraph in document.paragraphs
        )

    @staticmethod
    def read_txt(file_path: str) -> str:

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            return file.read()

    @staticmethod
    def read_md(file_path: str) -> str:

        with open(
            file_path,
            "r",
            encoding="utf-8"
        ) as file:

            return file.read()