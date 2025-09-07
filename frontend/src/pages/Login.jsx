// import React, { useState } from "react";
// import { useAuth } from "../auth/AuthContext";

// export default function Login() {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [err, setErr] = useState(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setErr(null);
//     setLoading(true);
//     try {
//       await login({ email, password });
//     } catch (error) {
//       setErr(error.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="card" style={{ maxWidth: 520 }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email
//           <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>

//         <label>
//           Password
//           <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>

//         <div style={{ marginTop: 12 }}>
//           <button className="primary" type="submit" disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </div>
//         {err && <div style={{ color: "red", marginTop: 8 }}>{err}</div>}
//       </form>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login({ email, password });
    } catch (error) {
      setErr(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="card-header">
          <h2>Welcome back</h2>
          <p>Sign in to your account to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input 
              id="email"
              className="form-input"
              required 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input 
              id="password"
              className="form-input"
              required 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input type="checkbox" id="remember" className="checkbox" />
              <label htmlFor="remember" className="checkbox-label">Remember me</label>
            </div>
            <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          </div>

          <button 
            className={`submit-button ${loading ? 'loading' : ''}`}
            type="submit" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading-spinner"></span>
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </button>

          {err && (
            <div className="error-message">
              <span className="error-icon">⚠</span>
              {err}
            </div>
          )}
        </form>

        <div className="card-footer">
          <p>Don't have an account? <a href="/signup" className="signup-link">Create account</a></p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        .login-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          padding: 40px;
          width: 100%;
          max-width: 420px;
          position: relative;
          overflow: hidden;
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        .card-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .card-header h2 {
          color: #1a202c;
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px 0;
          letter-spacing: -0.025em;
        }

        .card-header p {
          color: #718096;
          font-size: 16px;
          margin: 0;
        }

        .login-form {
          space-y: 24px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          letter-spacing: 0.025em;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
          transition: all 0.2s ease-in-out;
          background: #fafafa;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-1px);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          margin-top: 16px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .checkbox {
          width: 16px;
          height: 16px;
          accent-color: #667eea;
        }

        .checkbox-label {
          font-size: 14px;
          color: #374151;
          cursor: pointer;
          margin: 0;
        }

        .forgot-password {
          font-size: 14px;
          color: #667eea;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease-in-out;
        }

        .forgot-password:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        .submit-button {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
          position: relative;
          overflow: hidden;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .submit-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-button.loading {
          pointer-events: none;
        }

        .loading-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 14px;
          margin-top: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: slideIn 0.3s ease-out;
        }

        .error-icon {
          font-size: 16px;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card-footer {
          text-align: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #f3f4f6;
        }

        .card-footer p {
          color: #6b7280;
          font-size: 14px;
          margin: 0;
        }

        .signup-link {
          color: #667eea;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease-in-out;
        }

        .signup-link:hover {
          color: #5a67d8;
          text-decoration: underline;
        }

        @media (max-width: 480px) {
          .login-container {
            padding: 16px;
          }
          
          .login-card {
            padding: 24px;
          }
          
          .card-header h2 {
            font-size: 24px;
          }
          
          .form-input {
            font-size: 16px; /* Prevents zoom on iOS */
          }

          .form-options {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
