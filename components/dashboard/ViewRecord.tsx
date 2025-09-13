"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { useAuthStore } from "../../lib/stores/authStore";
import toast from "react-hot-toast";

interface MedicalFile {
  id: number;
  fileName: string;
  fileType: string;
  blobUrl: string;
  uploadedAt: string;
}

export default function ViewRecord() {
  const { medicalFiles, fetchMedicalFiles, deleteMedicalFile, isLoading } =
    useAuthStore();

  useEffect(() => {
    fetchMedicalFiles();
  }, [fetchMedicalFiles]);

  const handleView = (file: MedicalFile) => {
    // Open the file in a new tab
    window.open(file.blobUrl, "_blank", "noopener,noreferrer");
  };

  const handleDelete = async (fileId: number) => {
    if (window.confirm("Are you sure you want to delete this medical file?")) {
      const result = await deleteMedicalFile(fileId);
      if (result.success) {
        toast.success("Medical file deleted successfully!");
      } else {
        toast.error("Failed to delete file: " + result.error);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getFileTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Lab Report": "bg-blue-100 text-blue-800",
      Prescription: "bg-green-100 text-green-800",
      "X-Ray": "bg-purple-100 text-purple-800",
      "Blood Report": "bg-red-100 text-red-800",
      "MRI Scan": "bg-indigo-100 text-indigo-800",
      "CT Scan": "bg-pink-100 text-pink-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#0331b5] mb-2">
          Medical Records
        </h2>
        <p className="text-gray-600">View and manage your medical files</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading medical files...</p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Type</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(
                        file.fileType
                      )}`}
                    >
                      {file.fileType}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">{file.fileName}</TableCell>
                  <TableCell>{formatDate(file.uploadedAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(file)}
                        className="hover:bg-[#0331b5] hover:text-white"
                      >
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(file.id)}
                        disabled={isLoading}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {medicalFiles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No medical files found</p>
              <p className="text-gray-400 text-sm mt-2">
                Upload your first medical file using the Medical Files section
                above
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
