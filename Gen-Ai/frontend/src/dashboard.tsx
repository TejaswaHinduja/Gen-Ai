import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard-styles.css';

interface DetectionResult {
  isFake: boolean;
  confidence: number;
  label: string;
  timestamp: string;
}

const FakeNewsDetectorDashboard: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'text' | 'link'>('text');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
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
    setResult(null);
    setError(null);
  };

  const handleLogout = (): void => {
    navigate('/logout');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (!inputValue.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulate API call with better logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const isFake = inputValue.toLowerCase().includes('fake') || 
                    inputValue.toLowerCase().includes('hoax') ||
                    inputValue.toLowerCase().includes('misleading');
      
      const confidence = Math.random() * 0.3 + 0.7; // 70-100% confidence
      
      setResult({
        isFake,
        confidence,
        label: isFake ? 'Fake News' : 'Real News',
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      setError('An error occurred while analyzing the text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        {/* Hero Section */}
        <div className="dashboard-header">
          <div className="dashboard-title-section">
            <h1 className="dashboard-title">
              <span className="dashboard-icon">🔍</span>
              Fake News Detector
            </h1>
            <p className="dashboard-subtitle">
              Analyze text and links to detect misinformation with AI-powered accuracy
            </p>
          </div>
          <div className="dashboard-controls">
            <button className="btn btn-outline-danger btn-sm me-3" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt me-1"></i>
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
                <i className="fas fa-moon me-1"></i>
                Dark Mode
              </label>
            </div>
          </div>
        </div>

        {/* Main content section */}
        <div className="dashboard-content">
          <div className="input-toggle-container">
            <button
              className={`input-toggle-btn ${inputType === 'text' ? 'active' : ''}`}
              onClick={() => handleTypeToggle('text')}
            >
              <i className="fas fa-file-text me-2"></i>
              Text Analysis
            </button>
            <button
              className={`input-toggle-btn ${inputType === 'link' ? 'active' : ''}`}
              onClick={() => handleTypeToggle('link')}
            >
              <i className="fas fa-link me-2"></i>
              Link Analysis
            </button>
          </div>

          <form onSubmit={handleSubmit} className="analysis-form">
            <div className="form-group">
              {inputType === 'text' ? (
                <textarea
                  className="form-control input-field"
                  placeholder="Paste your text here to analyze for fake news..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  rows={6}
                  maxLength={5000}
                  disabled={loading}
                  required
                />
              ) : (
                <input
                  type="url"
                  className="form-control input-field"
                  placeholder="Enter the URL to analyze..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={loading}
                  required
                />
              )}
            </div>
            
            <div className="char-counter">
              {inputType === 'text' && (
                <small className="text-muted">
                  {inputValue.length}/5,000 characters
                </small>
              )}
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn submit-btn"
                disabled={loading || !inputValue.trim()}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search me-2"></i>
                    Analyze {inputType === 'text' ? 'Text' : 'Link'}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="fas fa-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          {/* Results Section */}
          {result && (
            <div className="result-section">
              <h4 className="result-title">Analysis Result</h4>
              <div className={`result-card ${result.isFake ? 'fake' : 'real'}`}>
                <div className="result-header">
                  <div className="result-icon">
                    {result.isFake ? '🚨' : '✅'}
                  </div>
                  <div className="result-info">
                    <h5 className="result-label">
                      {result.isFake ? 'FAKE NEWS DETECTED' : 'REAL NEWS'}
                    </h5>
                    <p className="result-confidence">
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="result-details">
                  <div className="result-meta">
                    <span className="result-timestamp">
                      <i className="fas fa-clock me-1"></i>
                      Analyzed at: {new Date(result.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="tips-section">
            <h5 className="tips-title">
              <i className="fas fa-lightbulb me-2"></i>
              Tips for Better Analysis
            </h5>
            <div className="tips-grid">
              <div className="tip-item">
                <i className="fas fa-check-circle text-success"></i>
                <span>Provide complete context and full sentences</span>
              </div>
              <div className="tip-item">
                <i className="fas fa-check-circle text-success"></i>
                <span>Include source information when available</span>
              </div>
              <div className="tip-item">
                <i className="fas fa-check-circle text-success"></i>
                <span>Verify results with multiple fact-checking sources</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FakeNewsDetectorDashboard;

