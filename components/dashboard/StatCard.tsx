import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}: StatCardProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500 transition duration-300">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {value}
          </h2>

          {subtitle && (
            <p className="text-cyan-400 mt-4 text-sm">
              {subtitle}
            </p>
          )}

        </div>

        <div className="p-4 rounded-xl bg-slate-800">
          {icon}
        </div>

      </div>

    </div>
  );
}