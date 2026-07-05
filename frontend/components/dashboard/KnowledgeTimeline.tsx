"use client";

import { useEffect, useState } from "react";

interface TimelineItem {
  title: string;
  date: string;
}

export default function KnowledgeTimeline() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/history")
      .then((res) => res.json())
      .then((data) => {
        const docs = data.documents || [];
        const mapped: TimelineItem[] = docs.map((doc: any) => ({
          title: doc.filename,
          date: doc.uploaded_at
            ? new Date(doc.uploaded_at).toLocaleDateString()
            : "Unknown date",
        }));
        setTimeline(mapped);
      })
      .catch(() => setTimeline([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-xl font-bold text-white mb-6">Knowledge Timeline</h2>

      {loading ? (
        <p className="text-slate-400 py-10 text-center">Loading...</p>
      ) : timeline.length === 0 ? (
        <div className="py-10 text-center">
          <p className="text-white text-lg font-medium">
            No timeline available
          </p>
          <p className="text-slate-400 mt-2">
            Timeline events will appear after documents are uploaded.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {timeline.map((item, index) => (
            <div key={index} className="border-l-2 border-cyan-500 pl-5">
              <h3 className="text-white font-semibold">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}