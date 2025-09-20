import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css"; 

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store auth token if provided
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        navigate('/dashboard'); 
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header Section */}
        <div className="login-header">
          <div className="login-title-section">
            <h1 className="login-title">
              <span className="login-icon">🔐</span>
              Welcome Back
            </h1>
            <p className="login-subtitle">
              Sign in to access the Fake News Detector
            </p>
          </div>
          <div className="dark-mode-toggle">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="darkModeSwitch"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                <i className="fas fa-moon me-1"></i>
                Dark Mode
              </label>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="login-form-section">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                <i className="fas fa-user me-2"></i>
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                disabled={loading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock me-2"></i>
                Password
              </label>
              <div className="password-input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  disabled={loading}
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="fas fa-exclamation-triangle me-2"></i>
                {error}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary login-btn"
                disabled={loading || !username.trim() || !password.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Sign In
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demo Credentials */}
          <div className="demo-credentials">
            <h6 className="demo-title">
              <i className="fas fa-info-circle me-2"></i>
              Demo Credentials
            </h6>
            <div className="demo-info">
              <p><strong>Username:</strong> demo</p>
              <p><strong>Password:</strong> demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

