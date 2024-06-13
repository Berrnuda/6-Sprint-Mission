import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../components/API/axios";
import { useNavigate } from "react-router-dom";

type AuthProps = {
  children: React.ReactNode;
};

interface User {
  updatedAt: Date;
  createdAt: Date;
  image: string;
  nickname: string;
  id: number;
}

interface AuthContextType {
  user: User | null;
  isPending: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  // updateUser: (formData: FormData) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: AuthProps) {
  const [values, setValues] = useState<{
    user: User | null;
    isPending: boolean;
  }>({
    user: null,
    isPending: true,
  });

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  async function getUser() {
    setValues((prev) => ({
      ...prev,
      isPending: true,
    }));
    let nextUser: User | null;
    try {
      const res = await axios.get("/users/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      nextUser = res.data;
    } catch (e: any) {
      if (e.response.status === 401) return;
    } finally {
      setValues((prev) => ({
        ...prev,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login(email: string, password: string) {
    const res = await axios.post("/auth/signIn", {
      email,
      password,
    });
    const { accessToken, refreshToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    await getUser();
  }

  async function logout() {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");

    setValues((prev) => ({
      ...prev,
      user: null,
    }));
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        // updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(required: boolean | null = null) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error("반드시 AuthProvider 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (required === null) return;
    if (required && !context.user && !context.isPending) {
      navigate("/signin");
    } else if (!required && context.user && !context.isPending) {
      navigate("/");
    }
  }, [context.user, context.isPending, required]);

  return context;
}
