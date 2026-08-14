import { useState } from "react";
import { useEffect } from "react";
import {
  getSettings,
  saveSettings,
} from "../../api/settingsApi";

function DocumentSettings() {
  const [settings, setSettings] = useState(null);
  useEffect(() => {
  const load = async () => {
    const data = await getSettings();
    setSettings(data);
  };

  load();
}, []);
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-2xl font-bold mb-6">
        📄 Document Settings
      </h2>

      <div className="space-y-6">

        <div>
          <label className="block font-medium mb-2">
            Chunk Size
          </label>

          <input
  type="number"
  value={settings?.chunk_size || 500}
  onChange={(e) =>
    setSettings({
      ...settings,
      chunk_size: Number(e.target.value),
    })
  }
  className="w-full border rounded-lg p-3"
/>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Chunk Overlap
          </label>

          <input
  type="number"
  value={settings?.chunk_overlap || 100}
  onChange={(e) =>
    setSettings({
      ...settings,
      chunk_overlap: Number(e.target.value),
    })
  }
  className="w-full border rounded-lg p-3"
/>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Supported File Types
          </label>

          <input
            value=".pdf, .docx, .txt"
            readOnly
            className="w-full border rounded-lg p-3 bg-gray-100"
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Save Document Settings
        </button>

      </div>

    </div>
  );
}

export default DocumentSettings;