import AISettings from "../components/settings/AISettings";
import DocumentSettings from "../components/settings/DocumentSettings";

function Settings() {
  return (
    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Settings
      </h1>

      <AISettings />
      
      <DocumentSettings />
    </div>
  );
}

export default Settings;