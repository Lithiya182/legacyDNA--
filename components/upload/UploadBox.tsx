"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
} from "lucide-react";

export default function UploadBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [recentUploads, setRecentUploads] =
    useState<string[]>([]);

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files?.length) {
      setSelectedFile(e.target.files[0]);
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);

    let current = 0;

    const interval = setInterval(() => {
      current += 10;
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);

        setUploading(false);

        setRecentUploads((prev) => [
          selectedFile.name,
          ...prev,
        ]);

        setSelectedFile(null);

        setProgress(0);
      }
    }, 150);

    /*
    =============================
    BACKEND API (Later)
    =============================

    const formData = new FormData();
    formData.append("file", selectedFile);

    await fetch("YOUR_BACKEND/upload", {
      method: "POST",
      body: formData,
    });

    */
  };

  return (
    <div className="space-y-8">

      <div className="rounded-2xl border-2 border-dashed border-cyan-500 bg-slate-900 p-12 text-center">

        <UploadCloud
          size={60}
          className="mx-auto text-cyan-400 mb-5"
        />

        <h2 className="text-2xl font-bold text-white">
          Drag & Drop Files
        </h2>

        <p className="text-slate-400 mt-2">
          or browse files from your computer
        </p>

        <input
          hidden
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
        />

        <button
          onClick={handleBrowse}
          className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-7 py-3 rounded-xl font-semibold transition"
        >
          Browse Files
        </button>

      </div>

      {selectedFile && (
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">

          <div className="flex items-center gap-3">

            <FileText className="text-cyan-400" />

            <div>

              <p className="text-white font-semibold">
                {selectedFile.name}
              </p>

              <p className="text-slate-400 text-sm">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>

            </div>

          </div>

          {!uploading && (
            <button
              onClick={handleUpload}
              className="mt-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-3 rounded-xl font-semibold transition"
            >
              Upload File
            </button>
          )}

          {uploading && (
            <div className="mt-6">

              <div className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>

              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">

                <div
                  className="h-full bg-cyan-500 transition-all duration-150"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>
          )}

        </div>
      )}

      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">

        <h2 className="text-xl font-bold text-white mb-5">
          Recent Uploads
        </h2>

        {recentUploads.length === 0 ? (
          <p className="text-slate-500">
            No uploads yet.
          </p>
        ) : (
          <div className="space-y-4">
            {recentUploads.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
              >
                <div className="flex items-center gap-3">

                  <CheckCircle2 className="text-green-400" />

                  <span className="text-white">
                    {file}
                  </span>

                </div>

                <span className="text-green-400 text-sm">
                  Uploaded
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}