# 🚨 SkyReserve Troubleshooting Guide

## Quick Fix for "Stuck" Issues

### 1. **Start Backend First**
```bash
# Open a new terminal and run:
cd backend
npm start
```

### 2. **Then Start Frontend**
```bash
# In another terminal:
cd frontend
npm start
```

### 3. **If Material-UI Issues**
```bash
# Install missing dependencies:
cd frontend
npm install @fontsource/roboto
```

### 4. **Clear Cache and Restart**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### 5. **Check MongoDB**
Make sure MongoDB is running:
- Windows: Check Services or run `mongod`
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

## Common Issues & Solutions

### ❌ "Module not found" errors
```bash
cd frontend
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
```

### ❌ "Font loading" issues
```bash
npm install @fontsource/roboto
```

### ❌ "Port already in use"
```bash
# Kill processes on ports 3000 and 5000
npx kill-port 3000 5000
```

### ❌ "MongoDB connection" errors
- Check if MongoDB is running
- Verify connection string in backend/.env
- Default: `mongodb://localhost:27017/skyreserve`

## 🚀 Quick Start Commands

### Option 1: Manual Start
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend  
cd frontend
npm start
```

### Option 2: Using Scripts
```bash
# From root directory
npm run mui-start
```

## ✅ Success Indicators

- Backend: "Server running on port 5000"
- Frontend: "webpack compiled successfully"
- Browser: http://localhost:3000 opens
- No console errors in browser

## 🆘 Still Stuck?

1. **Check Console Errors**: Open browser dev tools (F12)
2. **Check Terminal Output**: Look for error messages
3. **Verify Dependencies**: `npm list` in both directories
4. **Restart Everything**: Close all terminals, restart VS Code
5. **Check Ports**: Make sure 3000 and 5000 are free

## 📞 Need Help?

- Check the README.md for full setup instructions
- Verify all dependencies are installed
- Make sure MongoDB is running
- Check that both servers start without errors
