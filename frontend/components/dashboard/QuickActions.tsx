"use client";

import { useRouter } from "next/navigation";

import {
  Upload,
  MessageSquare,
  Brain,
} from "lucide-react";

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      title: "Upload Document",
      icon: Upload,
      action: () => router.push("/upload"),
    },
    {
      title: "Ask AI",
      icon: MessageSquare,
      action: () => router.push("/query"),
    },
    {
      title: "View Insights",
      icon: Brain,
      action: () => {
        document
          .getElementById("ai-insights")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      },
    },
  ];

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-xl font-bold text-white mb-6">
        Quick Actions
      </h2>

      <div className="space-y-4">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={action.action}
              className="w-full flex items-center gap-4 rounded-xl bg-slate-800 hover:bg-slate-700 transition p-4"
            >
              <Icon className="text-cyan-400" />

              <span className="text-white font-medium">
                {action.title}
              </span>

            </button>
          );
        })}

      </div>

    </div>
  );
}