import { Search } from "lucide-react";

function LibrarySearch({ search, setSearch }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">

      <Search className="text-gray-500" />

      <input
        type="text"
        placeholder="Search documents..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full outline-none"
      />

    </div>
  );
}

export default LibrarySearch;