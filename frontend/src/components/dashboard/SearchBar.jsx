import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SearchBar() {

  const [question, setQuestion] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
     console.log("Searching:", question);

    if (!question.trim()) return;

    navigate("/chat", {
      state: {
        question
      }
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">

      <Search
        size={20}
        className="text-gray-500 cursor-pointer"
        onClick={handleSearch}
      />

      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
        placeholder="Search your knowledge..."
        className="w-full outline-none"
      />

    </div>
  );
}

export default SearchBar;