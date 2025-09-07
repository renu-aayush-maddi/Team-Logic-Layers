// src/auth/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || null);
  const [email, setEmail] = useState(() => localStorage.getItem("auth_email") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem("auth_token", token);
      if (email) localStorage.setItem("auth_email", email);
    } else {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_email");
      setEmail(null);
    }
  }, [token, email]);

  async function signup({ name, email: em, password }) {
    setLoading(true);
    try {
      const data = await api.signup({ name, email: em, password });
      // backend returns TokenResponse { access_token }
      setToken(data.access_token);
      setEmail(em);
      navigate("/chat");
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function login({ email: em, password }) {
    setLoading(true);
    try {
      const data = await api.login({ email: em, password });
      setToken(data.access_token);
      setEmail(em);
      navigate("/chat");
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setEmail(null);
    navigate("/login");
  }

  return (
    <AuthContext.Provider value={{ token, email, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
