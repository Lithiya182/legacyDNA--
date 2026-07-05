"use client";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import {
  LayoutDashboard,
  Upload,
  MessageSquare,
  GitCompare,
  Brain,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Upload",
    href: "/upload",
    icon: Upload,
  },
  {
    title: "Query",
    href: "/query",
    icon: MessageSquare,
  },
  {
    title: "Compare",
    href: "/compare",
    icon: GitCompare,
  },
  {
    title: "Insights",
    href: "/insights",
    icon: Brain,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-950 border-r border-slate-800 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="px-8 py-8">
          <h1 className="text-3xl font-bold text-cyan-400">
            LegacyDNA
          </h1>

          <p className="text-slate-500 text-sm mt-1">
            Organizational Intelligence
          </p>
        </div>

        {/* Navigation */}
        <nav className="px-4 mt-8 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 hover:text-white transition"
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-800 p-5">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-300 hover:bg-slate-900 transition">
          <Settings size={20} />
          Settings
        </button>

        <div className="mt-6 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-slate-950">
            D
          </div>

          <div>
            <p className="font-semibold text-white">
              Deva Dharshini
            </p>

            <p className="text-xs text-slate-500">
              Team Member
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}