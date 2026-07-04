"use client";

import { useRef, useState } from "react";
import { UploadResponse } from "@/types/api";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { uploadDocument } from "@/lib/api";

export default function UploadBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [uploading, setUploading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [recentUploads, setRecentUploads] =
    useState<UploadResponse[]>([]);

  const [error, setError] =
    useState("");
  
  const [dragActive, setDragActive] =
    useState(false);

  const handleBrowse = () => {
    inputRef.current?.click();
  };
  const handleDragOver = (
  e: React.DragEvent<HTMLDivElement>
) => {
  e.preventDefault();
  setDragActive(true);
};

const handleDragLeave = () => {
  setDragActive(false);
};

const handleDrop = (
  e: React.DragEvent<HTMLDivElement>
) => {

  e.preventDefault();

  setDragActive(false);

  const file = e.dataTransfer.files[0];

  if (file) {
    validateFile(file);
  }

};

  const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>
) => {

  const file = e.target.files?.[0];

  if (!file) return;

  validateFile(file);

};
  
  const validateFile = (file: File) => {

  const allowedExtensions = [
    "pdf",
    "docx",
    "txt",
  ];

  const extension = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  if (
    !extension ||
    !allowedExtensions.includes(extension)
  ) {

    setSelectedFile(null);

    setError(
      "Only PDF, DOCX and TXT files are supported."
    );

    return;
  }

  setError("");

  setSelectedFile(file);

  setProgress(0);

};

  const handleUpload = async () => {

    if (!selectedFile) return;

    try {

      setUploading(true);

      setError("");

      const interval = setInterval(() => {

        setProgress((prev) => {

          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }

          return prev + 10;

        });

      }, 150);

      const response =
        await uploadDocument(selectedFile);

      clearInterval(interval);

      setProgress(100);

      setRecentUploads((prev) => [
        response,
        ...prev,
      ]);

      setTimeout(() => {

        setSelectedFile(null);

        setUploading(false);

        setProgress(0);

      }, 500);

    } catch (err) {

      console.error(err);

      setUploading(false);

      setProgress(0);

      setError(
        "Upload failed. Make sure the backend server is running."
      );

    }

  };

  return (

    <div className="space-y-8">

      {/* Upload Area */}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          dragActive
            ? "border-cyan-400 bg-slate-800"
            : "border-cyan-500 bg-slate-900"
        }`}
      >

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
          accept=".pdf,.docx,.txt"
          onChange={handleFileChange}
        />

        <button
          onClick={handleBrowse}
          className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-7 py-3 rounded-xl font-semibold transition"
        >
          Browse Files
        </button>

        {error && (

          <div className="mt-6 rounded-xl border border-red-500 bg-red-500/10 p-4 flex items-center gap-3">

            <AlertCircle
              size={20}
              className="text-red-400"
            />

            <p className="text-red-400 text-sm">
              {error}
            </p>

          </div>

        )}

      </div>

      {/* Selected File */}

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
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />

              </div>

            </div>

          )}

        </div>

      )}

      {/* Recent Uploads */}

      <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">

        <h2 className="text-xl font-bold text-white mb-5">
          Recent Uploads
        </h2>

        {recentUploads.length === 0 ? (

          <div className="text-center py-8">

            <p className="text-slate-400">
              No uploads yet.
            </p>

            <p className="text-slate-500 text-sm mt-2">
              Uploaded documents will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {recentUploads.map((file, index) => (

              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-slate-800 p-4"
              >

                <div className="flex items-center gap-3">

                  <CheckCircle2 className="text-green-400" />

                  <div>

                    <p className="text-white font-semibold">
                      {file.filename}
                    </p>

                    <p className="text-slate-400 text-sm">
                      {file.file_type}
                    </p>

                  </div>

                </div>

                <span className="text-green-400 text-sm">
                  {file.status}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}