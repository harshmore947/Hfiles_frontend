import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generate a default profile picture URL using UI Avatars API
 * @param fullName - The user's full name
 * @param size - The size of the avatar (default: 150)
 * @returns The generated avatar URL
 */
export function generateAvatarUrl(fullName: string, size: number = 150): string {
  const encodedName = encodeURIComponent(fullName || "User");
  return `https://ui-avatars.com/api/?name=${encodedName}&background=6366f1&color=ffffff&size=${size}`;
}
