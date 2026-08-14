import { useEffect, useState } from "react";

import StatCard from "../components/dashboard/StatCard";
import SearchBar from "../components/dashboard/SearchBar";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import RecentActivity from "../components/dashboard/RecentActivity";

import { getDashboard } from "../api/dashboardApi";

function Dashboard() {

  const [dashboard, setDashboard] = useState({
    documents: 0,
    storage: 0,
    recent_documents: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-8">

      <SearchBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Documents"
          value={dashboard.documents}
          color="text-blue-600"
        />

        <StatCard
          title="Notes"
          value="0"
          color="text-green-600"
        />

        <StatCard
          title="AI Chats"
          value="0"
          color="text-purple-600"
        />

        <StatCard
          title="Storage"
          value={`${dashboard.storage} MB`}
          color="text-red-600"
        />

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <RecentDocuments
          documents={dashboard.recent_documents}
        />

        <RecentActivity />

      </div>

    </div>
  );
}

export default Dashboard;