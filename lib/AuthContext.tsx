'use client';

import { createContext, useContext, useState } from 'react';

type AdminUser = {
  id: string;
  email: string;
  role: string;
};

type AuthContextType = {
  admin: AdminUser | null;
  token: string | null;
  login: (adminData: AdminUser, authToken: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (adminData: AdminUser, authToken: string) => {
    setAdmin(adminData);
    setToken(authToken);
    localStorage.setItem('adminToken', authToken);
    localStorage.setItem('admin', JSON.stringify(adminData));
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
