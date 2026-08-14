def build_context(results):

    if not results:
        return "No relevant context found."

    context = []

    for i, item in enumerate(results, start=1):

        context.append(
            f"""
Source {i}
File: {item['source']}
Chunk: {item['chunk']}

{item['text']}
"""
        )

    return "\n".join(context)