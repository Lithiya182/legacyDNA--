"use client";

import { useEffect, useState } from "react";
import { getInsights } from "@/lib/api";
import type { InsightsResponse } from "@/types/api";

export default function AIInsights() {
  const [insights, setInsights] = useState<InsightsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getInsights()
      .then((data: InsightsResponse) => setInsights(data))
      .catch(() => setError("Failed to load insights."))
      .finally(() => setLoading(false));
  }, []);

  const hasContent =
    insights &&
    (insights.success_patterns.length > 0 ||
      insights.recurring_problems.length > 0 ||
      insights.recommendations.length > 0);

  return (
    <div
      id="ai-insights"
      className="rounded-2xl bg-slate-900 border border-slate-800 p-6"
    >
      <h2 className="text-xl font-bold text-white mb-6">Memory Insights</h2>

      {loading ? (
        <p className="text-slate-400 py-10 text-center">Loading insights...</p>
      ) : error ? (
        <p className="text-red-400 py-10 text-center">{error}</p>
      ) : !hasContent ? (
        <div className="py-10 text-center">
          <p className="text-white text-lg font-medium">
            No memory insights available
          </p>
          <p className="text-slate-400 mt-2">
            Upload and process documents to generate AI insights.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {insights!.success_patterns.map((item, i) => (
            <div key={`pattern-${i}`} className="rounded-xl bg-slate-800 p-4">
              <p className="text-white font-semibold">Recurring Success Pattern</p>
              <p className="text-cyan-400 mt-2">{item.insight}</p>
              {item.source_documents.length > 0 && (
                <p className="text-slate-500 text-sm mt-1">
                  Source: {item.source_documents.join(", ")}
                </p>
              )}
            </div>
          ))}

          {insights!.recurring_problems.map((item, i) => (
            <div key={`problem-${i}`} className="rounded-xl bg-slate-800 p-4">
              <p className="text-white font-semibold">Lesson Learned</p>
              <p className="text-cyan-400 mt-2">{item.insight}</p>
              {item.source_documents.length > 0 && (
                <p className="text-slate-500 text-sm mt-1">
                  Source: {item.source_documents.join(", ")}
                </p>
              )}
            </div>
          ))}

          {insights!.recommendations.map((item, i) => (
            <div key={`rec-${i}`} className="rounded-xl bg-slate-800 p-4">
              <p className="text-white font-semibold">Recommendation</p>
              <p className="text-cyan-400 mt-2">{item.recommendation}</p>
              {item.reason && (
                <p className="text-slate-400 text-sm mt-1">
                  Reason: {item.reason}
                </p>
              )}
              {item.source_documents.length > 0 && (
                <p className="text-slate-500 text-sm mt-1">
                  Source: {item.source_documents.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}