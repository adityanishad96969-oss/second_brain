import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Folder,
  Upload,
  NotebookPen,
  Settings
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen">

      <div className="text-2xl font-bold p-6">
        🧠 Second Brain
      </div>

      <nav className="flex flex-col">

        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/chat"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <MessageSquare size={20} />
          AI Chat
        </Link>

        <Link
          to="/library"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Folder size={20} />
          Library
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Upload size={20} />
          Upload
        </Link>

        <Link
          to="/notes"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <NotebookPen size={20} />
          Notes
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-6 py-4 hover:bg-gray-800"
        >
          <Settings size={20} />
          Settings
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;