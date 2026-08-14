function RecentDocuments({ documents }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Documents
      </h2>

      {documents.length === 0 ? (
        <p className="text-gray-500">
          No documents uploaded yet.
        </p>
      ) : (
        documents.map((doc, index) => (
          <div
            key={index}
            className="py-3 border-b last:border-none"
          >
            <div className="font-medium">
              {doc.title}
            </div>

            <div className="text-sm text-gray-500">
              {doc.size} MB • {doc.date}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentDocuments;