import DashboardLayout from "@/components/layout/DashboardLayout";

export default function InsightsPage() {
  return (
    <DashboardLayout>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          AI Insights
        </h1>

        <p className="text-slate-400 mt-2">
          Discover patterns and organizational intelligence from your uploaded documents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Success Patterns
          </h2>

          <div className="mt-6 text-center py-10">
            <p className="text-slate-300">
              No success patterns available
            </p>

            <p className="text-slate-500 mt-2 text-sm">
              Upload documents to generate AI insights.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Failure Patterns
          </h2>

          <div className="mt-6 text-center py-10">
            <p className="text-slate-300">
              No failure patterns available
            </p>

            <p className="text-slate-500 mt-2 text-sm">
              AI will identify recurring issues here.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Recommendations
          </h2>

          <div className="mt-6 text-center py-10">
            <p className="text-slate-300">
              No recommendations yet
            </p>

            <p className="text-slate-500 mt-2 text-sm">
              Recommendations will appear after document analysis.
            </p>
          </div>
        </div>

      </div>

    </DashboardLayout>
  );
}