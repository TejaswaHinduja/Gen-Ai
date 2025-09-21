import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard-styles.css';

const FakeNewsDetectorDashboard: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'text' | 'link'>('text');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [result, setResult] = useState<string>('Results will appear here...');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<{
    isFake: boolean;
    confidence: number;
    label: string;
    explanation?: string;
  } | null>(null);
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
        const explanation = generateExplanation(inputValue, isFake);
        setAnalysisResult({ isFake, confidence, label, explanation });
        setShowModal(true);
        setResult('Analysis complete! Check the results below.');
      } else {
        setResult(`Error: ${data.error || 'Failed to analyze the text'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setResult('An error occurred while checking. Please try again later.');
    }
  };

  const generateExplanation = (inputText: string, isFake: boolean): string => {
    if (!isFake) {
      return "This content appears to be legitimate news based on our analysis. The information seems credible and well-sourced.";
    }

    const text = inputText.toLowerCase();
    
    // Check for specific fake news patterns
    if (text.includes('delhi') && (text.includes('flood') || text.includes('floods'))) {
      return "This appears to be fake news about Delhi floods. Delhi is not prone to major flooding, and such claims are often used to create panic. Always verify such claims with official sources like the Delhi government or meteorological department.";
    }
    
    if (text.includes('celebrity') && (text.includes('death') || text.includes('died'))) {
      return "This appears to be a fake celebrity death hoax. Such rumors are commonly spread on social media. Always verify celebrity news through official sources or verified news outlets.";
    }
    
    if (text.includes('covid') || text.includes('coronavirus')) {
      return "This appears to be misinformation about COVID-19. Medical information should always be verified through official health organizations like WHO or your local health department.";
    }
    
    if (text.includes('election') && (text.includes('rigged') || text.includes('fraud'))) {
      return "This appears to be election misinformation. Electoral processes are closely monitored and verified. Always check official election commission sources for accurate information.";
    }
    
    if (text.includes('conspiracy') || text.includes('secret') || text.includes('hidden truth')) {
      return "This appears to contain conspiracy theory elements. Conspiracy theories often lack credible evidence and should be approached with skepticism. Verify claims through multiple reliable sources.";
    }
    
    if (text.includes('urgent') || text.includes('breaking') || text.includes('shocking')) {
      return "This appears to use sensational language typical of fake news. Real news outlets use measured language and provide proper context. Be cautious of content designed to create emotional reactions.";
    }
    
    if (text.includes('click here') || text.includes('share now') || text.includes('you won\'t believe')) {
      return "This appears to use clickbait tactics common in fake news. Legitimate news doesn't rely on such manipulative language to attract attention.";
    }
    
    // Default explanation for fake news
    return "This content has been flagged as potentially fake news. It may contain misleading information, lack credible sources, or use manipulative language. Always verify information through multiple reliable sources before sharing.";
  };

  const closeModal = (): void => {
    setShowModal(false);
    setAnalysisResult(null);
  };

  return (
    <div className="container-fluid main-container">
      <div className="dashboard-card">
        {/* Carousel section with your images */}
        <div id="carouselExampleFade" className="carousel slide carousel-fade carousel-section">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/image.png" className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt="" />
            </div>
            <div className="carousel-item">
                <img src="/assets/img2.png" className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt="" />
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
            <p>{result}</p>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showModal && analysisResult && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Analysis Results</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center">
                <div className={`alert ${analysisResult.isFake ? 'alert-danger' : 'alert-success'} mb-3`}>
                  <h4 className="alert-heading">
                    {analysisResult.isFake ? '⚠️ Fake News Detected' : '✅ Real News'}
                  </h4>
                  <p className="mb-0">
                    The entered {inputType} is classified as <strong>{analysisResult.label}</strong>
                  </p>
                </div>
                <div className="confidence-display">
                  <h5>Confidence Level</h5>
                  <div className="progress mb-3" style={{ height: '25px' }}>
                    <div
                      className={`progress-bar ${analysisResult.isFake ? 'bg-danger' : 'bg-success'}`}
                      role="progressbar"
                      style={{ width: `${analysisResult.confidence * 100}%` }}
                      aria-valuenow={analysisResult.confidence * 100}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      {Math.round(analysisResult.confidence * 100)}%
                    </div>
                  </div>
                  <p className="text-muted">
                    The model is {Math.round(analysisResult.confidence * 100)}% confident in this classification.
                  </p>
                </div>
                
                {analysisResult.explanation && (
                  <div className="explanation-section mt-4">
                    <h5>Explanation</h5>
                    <div className={`alert ${analysisResult.isFake ? 'alert-warning' : 'alert-info'} text-start`}>
                      <p className="mb-0">{analysisResult.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={() => {
                  setInputValue('');
                  closeModal();
                }}>
                  Analyze Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal backdrop */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default FakeNewsDetectorDashboard;
