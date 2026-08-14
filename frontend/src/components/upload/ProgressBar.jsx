function ProgressBar({ progress }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="font-semibold mb-4">
        Upload Progress
      </h2>

      <div className="bg-gray-200 rounded-full h-4">

        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        />

      </div>

      <p className="mt-3 text-gray-500">
        {progress}% Uploaded
      </p>

    </div>
  );
}

export default ProgressBar;