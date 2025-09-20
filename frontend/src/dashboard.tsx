import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard-styles.css';

const FakeNewsDetectorDashboard: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'text' | 'link'>('text');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [result, setResult] = useState<string>('Results will appear here...');
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
  };

  const handleTypeToggle = (type: 'text' | 'link'): void => {
    setInputType(type);
    setInputValue('');
  };

  const handleLogout = (): void => {
    navigate('/logout');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!inputValue) {
      setResult('Please enter a value to check.');
      return;
    }
    
    setResult('Checking...');

    try {
      const response = await fetch('/api/detection/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { isFake, confidence, label } = data.data;
        const resultText = isFake 
          ? `The entered ${inputType} is likely to be **fake news** (${label}, confidence: ${confidence}%)`
          : `The entered ${inputType} appears to be **real news** (${label}, confidence: ${confidence}%)`;
        setResult(resultText);
      } else {
        setResult(`Error: ${data.error || 'Failed to analyze the text'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setResult('An error occurred while checking. Please try again later.');
    }
  };

  return (
    <div className="container-fluid main-container">
      <div className="dashboard-card">
        {/* Carousel section with your images */}
        <div id="carouselExampleFade" className="carousel slide carousel-fade carousel-section">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/assets/image.png" className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt="slide 1" />
            </div>
            <div className="carousel-item">
                <img src="/assets/img2.png" className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt="slide 2" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Main content section */}
        <div className="content-section">
          <div className="header-container">
            <h3>Fake News Detector</h3>
            <div className="d-flex align-items-center">
              <button className="btn btn-outline-danger btn-sm me-3" onClick={handleLogout}>
                Logout
              </button>
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
          </div>

          <div className="input-toggle-container">
            <button
              className={`input-toggle-btn ${inputType === 'text' ? 'active' : ''}`}
              onClick={() => handleTypeToggle('text')}
            >
              Text
            </button>
            <button
              className={`input-toggle-btn ${inputType === 'link' ? 'active' : ''}`}
              onClick={() => handleTypeToggle('link')}
            >
              Link
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type={inputType === 'link' ? 'url' : 'text'}
                className="form-control input-field"
                placeholder={`Enter the ${inputType} here...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn submit-btn">
                Check
              </button>
            </div>
          </form>

          <div className="result-box">
            <p dangerouslySetInnerHTML={{ __html: result }}></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeNewsDetectorDashboard;
