function ViewNoteModal({ note, onClose }) {

  if (!note) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl w-[700px] p-6">

        <div className="flex justify-between items-center">

          <h2 className="text-2xl font-bold">
            {note.title}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 text-xl"
          >
            ✕
          </button>

        </div>

        <div className="mt-4">

          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {note.tag}
          </span>

          <p className="text-gray-500 mt-2">
            {note.date}
          </p>

        </div>

        <div className="mt-6 whitespace-pre-wrap leading-7">
          {note.content}
        </div>

      </div>

    </div>
  );
}

export default ViewNoteModal;