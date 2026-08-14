import { useEffect, useState } from "react";
import { getActivities } from "../../api/activityApi";

function RecentActivity() {

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-500">
          No recent activity.
        </p>
      ) : (
        activities.map((activity, index) => (
          <div
            key={index}
            className="py-3 border-b last:border-none"
          >
            <div className="font-medium">
              {activity.message}
            </div>

            <div className="text-sm text-gray-500">
              {activity.time}
            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default RecentActivity;