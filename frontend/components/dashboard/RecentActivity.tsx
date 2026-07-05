export default function RecentActivity() {
  // Later this will come from the backend
  const activities: {
    title: string;
    time: string;
  }[] = [];

  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6">

      <h2 className="text-xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      {activities.length === 0 ? (

        <div className="py-10 text-center">

          <p className="text-white text-lg font-medium">
            No recent activity
          </p>

          <p className="text-slate-400 mt-2">
            Upload documents to start building your organizational memory.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {activities.map((activity, index) => (

            <div
              key={index}
              className="border-b border-slate-800 pb-4 last:border-none"
            >

              <p className="text-white">
                {activity.title}
              </p>

              <p className="text-slate-400 text-sm">
                {activity.time}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}