import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../api/chatApi";

import ChatHeader from "../components/chat/ChatHeader";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";
import SourceCitation from "../components/chat/SourceCitation";

function Chat() {
   console.log("Chat Rendered");
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const processedQuestion = useRef(null);
  const navigate = useNavigate();

  const handleResponse = (question, data) => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        message: question,
      },
      {
        sender: "ai",
        message: data.answer,
        sources: data.sources,
      },
    ]);
  };

  useEffect(() => {
  const question = location.state?.question;

  if (!question) return;

  if (processedQuestion.current === question) return;

  processedQuestion.current = question;

  const loadQuestion = async () => {
    try {
      const data = await askQuestion(question);

      handleResponse(question, data);

      window.history.replaceState({}, document.title);
    } catch (error) {
      console.error(error);
    }
  };

  loadQuestion();
}, [location.key]);

  return (
    <div className="space-y-6">
      <ChatHeader />

      <div className="bg-gray-100 rounded-xl p-6 space-y-5 min-h-[450px]">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            sender={msg.sender}
            message={msg.message}
            sources={msg.sources}
          />
        ))}
      </div>

      <ChatInput onResponse={handleResponse} />
    </div>
  );
}

export default Chat;