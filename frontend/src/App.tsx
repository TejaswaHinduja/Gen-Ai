import { useState } from 'react'
import './App.css'

interface DetectionResult {
  text: string;
  isFake: boolean;
  confidence: number;
  label: string;
  timestamp: string;
}

interface ApiResponse {
  success: boolean;
  data?: DetectionResult;
  error?: string;
}

function App() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<DetectionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('http://localhost:3000/api/detection/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      const data: ApiResponse = await response.json()

      if (data.success && data.data) {
        console.log('🎯 Frontend received data:', data.data)
        setResult(data.data)
      } else {
        setError(data.error || 'Failed to analyze text')
      }
    } catch (err) {
      setError('Network error. Please check if the backend server is running.')
    } finally {
      setLoading(false)
    }
  }

  const clearAll = () => {
    setText('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🔍 Fake News Detector</h1>
        <p>Paste any text below to analyze if it's fake news or not</p>
      </header>

      <main className="main">
        <div className="input-section">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your text here to check if it's fake news..."
            className="text-input"
            rows={8}
            maxLength={10000}
          />
          <div className="char-count">
            {text.length}/10,000 characters
          </div>
          
          <div className="button-group">
            <button 
              onClick={analyzeText} 
              disabled={loading || !text.trim()}
              className="analyze-btn"
            >
              {loading ? 'Analyzing...' : 'Analyze Text'}
            </button>
            <button 
              onClick={clearAll}
              className="clear-btn"
            >
              Clear
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            ❌ {error}
          </div>
        )}

        {result && (
          <div className="result-section">
            <h2>Analysis Result</h2>
            <div className={`result-card ${result.isFake ? 'fake' : 'real'}`}>
              <div className="result-header">
                <span className="result-label">
                  {result.isFake ? '🚨 FAKE NEWS' : '✅ REAL NEWS'}
                </span>
                <span className="confidence">
                  Confidence: {(result.confidence * 100).toFixed(1)}%
                </span>
              </div>
              <div className="result-details">
                <p><strong>Model Label:</strong> {result.label}</p>
                <p><strong>Analyzed at:</strong> {new Date(result.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Powered by Hugging Face AI Model</p>
      </footer>
    </div>
  )
}

export default App
