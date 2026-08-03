"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AdminContextType {
  isAdmin: boolean;
  login: (passcode: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  login: () => false,
  logout: () => {},
});

export const ADMIN_PASSCODE = "aq2026admin"; // Secret admin passcode

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("aq_is_admin");
    if (stored === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = (passcode: string) => {
    if (passcode === ADMIN_PASSCODE) {
      setIsAdmin(true);
      sessionStorage.setItem("aq_is_admin", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("aq_is_admin");
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
