import React, { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('auth_user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = async (username: string, _password: string) => {
    // Fake async login; in real app, call backend
    const loggedIn = { username };
    setUser(loggedIn);
    localStorage.setItem('auth_user', JSON.stringify(loggedIn));
  };

  const register = async (username: string, _password: string) => {
    // Fake async register; immediately log in
    const registered = { username };
    setUser(registered);
    localStorage.setItem('auth_user', JSON.stringify(registered));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
