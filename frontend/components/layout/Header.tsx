"use client";

import { Bell, Search, Moon, CircleUser } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-950 px-8 flex items-center justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 text-sm">
          Welcome back, Deva 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search knowledge..."
            className="w-72 bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
          />
        </div>

        {/* Notification */}
        <button className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 transition">
          <Bell size={20} className="text-white" />
        </button>

        {/* Theme */}
        <button className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 transition">
          <Moon size={20} className="text-white" />
        </button>

        {/* User */}
        <button className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition">
          <CircleUser size={22} className="text-slate-950" />
        </button>
      </div>
    </header>
  );
}