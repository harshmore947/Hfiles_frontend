import { create } from "zustand";

const rawBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5027";
const API_BASE_URL = rawBase.replace(/\/+$/, "");

interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  gender?: string;
  profileImageUrl?: string;
}

interface MedicalFile {
  id: number;
  fileName: string;
  fileType: string;
  blobUrl: string;
  uploadedAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  medicalFiles: MedicalFile[];
  isLoading: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  fetchProfile: () => Promise<void>;
  updateProfile: (
    profileData: Partial<User>
  ) => Promise<{ success: boolean; error?: string }>;
  uploadProfileImage: (
    file: File
  ) => Promise<{ success: boolean; error?: string; imageUrl?: string }>;
  uploadMedicalFile: (
    file: File,
    fileType: string,
    fileName: string
  ) => Promise<{ success: boolean; error?: string; fileId?: number }>;
  fetchMedicalFiles: () => Promise<void>;
  deleteMedicalFile: (
    fileId: number
  ) => Promise<{ success: boolean; error?: string }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  medicalFiles: [],
  isLoading: false,
  error: null,
  login: (user: User) =>
    set({ isAuthenticated: true, user, isLoading: false, error: null }),
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      const data = await response.json();
      if (data.message === "Logged out") {
        set({ isAuthenticated: false, user: null, isLoading: false });
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Logout failed";
      set({ error: errorMessage, isLoading: false });
      set({ isAuthenticated: false, user: null });
    }
  },
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
  updateProfile: async (profileData: Partial<User>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      if (data.message === "Profile updated successfully") {
        // Update the user data in the store
        set((state) => ({
          user: state.user ? { ...state.user, ...profileData } : null,
          isLoading: false,
        }));
        return { success: true };
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Profile update failed";
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },
  uploadProfileImage: async (file: File) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${API_BASE_URL}/api/profile/upload-profile-image`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload profile image");
      }

      const data = await response.json();
      if (data.message === "Profile image uploaded" && data.imageUrl) {
        // Update the user's profile image URL in the store
        set((state) => ({
          user: state.user
            ? { ...state.user, profileImageUrl: data.imageUrl }
            : null,
          isLoading: false,
        }));
        return { success: true, imageUrl: data.imageUrl };
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Image upload failed";
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },
  fetchProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/profile`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const userData: User = await response.json();
      set({ isAuthenticated: true, user: userData, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to fetch profile";
      set({ error: errorMessage, isLoading: false });
    }
  },

  uploadMedicalFile: async (file: File, fileType: string, fileName: string) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", fileType);
      formData.append("fileName", fileName);

      const response = await fetch(`${API_BASE_URL}/api/medical-files/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload medical file");
      }

      const data = await response.json();
      set({ isLoading: false });
      return { success: true, fileId: data.fileId };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to upload medical file";
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },

  fetchMedicalFiles: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/api/medical-files`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medical files");
      }

      const files: MedicalFile[] = await response.json();
      set({ medicalFiles: files, isLoading: false });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch medical files";
      set({ error: errorMessage, isLoading: false });
    }
  },

  deleteMedicalFile: async (fileId: number) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/medical-files/${fileId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete medical file");
      }

      // Remove the file from the local state
      set((state) => ({
        medicalFiles: state.medicalFiles.filter((file) => file.id !== fileId),
        isLoading: false,
      }));

      return { success: true };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to delete medical file";
      set({ error: errorMessage, isLoading: false });
      return { success: false, error: errorMessage };
    }
  },
}));
