export default function AIInsights() {
  // Later this data will come from the backend
  const insights: {
    topic: string;
    documents: number;
    accuracy: number;
  } | null = null;

  return (
    <div
  id="ai-insights"
  className="rounded-2xl bg-slate-900 border border-slate-800 p-6"
>

      <h2 className="text-xl font-bold text-white mb-6">
        AI Insights
      </h2>

      {!insights ? (

        <div className="py-10 text-center">

          <p className="text-white text-lg font-medium">
            No AI insights available
          </p>

          <p className="text-slate-400 mt-2">
            Upload and process documents to generate AI insights.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          <div className="rounded-xl bg-slate-800 p-4">

            <p className="text-white font-semibold">
              Most Discussed Topic
            </p>

            <p className="text-cyan-400 mt-2">
              {insights.topic}
            </p>

          </div>

          <div className="rounded-xl bg-slate-800 p-4">

            <p className="text-white font-semibold">
              Documents Processed
            </p>

            <p className="text-cyan-400 mt-2">
              {insights.documents}
            </p>

          </div>

          <div className="rounded-xl bg-slate-800 p-4">

            <p className="text-white font-semibold">
              AI Accuracy
            </p>

            <p className="text-cyan-400 mt-2">
              {insights.accuracy}%
            </p>

          </div>

        </div>

      )}

    </div>
  );
}