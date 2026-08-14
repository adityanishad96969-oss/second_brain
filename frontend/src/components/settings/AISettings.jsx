import { useState,useEffect } from "react";
import {
  getSettings,
  saveSettings,
} from "../../api/settingsApi";

function AISettings() {
  const [model, setModel] = useState("");
  const [topK, setTopK] = useState("top_k");
  const [temperature, setTemperature] = useState("temperature");
  const [style, setStyle] = useState("");
  useEffect(() => {

  const loadSettings = async () => {

    const data = await getSettings();

    setModel(data.model);
    setTopK(data.top_k);
    setTemperature(data.temperature);
    setStyle(data.style);
  };

  loadSettings();

}, []);
const handleSave = async () => {
  try {

    await saveSettings({
      model,
      top_k: Number(topK),
      temperature: Number(temperature),
      style,
    });

    alert("Settings saved!");

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        🤖 AI Settings
      </h2>

      <div className="space-y-6">

        {/* Model */}
        <div>
          <label className="font-medium block mb-2">
            AI Model
          </label>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>nvidia/nemotron-3-ultra-550b-a55b</option>
          </select>
        </div>

        {/* Top K */}
        <div>
          <label className="font-medium block mb-2">
            Top K Retrieval: {topK}
          </label>

          <input
            type="range"
            min="1"
            max="10"
            value={topK}
            onChange={(e) => setTopK(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Temperature */}
        <div>
          <label className="font-medium block mb-2">
            Temperature: {temperature}
          </label>

          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Response Style */}
        <div>
          <label className="font-medium block mb-2">
            Response Style
          </label>

          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Concise</option>
            <option>Balanced</option>
            <option>Detailed</option>
          </select>
        </div>

        <button
         onClick={handleSave}
         className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
       >
        Save AI Settings
        </button>

      </div>

    </div>
  );
}

export default AISettings;    