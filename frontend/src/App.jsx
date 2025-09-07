import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChatPage from "./pages/ChatPage";
import { useAuth } from "./auth/AuthContext";

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>Template Engine Demo</h1>
          <p className="subtitle" style={{ margin: 0 }}>Home · Login · Signup · Chat</p>
        </div>

        <nav>
          <Link to="/">Home</Link> {" | "}
          {user ? (
            <>
              <Link to="/chat">Chat</Link> {" | "}
              <button className="linklike" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link> {" | "}
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </header>

      <main style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </main>

      <footer style={{ marginTop: 30, color: "#6b7280" }}>
        Demo — local auth (signup/login) stored in localStorage.
      </footer>
    </div>
  );
}
