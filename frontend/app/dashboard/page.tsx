import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AIInsights from "@/components/dashboard/AIInsights";
import QuickActions from "@/components/dashboard/QuickActions";
import KnowledgeTimeline from "@/components/dashboard/KnowledgeTimeline";
import MemoryGraph from "../../components/memory/MemoryGraph";
import MemoryLifecycle from "@/components/dashboard/MemoryLifecycle";
import {
  BrainCircuit,
  FileText,
  Sparkles,
  Users,
} from "lucide-react";

export default function DashboardPage() {

  // This will later come from the backend API
  const dashboardData = {
    knowledgeAssets: null,
    documents: null,
    insights: null,
    members: null,
  };

  return (
    <DashboardLayout>

      {/* Page Title */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Welcome back! Here's your organizational knowledge overview.
        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Knowledge Assets"
          value={dashboardData.knowledgeAssets ?? "0"}
          subtitle="Waiting for backend"
          icon={<BrainCircuit className="text-cyan-400" />}
        />

        <StatCard
          title="Documents"
          value={dashboardData.documents ?? "0"}
          subtitle="Waiting for backend"
          icon={<FileText className="text-cyan-400" />}
        />

        <StatCard
          title="AI Insights"
          value={dashboardData.insights ?? "0"}
          subtitle="Waiting for backend"
          icon={<Sparkles className="text-cyan-400" />}
        />

        <StatCard
          title="Members"
          value={dashboardData.members ?? "0"}
          subtitle="Waiting for backend"
          icon={<Users className="text-cyan-400" />}
        />

      </div>

      {/* Dashboard Content */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2 space-y-6">

            <RecentActivity />

            <KnowledgeTimeline />

            <MemoryGraph />

        </div>

        <div className="space-y-6">

          <AIInsights />

          <QuickActions />

          <MemoryLifecycle />

        </div>

      </div>

    </DashboardLayout>
  );
}