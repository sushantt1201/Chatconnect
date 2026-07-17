import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { axiosInstance } from "../lib/axios";

const apiUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:4000/api"
    : "");

const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL ||
  apiUrl.replace(/\/api\/?$/, "") ||
  window.location.origin;

const getError = (error, fallback) =>
  error.response?.data?.message || error.message || fallback;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      get().connectSocket();
    } catch {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    if (get().isSigningUp) return false;

    set({ isSigningUp: true });

    try {
      const response = await axiosInstance.post("/auth/signup", {
        fullName: data.fullName?.trim(),
        Email: data.Email?.trim().toLowerCase(),
        Password: data.Password,
      });

      set({ authUser: response.data });
      get().connectSocket();
      toast.success("Account created successfully.");
      return true;
    } catch (error) {
      toast.error(getError(error, "Unable to create account."));
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    if (get().isLoggingIn) return false;

    set({ isLoggingIn: true });

    try {
      const response = await axiosInstance.post("/auth/login", {
        Email: data.Email?.trim().toLowerCase(),
        Password: data.Password,
      });

      set({ authUser: response.data });
      get().connectSocket();
      toast.success("Logged in successfully.");
      return true;
    } catch (error) {
      toast.error(getError(error, "Unable to sign in."));
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
      toast.success("Logged out successfully.");
    } catch (error) {
      toast.error(getError(error, "Unable to log out."));
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put(
        "/auth/update-profile",
        data,
      );

      set({ authUser: response.data });
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(getError(error, "Unable to update profile."));
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser) return;
    if (socket?.connected) return;

    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    const nextSocket = io(SOCKET_URL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 800,
      reconnectionDelayMax: 5000,
    });

    nextSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds.map(String) });
    });

    nextSocket.on("connect_error", (error) => {
      console.error("Socket error:", error.message);
    });

    set({ socket: nextSocket });
  },

  disconnectSocket: () => {
    const socket = get().socket;

    if (socket) {
      socket.removeAllListeners();
      socket.disconnect();
    }

    set({
      socket: null,
      onlineUsers: [],
    });
  },
}));
