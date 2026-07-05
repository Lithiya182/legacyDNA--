"use client";

export default function MemoryGraph() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">
      <h2 className="text-2xl font-bold text-white mb-8">
        Memory Graph
      </h2>

      <p className="text-slate-400 mb-10">
        Visual representation of organizational knowledge and relationships.
      </p>

      <div className="flex flex-col items-center space-y-8">

        <div className="w-40 rounded-full bg-cyan-500 text-slate-950 text-center py-4 font-bold shadow-lg">
          Tech Fest 2025
        </div>

        <div className="grid grid-cols-3 gap-12">

          <div className="flex flex-col items-center">
            <div className="h-12 border-l-2 border-cyan-500"></div>

            <div className="rounded-xl bg-slate-800 px-6 py-4 text-white">
              Sponsors
            </div>

            <div className="mt-3 text-slate-400 text-sm">
              Google
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-12 border-l-2 border-cyan-500"></div>

            <div className="rounded-xl bg-slate-800 px-6 py-4 text-white">
              Meetings
            </div>

            <div className="mt-3 text-slate-400 text-sm">
              Planning Sessions
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="h-12 border-l-2 border-cyan-500"></div>

            <div className="rounded-xl bg-slate-800 px-6 py-4 text-white">
              Lessons
            </div>

            <div className="mt-3 text-slate-400 text-sm">
              Increase Marketing
            </div>
          </div>

        </div>

        <div className="flex flex-col items-center">

          <div className="h-10 border-l-2 border-cyan-500"></div>

          <div className="rounded-xl border border-cyan-500 bg-slate-800 px-8 py-4 text-center">

            <p className="text-cyan-400 font-semibold">
              Recommendation
            </p>

            <p className="text-white mt-2">
              Secure sponsors earlier for better event funding.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}