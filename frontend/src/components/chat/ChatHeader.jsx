function ChatHeader() {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold">
          AI Knowledge Assistant
        </h1>

        <p className="text-gray-500">
          Ask questions about your documents.
        </p>
      </div>

      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
        ● Online
      </span>

    </div>
  );
}

export default ChatHeader;