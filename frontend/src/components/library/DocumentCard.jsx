import { FileText, Star, Trash2 } from "lucide-react";
import { deleteFile } from "../../api/uploadApi";

function DocumentCard({ title, size, date, type, onDelete }) {

  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      `Delete ${title}?`
    );

    if (!confirmDelete) return;

    try {

      await deleteFile(title);

      alert("Document deleted successfully.");

      if (onDelete) {
        onDelete();
      }

    } catch (error) {

      console.error(error);

      alert("Failed to delete document.");

    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">

      <div className="flex justify-between items-start">

        <div className="flex gap-3">

          <FileText className="text-blue-600" size={35} />

          <div>

            <h2 className="font-semibold text-lg">
              {title}
            </h2>

            <p className="text-gray-500 text-sm">
              {type}
            </p>

          </div>

        </div>

        <Star
          className="text-gray-400 hover:text-yellow-500 cursor-pointer"
          size={20}
        />

      </div>

      <div className="mt-6 flex justify-between text-sm text-gray-500">

        <span>{size}</span>

        <span>{date}</span>

      </div>

      <div className="mt-5 flex justify-end">

        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={20} />
        </button>

      </div>

    </div>
  );
}

export default DocumentCard;