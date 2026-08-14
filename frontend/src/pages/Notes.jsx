import { useState, useEffect } from "react";
import { getNotes,deleteNote } from "../api/noteApi";
import CreateNoteModal from "../components/notes/CreateNoteModal";
import NotesHeader from "../components/notes/NotesHeader";
import NotesSearch from "../components/notes/NotesSearch";
import NewNoteButton from "../components/notes/NewNoteButton";
import NoteCard from "../components/notes/NoteCard";
import ViewNoteModal from "../components/notes/ViewNoteModal";

function Notes() {

  const [notes, setNotes] = useState([]);  
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [search, setSearch] = useState("");
  useEffect(() => {

  const loadNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  loadNotes();

}, []);
const handleDelete = async (title) => {

    if (!window.confirm("Delete this note?"))
      return;

    try {

      await deleteNote(title);

      setNotes((prev) =>
        prev.filter((note) => note.title !== title)
      );

    } catch (error) {

      console.error(error);

    }
  };
  console.log(JSON.stringify(notes, null, 2));
  const filteredNotes = notes.filter((note) =>

  note.title.toLowerCase().includes(search.toLowerCase()) ||

  note.content.toLowerCase().includes(search.toLowerCase()) ||

  note.tag.toLowerCase().includes(search.toLowerCase())

);
  return (
    <div className="space-y-6">
      
      <NotesHeader />

      <div className="flex flex-col md:flex-row gap-4 justify-between">

        <NotesSearch
          value={search}
         onChange={(e) => setSearch(e.target.value)}
     />

        <NewNoteButton
          onClick={() => setShowModal(true)}
/>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {filteredNotes.map((note, index) => (
          <div
            key={note.id}
            onClick={() => setSelectedNote(note)}
            className="cursor-pointer"
         >
          <NoteCard
            title={note.title}
            content={note.content}
           tag={note.tag}
            date={note.date}
            onDelete={() => handleDelete(note.title)}
        />
      </div>
     ))}

      </div>
      {showModal && (
        <CreateNoteModal
         onClose={() => setShowModal(false)}
         onNoteCreated={(newNote) => {
           setNotes((prev) => [...prev, newNote]);
         }}
     />
     )}
     {selectedNote && (
  <ViewNoteModal
    note={selectedNote}
    onClose={() => setSelectedNote(null)}
  />
)}
    </div>
  );
}

export default Notes;