"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { useAuthStore } from "../../lib/stores/authStore";
import toast from "react-hot-toast";

export default function AddRecords() {
  const { uploadMedicalFile, fetchMedicalFiles, isLoading } = useAuthStore();

  const [formData, setFormData] = useState({
    fileType: "",
    fileName: "",
    selectedFile: null as File | null,
  });

  const fileTypeOptions = [
    "Lab Report",
    "Prescription",
    "X-Ray",
    "Blood Report",
    "MRI Scan",
    "CT Scan",
  ];

  useEffect(() => {
    fetchMedicalFiles();
  }, [fetchMedicalFiles]);

  const handleFileTypeChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      fileType: value,
    }));
  };

  const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      fileName: e.target.value,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      selectedFile: file,
      fileName:
        !prev.fileName && file
          ? file.name.replace(/\.[^/.]+$/, "")
          : prev.fileName,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fileType || !formData.fileName || !formData.selectedFile) {
      toast.error("Please fill all fields and select a file");
      return;
    }

    const result = await uploadMedicalFile(
      formData.selectedFile,
      formData.fileType,
      formData.fileName
    );

    if (result.success) {
      toast.success("Medical record uploaded successfully!");
      await fetchMedicalFiles();
      setFormData({
        fileType: "",
        fileName: "",
        selectedFile: null,
      });
      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } else {
      toast.error("Failed to upload file: " + result.error);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <h2 className="text-xl font-semibold text-[#0331b5] mb-4 text-center">
        Add Your Medical Records
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* File Type DropdownMenu (shadcn/ui) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Type *
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                className="w-full justify-between px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                {formData.fileType || "Select file type"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              {fileTypeOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => handleFileTypeChange(option)}
                  className="cursor-pointer"
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            File Name *
          </label>
          <Input
            type="text"
            value={formData.fileName}
            onChange={handleFileNameChange}
            placeholder="Enter Name of File . . ."
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0331b5] focus:border-[#0331b5] placeholder-gray-400"
          />
        </div>

        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="file"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              required
            />
            <Button
              type="button"
              variant="outline"
              className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
            >
              Select file
            </Button>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-[#0331b5] hover:bg-blue-700 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0331b5] transition-colors duration-200 disabled:opacity-50"
          >
            {isLoading ? "Uploading..." : "Submit"}
          </Button>
        </div>

        {formData.selectedFile && (
          <div className="text-sm text-gray-600 mt-1 p-2 bg-gray-50 rounded">
            <strong>Selected file:</strong> {formData.selectedFile.name}
            <br />
            <strong>Size:</strong>{" "}
            {(formData.selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </div>
        )}
      </form>
    </div>
  );
}
