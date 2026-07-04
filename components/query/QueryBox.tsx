"use client";

import { useState } from "react";
import { QueryResponse } from "@/types/api";
import { queryAI } from "@/lib/api";

import {
  Send,
  Bot,
  FileText,
  Loader2,
} from "lucide-react";

export default function QueryBox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Summarize the latest uploaded document",
    "What lessons were learned from our last event?",
    "Show the key decisions from recent meetings",
  ];

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setAnswer(null);

      const response = await queryAI(question);

      setAnswer(response);
    } catch (error) {
      console.error(error);

      setAnswer({
        answer: "Unable to connect to the backend.",
        sources: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Ask AI */}

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

        <h2 className="text-2xl font-bold text-white">
          Ask LegacyDNA
        </h2>

        <p className="text-slate-400 mt-2">
          Ask questions from your organization's memory.
        </p>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={5}
          maxLength={500}
          placeholder="Ask anything about your organization's documents..."
          className="mt-6 w-full rounded-xl bg-slate-950 border border-slate-700 p-5 text-white resize-none outline-none focus:border-cyan-500"
        />

        <div className="flex justify-between items-center mt-2">

          <span className="text-slate-500 text-sm">
            {question.length}/500 characters
          </span>

        </div>

        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="mt-6 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 disabled:text-slate-500 text-slate-950 px-6 py-3 rounded-xl font-semibold transition"
        >

          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Thinking...
            </>
          ) : (
            <>
              <Send size={18} />
              Ask AI
            </>
          )}

        </button>

      </div>

      {/* Suggested Questions */}

      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

        <h2 className="text-xl font-bold text-white mb-5">
          Suggested Questions
        </h2>

        <div className="space-y-3">

          {suggestions.map((item) => (

            <button
              key={item}
              onClick={() => setQuestion(item)}
              className="w-full text-left rounded-xl bg-slate-800 hover:bg-slate-700 p-4 text-slate-300 transition"
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* AI Response */}

      {(loading || answer) && (

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Bot className="text-cyan-400" />

            <h2 className="text-xl font-bold text-white">
              AI Response
            </h2>

          </div>

          {loading ? (

            <div className="flex items-center gap-3 text-slate-400">

              <Loader2 className="animate-spin" />

              <span>
                Searching organizational memory...
              </span>

            </div>

          ) : (

            <p className="text-slate-300 leading-8">
              {answer?.answer}
            </p>

          )}

        </div>

      )}

      {/* Sources */}

      {answer && (

        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-8">

          <h2 className="text-xl font-bold text-white mb-5">
            Sources
          </h2>

          {answer.sources.length > 0 ? (

            <div className="space-y-4">

              {answer.sources.map((source, index) => (

                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-slate-800 p-4"
                >

                  <FileText className="text-cyan-400" />

                  <span className="text-white">
                    {source}
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <div className="rounded-xl bg-slate-800 p-4">

              <p className="text-slate-400">
                No source documents available.
              </p>

            </div>

          )}

        </div>

      )}

    </div>
  );
}