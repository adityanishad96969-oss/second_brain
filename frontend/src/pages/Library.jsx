import { useEffect, useState } from "react";
import LibrarySearch from "../components/library/LibrarySearch";
import FilterBar from "../components/library/FilterBar";
import DocumentCard from "../components/library/DocumentCard";
import { getFiles } from "../api/uploadApi";

function Library() {

  const [documents, setDocuments] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
   loadDocuments();
}, []);

const loadDocuments = async () => {
  try {
    const files = await getFiles();

    const formattedFiles = files.map((file) => ({
      title: file.name,
      size: file.size,
      date: "Uploaded",
      type: file.name.split(".").pop().toUpperCase(),
    }));

    setDocuments(formattedFiles);
  } catch (error) {
    console.error("Failed to load documents:", error);
  }
};
const filteredDocuments = documents.filter((doc) => {

  const matchesCategory =
    category === "All"
      ? true
      : category === "Markdown"
      ? doc.type === "MD"
      : doc.type === category.toUpperCase();

  const matchesSearch =
    doc.title.toLowerCase().includes(search.toLowerCase());

  return matchesCategory && matchesSearch;

});

  return (
    <div className="space-y-6">

     <LibrarySearch
  search={search}
  setSearch={setSearch}
/>
      <FilterBar
  category={category}
  setCategory={setCategory}
/>

     

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

       {filteredDocuments.map((doc, index) => (
          <DocumentCard
            key={index}
            title={doc.title}
            size={doc.size}
            date={doc.date}
            type={doc.type}
            onDelete={loadDocuments}
          />
        ))}

      </div>

    </div>
  );
}

export default Library;