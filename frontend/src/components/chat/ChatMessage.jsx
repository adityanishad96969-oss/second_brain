function ChatMessage({ sender, message, sources }) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl rounded-2xl px-5 py-4 shadow ${
          isUser ? "bg-blue-600 text-white" : "bg-white"
        }`}
      >
        <p>{message}</p>

        {!isUser && sources && sources.length > 0 && (
          <div className="mt-4 border-t pt-3">
            <h4 className="font-semibold mb-2">Sources</h4>

            <ul className="list-disc list-inside text-sm">
              {sources.map((source, index) => (
                <li key={index}>
                  {source.source}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;