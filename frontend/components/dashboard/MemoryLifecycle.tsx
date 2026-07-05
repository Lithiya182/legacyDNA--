export default function MemoryLifecycle() {
  const steps = [
    {
      title: "Upload",
      description: "Documents are uploaded into LegacyDNA",
      icon: "📄",
    },
    {
      title: "Remember",
      description: "Cognee stores organizational memory",
      icon: "🧠",
    },
    {
      title: "Knowledge",
      description: "Knowledge becomes searchable and structured",
      icon: "📚",
    },
    {
      title: "Recall",
      description: "AI retrieves the most relevant memories",
      icon: "🔍",
    },
    {
      title: "Insights",
      description: "Patterns and lessons are identified",
      icon: "💡",
    },
    {
      title: "Recommendations",
      description: "Future teams receive actionable guidance",
      icon: "⭐",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-white">
        Memory Lifecycle
      </h2>

      <p className="text-slate-400 mt-2">
        How LegacyDNA transforms documents into organizational intelligence.
      </p>

      <div className="mt-8 space-y-5">

        {steps.map((step, index) => (
          <div
            key={step.title}
            className="flex items-start gap-5"
          >
            <div className="flex flex-col items-center">

              <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-xl">
                {step.icon}
              </div>

              {index !== steps.length - 1 && (
                <div className="w-1 h-10 bg-cyan-500/40 mt-2 rounded-full"></div>
              )}

            </div>

            <div>

              <h3 className="text-white font-semibold text-lg">
                {step.title}
              </h3>

              <p className="text-slate-400 mt-1">
                {step.description}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}