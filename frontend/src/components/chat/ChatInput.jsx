import { useState } from "react";
import { Send } from "lucide-react";
import { askQuestion } from "../../api/chatApi";

function ChatInput({ onResponse }) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) return;

    setLoading(true);

    try {
      const data = await askQuestion(trimmedQuestion);

      onResponse(trimmedQuestion, data);

      setQuestion("");
    } catch (error) {
      console.error("Chat request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex gap-3">
      <input
        type="text"
        value={question}
        disabled={loading}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder={
          loading
            ? "AI is thinking..."
            : "Ask anything about your knowledge..."
        }
        className="flex-1 outline-none disabled:opacity-50"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !loading) {
            handleSend();
          }
        }}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={20} />
      </button>
    </div>
  );
}

export default ChatInput;