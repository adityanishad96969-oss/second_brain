import { useState } from "react";
import { createNote } from "../../api/noteApi";

function CreateNoteModal({ onClose,onNoteCreated }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");

  const handleSave = async () => {

    try {

      const newNote = await createNote({
        title,
        content,
         tag,
});

console.log("New note:", newNote);
onNoteCreated(newNote);

onClose();

    } catch (error) {

      console.error(error);

    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-[500px] space-y-4">

        <h2 className="text-2xl font-bold">
          New Note
        </h2>

        <input
          placeholder="Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />

        <textarea
          rows={8}
          placeholder="Write your note..."
          className="w-full border p-2 rounded"
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />

        <input
          placeholder="Tag"
          className="w-full border p-2 rounded"
          value={tag}
          onChange={(e)=>setTag(e.target.value)}
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}

export default CreateNoteModal;