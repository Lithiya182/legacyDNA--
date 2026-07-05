const timeline: {
  title: string;
  date: string;
}[] = [];

export default function KnowledgeTimeline() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-xl font-bold text-white mb-6">
        Knowledge Timeline
      </h2>

      {timeline.length === 0 ? (

        <div className="py-10 text-center">

          <p className="text-white text-lg font-medium">
            No timeline available
          </p>

          <p className="text-slate-400 mt-2">
            Timeline events will appear after documents are uploaded.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {timeline.map((item, index) => (

            <div
              key={index}
              className="border-l-2 border-cyan-500 pl-5"
            >

              <h3 className="text-white font-semibold">
                {item.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {item.date}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}