# 🔍 Fake News Detection Website

A modern web application that uses AI to detect fake news. Users can paste any text and get an instant analysis of whether it's likely to be fake news or not.

## ✨ Features

- **Real-time Analysis**: Instant fake news detection using Hugging Face AI model
- **Modern UI**: Beautiful, responsive design with gradient backgrounds
- **Confidence Scores**: Shows how confident the AI is in its prediction
- **Character Limit**: 10,000 character limit to prevent abuse
- **Error Handling**: Comprehensive error handling and user feedback
- **Mobile Responsive**: Works perfectly on all device sizes

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- Hugging Face account and API token

### 1. Clone and Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `backend` directory:

```env
HF_TOKEN=your_hugging_face_token_here
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fake-news-detector
```

**To get your Hugging Face token:**
1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up/Login
3. Go to Settings → Access Tokens
4. Create a new token with read permissions

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## 🛠️ API Endpoints

### POST `/api/detection/analyze`
Analyze text for fake news detection.

**Request:**
```json
{
  "text": "Your text to analyze here..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "Your text to analyze here...",
    "isFake": false,
    "confidence": 0.95,
    "label": "REAL",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET `/api/detection/health`
Check if the detection service is running.

## 🏗️ Project Structure

```
├── backend/
│   ├── src/
│   │   ├── services/
│   │   │   └── fakeNewsDetection.ts    # Hugging Face API integration
│   │   ├── routes/
│   │   │   └── detection.ts            # API endpoints
│   │   ├── models/
│   │   │   └── user.ts                 # User model (existing)
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts       # Auth middleware (existing)
│   │   ├── app.ts                      # Express app setup
│   │   └── db.ts                       # Database connection
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx                     # Main React component
│   │   ├── App.css                     # Styling
│   │   └── main.tsx                    # React entry point
│   └── package.json
└── README.md
```

## 🎨 UI Features

- **Gradient Background**: Beautiful purple gradient design
- **Glass Morphism**: Modern frosted glass effects
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages
- **Result Cards**: Clear visual indicators for fake/real news

## 🔧 Customization

### Changing the AI Model

To use a different Hugging Face model, update the `apiUrl` in `backend/src/services/fakeNewsDetection.ts`:

```typescript
private readonly apiUrl = "https://router.huggingface.co/hf-inference/models/YOUR_MODEL_NAME";
```

### Styling

The main styles are in `frontend/src/App.css`. You can customize:
- Colors and gradients
- Button styles
- Card layouts
- Typography

## 🚨 Troubleshooting

### Common Issues

1. **"HF_TOKEN environment variable is required"**
   - Make sure you've created the `.env` file in the backend directory
   - Verify your Hugging Face token is correct

2. **"Network error. Please check if the backend server is running"**
   - Ensure the backend is running on port 3000
   - Check that CORS is properly configured

3. **MongoDB connection issues**
   - Make sure MongoDB is running
   - Verify the MONGODB_URI in your .env file

### Debug Mode

To see detailed logs, check the console output in both terminal windows.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Note**: This application is for educational purposes. While the AI model is quite accurate, it should not be the sole source for determining news authenticity. Always verify information through multiple reliable sources.
