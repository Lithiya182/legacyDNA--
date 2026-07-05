import DashboardLayout from "@/components/layout/DashboardLayout";
import CompareBox from "@/components/compare/CompareBox";

export default function ComparePage() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white mb-3">
        Compare Events
      </h1>

      <p className="text-slate-400 mb-6">
        Compare two organizational events to discover strengths,
        weaknesses, and lessons learned.
      </p>

      <div className="mb-8 rounded-xl border border-yellow-500 bg-yellow-500/10 p-4">
        <h3 className="font-semibold text-yellow-400">
          🚧 Prototype Feature
        </h3>

        <p className="mt-2 text-sm text-slate-300">
          This comparison workflow is currently under development and is not
          part of the judged demo flow.
        </p>
      </div>

      <CompareBox />
    </DashboardLayout>
  );
}