import DashboardLayout from "@/components/layout/DashboardLayout";
import QueryBox from "@/components/query/QueryBox";

export default function QueryPage() {
  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold text-white mb-8">
        AI Query
      </h1>

      <QueryBox />

    </DashboardLayout>
  );
}