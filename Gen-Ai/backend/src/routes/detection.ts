import express from 'express';
import { FakeNewsDetectionService } from '../services/fakeNewsDetection.js';

const router = express.Router();
const detectionService = new FakeNewsDetectionService();

// POST /api/detection/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Text input is required and must be a non-empty string'
      });
    }

    if (text.length > 10000) {
      return res.status(400).json({
        success: false,
        error: 'Text input is too long. Maximum 10,000 characters allowed.'
      });
    }

    const result = await detectionService.detectFakeNews(text.trim());

    res.json({
      success: true,
      data: {
        text: text.trim(),
        isFake: result.isFake,
        confidence: Math.round(result.confidence * 100) / 100, // Round to 2 decimal places
        label: result.label,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error in detection route:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    });
  }
});

// GET /api/detection/health
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Fake news detection service is running',
    timestamp: new Date().toISOString()
  });
});

export default router;
