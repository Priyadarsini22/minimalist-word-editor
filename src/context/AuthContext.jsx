import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🧩 useEffect running...");
    const storedAccess = localStorage.getItem('token');
    const storedRefresh = localStorage.getItem('refresh');
    if (storedAccess) {
      try {
        const decoded = jwtDecode(storedAccess);
        console.log("✅ Decoded user from localStorage:", decoded);
        setUser(decoded);
        setAccessToken(storedAccess);
        setRefreshToken(storedRefresh);
      } catch (err) {
        console.error("❌ Invalid token in useEffect:", err);
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refresh');
      }
    } else {
      console.log("⚠ No token found in localStorage");
      setUser(null);
    }
    setLoading(false);
  }, []); // only run once on mount

  const login = (access, refresh) => {
    localStorage.setItem('token', access);
    localStorage.setItem('refresh', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
    try {
      const decoded = jwtDecode(access);
      setUser(decoded);
      console.log("✅ User logged in:", decoded);
    } catch (err) {
      console.error("❌ Decode failed on login:", err);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    console.log("👋 User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, accessToken, refreshToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
