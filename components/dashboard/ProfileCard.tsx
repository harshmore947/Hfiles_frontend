"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAuthStore } from "../../lib/stores/authStore";
import { generateAvatarUrl } from "../../lib/utils";
import toast from "react-hot-toast";

export default function ProfileCard() {
  const { user, fetchProfile, updateProfile, uploadProfileImage, isLoading } =
    useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user, fetchProfile]);

  const [formData, setFormData] = useState({
    name: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.fullName,
        email: user.email,
        phone: user.phone || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const profileData = {
      fullName: formData.name,
      phone: formData.phone,
      gender: formData.gender,
    };

    const result = await updateProfile(profileData);
    if (result.success) {
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile: " + result.error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image file first");
      return;
    }

    const result = await uploadProfileImage(selectedFile);
    if (result.success) {
      setSelectedFile(null);
      toast.success("Profile image uploaded successfully!");
    } else {
      toast.error("Failed to upload image: " + result.error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-100 to-blue-200 rounded-2xl p-4 max-w-md mx-auto shadow-lg">
      <div className="text-right mb-3">
        <span className="bg-white px-3 py-1 rounded-lg text-sm font-medium text-gray-700">
          {user?.id || "Loading..."}
        </span>
      </div>

      <div className="flex flex-col items-center space-y-3 mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300">
            <Image
              src={user?.profileImageUrl || generateAvatarUrl(user?.fullName || "User", 80)}
              alt="Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-200"
            >
              Edit Profile
            </button>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="bg-white text-green-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-200">
                Change Photo
              </button>
            </div>
          </div>
          {selectedFile && (
            <button
              onClick={handleImageUpload}
              disabled={isLoading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Uploading..." : "Upload Image"}
            </button>
          )}
        </div>

        {/* Name and Form */}
        <div className="w-full">
          <h2 className="text-xl font-bold text-[#0331b5] mb-3">
            {formData.name}
          </h2>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email :
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0331b5] focus:border-[#0331b5] disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone :
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0331b5] focus:border-[#0331b5] disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender :
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mr-2 text-[#0331b5] focus:ring-[#0331b5]"
                />
                <span className="text-sm text-gray-700">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="mr-2 text-[#0331b5] focus:ring-[#0331b5]"
                />
                <span className="text-sm text-gray-700">Female</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 hover:from-yellow-400 hover:via-yellow-500 hover:to-orange-500 text-blue-900 font-bold px-6 py-2 rounded-lg transition-all duration-200"
          >
            Save
          </Button>
        </div>
      )}
    </div>
  );
}
