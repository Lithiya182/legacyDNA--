"use client";

import { useState } from "react";
import {
  GitCompare,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function CompareBox() {
  const [eventA, setEventA] = useState("");
  const [eventB, setEventB] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleCompare = async () => {
    if (!eventA.trim() || !eventB.trim()) {
      setError("Please enter both event names.");
      return;
    }

    setError("");
    setLoading(true);

    // Backend integration will replace this prototype logic
    setTimeout(() => {
      setResult({
        prototype: true,
      });

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">

      {/* Compare Card */}

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h2 className="text-2xl font-bold text-white">
          Compare Two Events
        </h2>

        <p className="text-slate-400 mt-2">
          Select two events and let LegacyDNA identify key similarities,
          differences, strengths, and lessons.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-8">

          <input
            type="text"
            placeholder="Event A"
            value={eventA}
            onChange={(e) => setEventA(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-700 p-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            placeholder="Event B"
            value={eventB}
            onChange={(e) => setEventB(e.target.value)}
            className="rounded-xl bg-slate-950 border border-slate-700 p-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        {error && (
          <div className="mt-5 rounded-xl border border-red-500 bg-red-500/10 p-4 flex items-center gap-3">

            <AlertCircle className="text-red-400" />

            <span className="text-red-400">
              {error}
            </span>

          </div>
        )}

        <button
          onClick={handleCompare}
          disabled={loading}
          className="mt-8 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 px-6 py-3 rounded-xl font-semibold transition"
        >
          {loading ? (
            <>
              <Loader2
                className="animate-spin"
                size={18}
              />
              Comparing...
            </>
          ) : (
            <>
              <GitCompare size={18} />
              Compare Events
            </>
          )}
        </button>

      </div>

      {/* Prototype Result */}

      {result && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

          <h2 className="text-2xl font-bold text-white mb-6">
            Comparison Status
          </h2>

          <div className="rounded-xl border border-cyan-500 bg-cyan-500/10 p-6">

            <h3 className="text-lg font-semibold text-cyan-400">
              Comparison Feature Prototype
            </h3>

            <p className="mt-3 text-slate-300 leading-7">
              The event comparison workflow is currently under development.
              It is not included in the judged demo flow.
            </p>

            <p className="mt-3 text-sm text-slate-400">
              Backend integration for semantic event comparison will be enabled
              in a future iteration.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}