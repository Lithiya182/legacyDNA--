"use client";

import { useEffect, useState } from "react";

interface Activity {
  title: string;
  time: string;
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/history")
      .then((res) => res.json())
      .then((data) => {
        const docs = data.documents || [];
        const mapped: Activity[] = docs.slice(0, 5).map((doc: any) => ({
          title: `Uploaded ${doc.filename}`,
          time: doc.uploaded_at
            ? new Date(doc.uploaded_at).toLocaleString()
            : "Unknown time",
        }));
        setActivities(mapped);
      })
      .catch(() => setActivities([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>

      {loading ? (
        <p className="text-slate-400 py-10 text-center">Loading...</p>
      ) : activities.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-white text-lg font-medium">No recent activity</p>
          <p className="text-slate-400 mt-2">
            Upload documents to start building your organizational memory.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="border-b border-slate-800 pb-4 last:border-none"
            >
              <p className="text-white">{activity.title}</p>
              <p className="text-slate-400 text-sm">{activity.time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}