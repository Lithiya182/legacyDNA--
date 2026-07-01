import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadBox from "@/components/upload/UploadBox";

export default function UploadPage() {
  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-white mb-8">
        Upload Documents
      </h1>

      <UploadBox />
    </DashboardLayout>
  );
}