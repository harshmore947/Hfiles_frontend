"use client";

import BgGradient from "@/components/base/bg-gradient";
import Header from "@/components/base/Header";
import AddRecords from "@/components/dashboard/AddRecords";
import ProfileCard from "@/components/dashboard/ProfileCard";
import ViewRecord from "@/components/dashboard/ViewRecord";
import React, { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { useRouter } from "next/navigation";

export default function Page() {
  const { fetchProfile, user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Update page title
    document.title = "Dashboard - HFiles";
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await fetchProfile();
        // If fetchProfile succeeds, user is authenticated
      } catch (error) {
        // If fetchProfile fails, redirect to login
        console.log("Authentication failed, redirecting to login");
        router.push("/log-in");
      }
    };

    checkAuth();
  }, [fetchProfile, router]);

  // Show loading while checking authentication
  if (isLoading && !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If not authenticated and not loading, don't render dashboard
  if (!isAuthenticated && !user && !isLoading) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-2">
        <BgGradient />

        <div className="flex flex-col md:flex-row w-full p-2 mx-auto gap-2">
          <ProfileCard />
          <AddRecords />
        </div>
        <div className="w-full p-2">
          <ViewRecord />
        </div>
      </div>
    </>
  );
}
