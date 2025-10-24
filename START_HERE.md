# 🤖 iaBot - START HERE

Welcome to iaBot! This document will guide you through getting started with the chatbot application.

---

## ⚡ Quick Start (2 Minutes)

### Windows Users
```bash
# Double-click this file:
START_IABOT.bat

# Or run from command prompt:
cd iaBot
START_IABOT.bat
```

### Linux/Mac Users
```bash
# Run this command:
cd iaBot
chmod +x start-iabot.sh
./start-iabot.sh
```

### Then Open Browser
```
http://localhost:5173
```

---

## 📚 Documentation Guide

### 🟢 Start Here (You are here!)
**File:** `START_HERE.md`
- Quick overview
- Getting started guide
- Documentation index

### 🔵 Setup Instructions
**File:** `SETUP_AND_FIXES_GUIDE.md`
- Complete setup steps
- Database configuration
- All issues and fixes
- Troubleshooting

### 🟡 Testing Guide
**File:** `TESTING_AND_TROUBLESHOOTING.md`
- How to test the app
- Common issues and solutions
- API testing examples
- Performance testing

### 🟣 Technical Details
**File:** `CHANGES_SUMMARY.md`
- All code changes
- Files modified
- Technical improvements
- Configuration details

### 🔴 Executive Summary
**File:** `FINAL_REPORT.md`
- Project completion status
- All issues fixed
- Deliverables
- Next steps

### ⚪ Quick Reference
**File:** `QUICK_REFERENCE.md`
- Quick commands
- Common URLs
- Database info
- Emergency commands

---

## 🎯 What Was Fixed

### Critical Issues ✅
- **Database Connection** - Fixed from `sql` to `mysql`
- **Error Handling** - Added to all backend operations
- **Frontend Errors** - Added error notifications

### Enhancements ✅
- **Logging** - All operations now logged
- **Error Messages** - Better user feedback
- **Code Quality** - Improved throughout

### Verified ✅
- **CORS Configuration** - Working correctly
- **Database Migrations** - All 7 tables created
- **API Endpoints** - All 16 endpoints working
- **Frontend Components** - All working correctly

---

## 🚀 Running the Application

### Automatic (Recommended)
```bash
# Windows
START_IABOT.bat

# Linux/Mac
./start-iabot.sh
```

### Manual
```bash
# Terminal 1 - Backend
cd iaBot/backend
php artisan serve

# Terminal 2 - Frontend
cd iaBot/frontend
npm run dev
```

### Access
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:8000

---

## 🧪 Testing the App

1. **Open Browser**
   - Go to http://localhost:5173

2. **Create Conversation**
   - Click "+ New Chat" button

3. **Send Message**
   - Type a message
   - Press Enter or click Send

4. **View History**
   - Messages appear in conversation

5. **Delete Conversation**
   - Hover over conversation
   - Click ✕ button

---

## 📊 Project Structure

```
iaBot/
├── backend/                    (Laravel API)
│   ├── app/Http/Controllers/   (5 controllers)
│   ├── app/Models/             (4 models)
│   ├── database/migrations/    (7 migrations)
│   ├── routes/api.php          (API routes)
│   └── .env                    (Configuration)
│
├── frontend/                   (React + Vite)
│   ├── src/pages/              (3 pages)
│   ├── src/components/         (5 components)
│   ├── src/api/                (API client)
│   └── vite.config.js
│
└── Documentation/
    ├── START_HERE.md           (This file)
    ├── SETUP_AND_FIXES_GUIDE.md
    ├── TESTING_AND_TROUBLESHOOTING.md
    ├── CHANGES_SUMMARY.md
    ├── FINAL_REPORT.md
    ├── QUICK_REFERENCE.md
    ├── START_IABOT.bat
    └── start-iabot.sh
```

---

## 🔧 Prerequisites

Before running, make sure you have:

- ✅ **PHP 8.2+** - Check: `php --version`
- ✅ **MySQL 5.7+** - Check: `mysql --version`
- ✅ **Node.js 16+** - Check: `node --version`
- ✅ **npm** - Check: `npm --version`
- ✅ **Composer** - Check: `composer --version`

### Install Missing Tools

**PHP & MySQL:**
- Download XAMPP: https://www.apachefriends.org/

**Node.js & npm:**
- Download: https://nodejs.org/

**Composer:**
- Download: https://getcomposer.org/

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 8000 is in use
netstat -ano | findstr :8000

# Use different port
php artisan serve --port=8001
```

### Database connection error
```bash
# Make sure MySQL is running
# Windows: Start XAMPP, click Start for MySQL

# Create database
mysql -u root -p
CREATE DATABASE iabot;
```

### Frontend won't start
```bash
# Install dependencies
cd frontend
npm install

# Try again
npm run dev
```

### More issues?
See: `TESTING_AND_TROUBLESHOOTING.md`

---

## 📡 API Endpoints

### Health Check
```bash
curl http://localhost:8000/api/health
```

### Create Conversation
```bash
curl -X POST http://localhost:8000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{"title":"My Chat"}'
```

### List Conversations
```bash
curl http://localhost:8000/api/conversations
```

More endpoints: See `QUICK_REFERENCE.md`

---

## 📝 Database

| Property | Value |
|----------|-------|
| Host | 127.0.0.1 |
| Port | 3306 |
| Database | iabot |
| User | root |
| Password | (empty) |

**Tables:** users, conversations, messages, provider_configs, personal_access_tokens, cache, jobs

---

## ✨ Features

✅ Create chat conversations
✅ Send and receive messages
✅ View message history
✅ Delete conversations
✅ Update conversation titles
✅ AI provider configuration
✅ Error handling & logging
✅ Responsive UI

---

## 🎓 Next Steps

1. **Get Started**
   - Run the application
   - Create a conversation
   - Send a message

2. **Explore**
   - Check the code
   - Review the API
   - Test all features

3. **Customize**
   - Add AI integration
   - Implement authentication
   - Deploy to production

---

## 📞 Need Help?

1. **Check Documentation**
   - `SETUP_AND_FIXES_GUIDE.md` - Setup help
   - `TESTING_AND_TROUBLESHOOTING.md` - Troubleshooting
   - `QUICK_REFERENCE.md` - Quick commands

2. **Check Logs**
   - Backend: `backend/storage/logs/laravel.log`
   - Frontend: Browser console (F12)

3. **Check Network**
   - Browser DevTools (F12)
   - Network tab for API requests

---

## 🎉 You're Ready!

Everything is set up and ready to go. Just run the startup script and start chatting!

```bash
# Windows
START_IABOT.bat

# Linux/Mac
./start-iabot.sh
```

Then open: **http://localhost:5173**

---

## 📋 Checklist

- [ ] Prerequisites installed
- [ ] MySQL running
- [ ] Database created
- [ ] Backend started
- [ ] Frontend started
- [ ] Browser opened to localhost:5173
- [ ] Created first conversation
- [ ] Sent first message
- [ ] Viewed message history

---

**Status:** ✅ Ready to Use
**Last Updated:** 2025-10-24
**Version:** 1.0

Enjoy your iaBot chatbot! 🚀

