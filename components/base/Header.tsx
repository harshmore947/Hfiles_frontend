"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../lib/stores/authStore";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails, redirect to home
      router.push("/");
    }
  };

  return (
    <header className="bg-[#0331b5] text-white p-2 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image
              src={"/Hfiles_logo.png"}
              alt="logo"
              width={150}
              height={150}
            />
          </Link>
        </div>
        <nav>
          <ul className="flex items-center justify-center space-x-4">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="text-sm">
                  Welcome, {user?.fullName || user?.email}
                </li>
                <li>
                  <Button
                    onClick={handleLogout}
                    className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button
                  onClick={() => router.push("/sign-in")}
                  className="cursor-pointer bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 hover:from-yellow-400 hover:via-yellow-500 hover:to-orange-500 text-blue-900 font-bold  rounded-xl  shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-yellow-300 hover:border-yellow-400"
                >
                  Sign In
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
