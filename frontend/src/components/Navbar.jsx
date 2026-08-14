function Navbar() {
  return (
    <header className="bg-white border-b h-16 flex items-center justify-between px-6">

      <h2 className="text-xl font-semibold">
        Personal Knowledge Base
      </h2>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Upload
      </button>

    </header>
  );
}

export default Navbar;