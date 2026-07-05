"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatCard from "@/components/dashboard/StatCard";
import RecentActivity from "@/components/dashboard/RecentActivity";
import AIInsights from "@/components/dashboard/AIInsights";
import QuickActions from "@/components/dashboard/QuickActions";
import KnowledgeTimeline from "@/components/dashboard/KnowledgeTimeline";
import MemoryGraph from "../../components/memory/MemoryGraph";
import MemoryLifecycle from "@/components/dashboard/MemoryLifecycle";
import { getDashboardStats } from "@/lib/api";
import type { DashboardStats } from "@/types/api";
import {
  BrainCircuit,
  FileText,
  Sparkles,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((data: DashboardStats) => setDashboardData(data))
      .finally(() => setLoading(false));
  }, []);

  const subtitle = loading ? "Loading..." : "Live from backend";

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Welcome back! Your organization's memory is growing.
          Explore historical lessons, recurring patterns, and evidence-backed recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Memories Stored"
          value={dashboardData?.knowledge_assets ?? "0"}
          subtitle={subtitle}
          icon={<BrainCircuit className="text-cyan-400" />}
        />

        <StatCard
          title="Knowledge Sources"
          value={dashboardData?.documents ?? "0"}
          subtitle={subtitle}
          icon={<FileText className="text-cyan-400" />}
        />

        <StatCard
          title="Patterns Learned"
          value={dashboardData?.insights ?? "0"}
          subtitle={subtitle}
          icon={<Sparkles className="text-cyan-400" />}
        />

        <StatCard
          title="Team Members"
          value={dashboardData?.members ?? "0"}
          subtitle={subtitle}
          icon={<Users className="text-cyan-400" />}
        />
      </div>

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