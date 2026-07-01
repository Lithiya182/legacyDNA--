"use client";

import { useState } from "react";
import { Send, Bot } from "lucide-react";

export default function QueryBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function askAI() {
    if (!question.trim()) return;

    // Placeholder response (replace with backend later)
    setAnswer(
      "According to your uploaded documents, this is where the AI response will appear."
    );
  }

  return (
    <div className="space-y-8">

      {/* Ask Card */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h2 className="text-3xl font-bold text-white mb-6">
          Ask LegacyDNA
        </h2>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask anything about your uploaded knowledge..."
          className="w-full h-40 rounded-xl bg-slate-950 border border-slate-700 p-4 text-white resize-none outline-none focus:border-cyan-500"
        />

        <button
          onClick={askAI}
          className="mt-6 flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400 transition"
        >
          <Send size={18} />
          Ask AI
        </button>

      </div>

      {/* AI Response */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <div className="flex items-center gap-3 mb-5">

          <Bot className="text-cyan-400" />

          <h2 className="text-2xl font-bold text-white">
            AI Response
          </h2>

        </div>

        {answer ? (
          <>
            <p className="text-slate-300 leading-8">
              {answer}
            </p>

            <div className="mt-8">

              <h3 className="text-lg font-semibold text-white mb-3">
                Sources
              </h3>

              <div className="space-y-3">

                <div className="rounded-lg bg-slate-800 p-4 text-slate-300">
                  📄 Meeting.pdf
                </div>

                <div className="rounded-lg bg-slate-800 p-4 text-slate-300">
                  📄 ProjectReport.docx
                </div>

              </div>

            </div>
          </>
        ) : (
          <p className="text-slate-500">
            Ask a question to see the AI response.
          </p>
        )}

      </div>

    </div>
  );
}