import { Pin, Trash2 } from "lucide-react";

function NoteCard({ 
  title, 
  content, 
  tag, 
  date, 
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between">

        <h2 className="font-bold text-lg">
          {title}
        </h2>

        <Pin
          className="text-gray-400 hover:text-yellow-500 cursor-pointer"
          size={20}
        />

      </div>

      <p className="text-gray-600 mt-3">
        {content}
      </p>

      <div className="flex justify-between mt-6 text-sm text-gray-500">

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {tag}
        </span>

        <span>{date}</span>

      </div>

      <div className="flex justify-end mt-5">

  <button
    onClick={(e) => {
      e.stopPropagation();
      onDelete();
    }}
    className="text-red-600 hover:text-red-800"
  >
    <Trash2 size={20} />
  </button>

</div>

    </div>
  );
}

export default NoteCard;