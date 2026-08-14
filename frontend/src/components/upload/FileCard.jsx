import { FileText } from "lucide-react";

function FileCard({ name, size }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex justify-between items-center">

      <div className="flex items-center gap-3">

        <FileText className="text-blue-600" />

        <div>

          <h3 className="font-semibold">
            {name}
          </h3>

          <p className="text-sm text-gray-500">
            {size}
          </p>

        </div>

      </div>

      <span className="text-green-600 font-semibold">
        Ready
      </span>

    </div>
  );
}

export default FileCard;