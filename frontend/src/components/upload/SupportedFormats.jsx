function SupportedFormats() {
  const formats = [
    "PDF",
    "DOCX",
    "TXT",
    "Markdown",
    "HTML"
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-semibold text-xl mb-4">
        Supported Formats
      </h2>

      <div className="flex gap-3 flex-wrap">

        {formats.map((format) => (
          <span
            key={format}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
          >
            {format}
          </span>
        ))}

      </div>

    </div>
  );
}

export default SupportedFormats;