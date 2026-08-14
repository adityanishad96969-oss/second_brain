import { Plus } from "lucide-react";

function NewNoteButton({onClick}) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2">
      <Plus size={18} />

      New Note
    </button>
  );
}

export default NewNoteButton;