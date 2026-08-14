function FilterBar({ category, setCategory }) {

  const filters = [
    "All",
    "PDF",
    "DOCX",
    "TXT",
    "Markdown",
  ];

  return (
    <div className="flex gap-3 flex-wrap">

      {filters.map((filter) => (

        <button
          key={filter}
          onClick={() => setCategory(filter)}
          className={
            category === filter
              ? "bg-blue-600 text-white px-4 py-2 rounded-lg"
              : "bg-gray-200 px-4 py-2 rounded-lg"
          }
        >
          {filter}
        </button>

      ))}

    </div>
  );
}

export default FilterBar;