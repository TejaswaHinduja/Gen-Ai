import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const LogoutPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        navigate('/');
      } else {
        const data = await response.json();
        console.error("Logout failed:", data.message);
        alert("Logout failed: " + data.message);
      }
    } catch (error) {
      console.error("Network error during logout:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="mb-2">Logout</h3>

              <div className="form-check form-switch">
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
            <div className="card-body text-center">
              <p>Are you sure you want to log out?</p>
              <div className="d-grid gap-2 mt-4">
                <button
                  onClick={handleLogout}
                  className="btn btn-primary"
                >
                  Confirm Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
