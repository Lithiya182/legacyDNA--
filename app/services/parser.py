import pdfplumber


def parse_pdf(path: str) -> str:
    text = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text + "\n"

    return text


def parse_txt(path: str) -> str:
    with open(path, "r", encoding="utf-8") as file:
        return file.read()
print(parse_txt("sample.txt"))  