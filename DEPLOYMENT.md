# Vercel Deployment Guide

This guide will help you deploy your Fake News Detector application on Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. A MongoDB database (use [MongoDB Atlas](https://www.mongodb.com/atlas) for free)
3. Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Backend Deployment

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy Backend to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "New Project"
   - Import your repository
   - Set the **Root Directory** to `backend`
   - Configure environment variables:
     - `MONGO_URL`: Your MongoDB connection string
     - `JWT_SECRET`: A secure random string for JWT tokens
     - `FRONTEND_URL`: Will be set after frontend deployment
     - `NODE_ENV`: `production`
   - Click "Deploy"

3. **Note your backend URL** (e.g., `https://your-backend-app.vercel.app`)

### 2. Frontend Deployment

1. **Deploy Frontend to Vercel**
   - Create another new project in Vercel
   - Import the same repository
   - Set the **Root Directory** to `frontend`
   - No environment variables needed for frontend
   - Click "Deploy"

2. **Note your frontend URL** (e.g., `https://your-frontend-app.vercel.app`)

### 3. Update CORS Configuration

1. **Update Backend Environment Variables**
   - Go to your backend project in Vercel dashboard
   - Go to Settings → Environment Variables
   - Update `FRONTEND_URL` to your actual frontend URL
   - Redeploy the backend

### 4. Database Setup

1. **MongoDB Atlas Setup**
   - Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Create a database user
   - Whitelist all IP addresses (0.0.0.0/0) for Vercel
   - Get your connection string and use it as `MONGO_URL`

## Project Structure

```
gen/
├── frontend/          # React frontend
│   ├── vercel.json   # Frontend Vercel config
│   └── ...
├── backend/          # Express backend
│   ├── vercel.json   # Backend Vercel config
│   └── ...
└── DEPLOYMENT.md     # This file
```

## Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-frontend-app.vercel.app
NODE_ENV=production
```

## Troubleshooting

### Common Issues

1. **CORS Errors**
   - Make sure `FRONTEND_URL` is set correctly in backend environment variables
   - Check that the frontend URL matches exactly (including https://)

2. **Database Connection Issues**
   - Verify MongoDB connection string is correct
   - Check that IP addresses are whitelisted in MongoDB Atlas
   - Ensure database user has proper permissions

3. **Build Errors**
   - Check that all dependencies are in package.json
   - Verify TypeScript compilation works locally
   - Check Vercel build logs for specific errors

### Testing Locally

1. **Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## URLs After Deployment

- **Frontend**: `https://your-frontend-app.vercel.app`
- **Backend API**: `https://your-backend-app.vercel.app/api`

## Support

If you encounter issues:
1. Check Vercel function logs in the dashboard
2. Verify all environment variables are set
3. Test API endpoints directly using tools like Postman
4. Check MongoDB Atlas logs for database issues
