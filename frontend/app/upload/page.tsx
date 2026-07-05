import DashboardLayout from "@/components/layout/DashboardLayout";
import UploadBox from "@/components/upload/UploadBox";

export default function UploadPage() {
  return (
    <DashboardLayout>

      {/* Page Header */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-white">
          Upload Documents
        </h1>

        <p className="mt-3 text-slate-400 max-w-2xl">
          Upload organizational documents to build your AI-powered
          knowledge base. Supported files will be processed and made
          available for intelligent search and analysis.
        </p>

      </div>

      {/* Upload Section */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Upload Box */}

        <div className="xl:col-span-2">
          <UploadBox />
        </div>

        {/* Information Panel */}

        <div className="space-y-6">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-semibold text-white">
              Supported Files
            </h2>

            <ul className="mt-4 space-y-3 text-slate-400">

              <li>• PDF Documents (.pdf)</li>

              <li>• Word Documents (.docx)</li>

              <li>• Text Files (.txt)</li>

            </ul>

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <h2 className="text-xl font-semibold text-white">
              Upload Guidelines
            </h2>

            <ul className="mt-4 space-y-3 text-slate-400">

              <li>• Upload one document at a time.</li>

              <li>• Ensure documents contain readable text.</li>

              <li>• AI processing begins after upload.</li>

              <li>• Uploaded documents become searchable.</li>

            </ul>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}