import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  authHeader: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [authHeader, setAuthHeader] = useState<string | null>(localStorage.getItem('auth'));

    const login = async (username: string, password: string) => {
        // Basic Auth requires base64(user:pass)
        const encoded = btoa(`${username}:${password}`);
        localStorage.setItem('auth', encoded);
        setAuthHeader(encoded);
    };

    const logout = () => {
        localStorage.removeItem('auth');
        setAuthHeader(null);
    };

    return (
        <AuthContext.Provider value={{ authHeader, login, logout, isAuthenticated: !!authHeader }}>
        {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};