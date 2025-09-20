import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./logout.css"; // make sure the file name matches

const LogoutPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleLogout = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        navigate("/");
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.message);
        alert("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Network error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        {/* Header */}
        <div className="logout-header">
          <div className="logout-title-section">
            <h3 className="logout-title">
              <i className="fa-solid fa-right-from-bracket logout-icon"></i>
              Logout
            </h3>
            <p className="logout-subtitle">Manage your session securely</p>
          </div>

          <div className="dark-mode-toggle form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              Dark Mode
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="logout-content">
          <div className="logout-message">
            <h3>Are you sure you want to log out?</h3>
            <p>Logging out will end your session and redirect you to the home page.</p>
          </div>

          <div className="logout-actions">
            <button
              onClick={handleLogout}
              className="logout-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Logging Out...
                </>
              ) : (
                "Confirm Logout"
              )}
            </button>
            <a href="/dashboard" className="login-link">
              Cancel and return to dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
