"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getInsights } from "@/lib/api";
import type { InsightsResponse } from "@/types/api";

export default function InsightsPage() {
  const [data, setData] = useState<InsightsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const result = await getInsights();
        setData(result);
      } catch (err) {
        setError("Failed to load insights");
      } finally {
        setLoading(false);
      }
    }
    fetchInsights();
  }, []);

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">AI Insights</h1>
        <p className="text-slate-400 mt-2">
          Discover patterns and organizational intelligence from your uploaded documents.
        </p>
      </div>

      {error && (
        <p className="text-red-400 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Success Patterns */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Success Patterns</h2>

          {loading ? (
            <p className="text-slate-500 mt-6 text-sm">Loading...</p>
          ) : data && data.success_patterns.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {data.success_patterns.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  <p>{item.insight}</p>
                  {item.source_documents.length > 0 && (
                    <p className="text-slate-500 text-xs mt-1">
                      Sources: {item.source_documents.join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 text-center py-10">
              <p className="text-slate-300">No success patterns available</p>
              <p className="text-slate-500 mt-2 text-sm">
                Upload documents to generate AI insights.
              </p>
            </div>
          )}
        </div>

        {/* Failure Patterns (recurring_problems) */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Failure Patterns</h2>

          {loading ? (
            <p className="text-slate-500 mt-6 text-sm">Loading...</p>
          ) : data && data.recurring_problems.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {data.recurring_problems.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  <p>{item.insight}</p>
                  {item.source_documents.length > 0 && (
                    <p className="text-slate-500 text-xs mt-1">
                      Sources: {item.source_documents.join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 text-center py-10">
              <p className="text-slate-300">No failure patterns available</p>
              <p className="text-slate-500 mt-2 text-sm">
                AI will identify recurring issues here.
              </p>
            </div>
          )}
        </div>

        {/* Recommendations */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">Recommendations</h2>

          {loading ? (
            <p className="text-slate-500 mt-6 text-sm">Loading...</p>
          ) : data && data.recommendations.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {data.recommendations.map((item, i) => (
                <li key={i} className="text-slate-300 text-sm">
                  <p className="font-medium">{item.recommendation}</p>
                  <p className="text-slate-400 text-xs mt-1">{item.reason}</p>
                  {item.source_documents.length > 0 && (
                    <p className="text-slate-500 text-xs mt-1">
                      Sources: {item.source_documents.join(", ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 text-center py-10">
              <p className="text-slate-300">No recommendations yet</p>
              <p className="text-slate-500 mt-2 text-sm">
                Recommendations will appear after document analysis.
              </p>
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
}