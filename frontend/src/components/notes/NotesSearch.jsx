import { Search } from "lucide-react";

function NotesSearch({ value, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">

      <Search className="text-gray-500" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search notes..."
        className="w-full outline-none"
      />

    </div>
  );
}

export default NotesSearch;