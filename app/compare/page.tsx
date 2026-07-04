import DashboardLayout from "@/components/layout/DashboardLayout";
import CompareBox from "@/components/compare/CompareBox";

export default function ComparePage() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white mb-3">
        Compare Events
      </h1>

      <p className="text-slate-400 mb-8">
        Compare two organizational events to discover strengths,
        weaknesses, and lessons learned.
      </p>

      <CompareBox />
    </DashboardLayout>
  );
}