import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";

import {
  BrainCircuit,
  FileText,
  Sparkles,
  Database,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Knowledge Memories"
          value="1,248"
          subtitle="+18 this week"
          icon={<BrainCircuit className="text-cyan-400" />}
        />

        <StatCard
          title="Uploaded Files"
          value="356"
          subtitle="Total Documents"
          icon={<FileText className="text-cyan-400" />}
        />

        <StatCard
          title="AI Insights"
          value="128"
          subtitle="Generated"
          icon={<Sparkles className="text-cyan-400" />}
        />

        <StatCard
          title="Memory Database"
          value="24 GB"
          subtitle="Storage Used"
          icon={<Database className="text-cyan-400" />}
        />

      </div>

    </DashboardLayout>
  );
}