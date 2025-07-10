import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PublicDoc from "./pages/PublicDoc";
import { AuthContext } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="p-4">Loading authentication...</div>;
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? "dark-mode" : ""}>
      <button
        onClick={() => setDark(!dark)}
        className="fixed top-2 right-2 px-3 py-1 bg-gray-700 text-white rounded"
      >
        Toggle Theme
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/doc/:id" element={<PublicDoc />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
