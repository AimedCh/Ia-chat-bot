# iaBot - Complete Setup and Fixes Guide

## Overview
This guide documents all the fixes applied to the iaBot chatbot application and provides step-by-step instructions to run both frontend and backend.

## Issues Found and Fixed

### 1. **Database Connection Configuration** ✅
**Problem:** The `.env` file had `DB_CONNECTION=sql` which is not a valid Laravel database driver.

**Fix Applied:**
```
Changed: DB_CONNECTION=sql
To:      DB_CONNECTION=mysql
```

**Location:** `iaBot/backend/.env` (Line 23)

**Why:** Laravel supports: `sqlite`, `mysql`, `mariadb`, `pgsql`, `sqlsrv`. The "sql" driver doesn't exist.

---

### 2. **CORS Configuration** ✅
**Status:** Already properly configured in `iaBot/backend/bootstrap/app.php`

The CORS middleware is correctly registered:
```php
$middleware->append(HandleCors::class);
```

And configured in `iaBot/backend/config/cors.php` to allow requests from `http://localhost:5173` (frontend).

---

### 3. **Backend Controllers** ✅
**Status:** All controllers are properly implemented:
- `ConversationController` - Handles conversation CRUD operations
- `MessageController` - Handles message CRUD operations
- `ProviderConfigController` - Handles AI provider configurations
- `AuthController` - Handles user authentication

---

### 4. **Error Handling & Logging** ✅
**Improvements Made:**

**Backend Controllers:**
- Added try-catch blocks to all CRUD operations
- Added logging using `Log::info()`, `Log::warning()`, and `Log::error()`
- Proper error responses with HTTP status codes
- Validation error handling

**Frontend Components:**
- Added error state management in Chat.jsx
- Error notifications displayed to users
- Better error messages from API responses
- Error dismissal functionality

---

### 5. **Database Schema** ✅
**Tables Created by Migrations:**

1. **users** - User accounts
   - id, name, email, password, timestamps

2. **conversations** - Chat conversations
   - id, user_id, title, metadata, timestamps

3. **messages** - Chat messages
   - id, conversation_id, role, content, usage, status, timestamps

4. **provider_configs** - AI provider settings
   - id, user_id, provider, model, api_key, settings, timestamps

5. **personal_access_tokens** - API tokens for Sanctum
6. **cache** - Cache table
7. **jobs** - Queue jobs table

---

## Step-by-Step Setup Instructions

### Prerequisites
- PHP 8.2 or higher
- MySQL 5.7 or higher (or MariaDB)
- Node.js 16+ and npm
- Composer

### Backend Setup

#### Step 1: Navigate to Backend Directory
```bash
cd iaBot/backend
```

#### Step 2: Install PHP Dependencies
```bash
composer install
```

#### Step 3: Verify .env Configuration
```bash
# Check that these values are set correctly:
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=iabot
DB_USERNAME=root
DB_PASSWORD=
```

#### Step 4: Generate Application Key (if not already done)
```bash
php artisan key:generate
```

#### Step 5: Create Database
```bash
# Using MySQL command line:
mysql -u root -p
CREATE DATABASE iabot;
EXIT;
```

#### Step 6: Run Migrations
```bash
php artisan migrate
```

This will create all necessary tables:
- users
- conversations
- messages
- provider_configs
- personal_access_tokens
- cache
- jobs

#### Step 7: Start Backend Server
```bash
php artisan serve
```

The backend will run on `http://localhost:8000`

---

### Frontend Setup

#### Step 1: Navigate to Frontend Directory
```bash
cd iaBot/frontend
```

#### Step 2: Install Node Dependencies
```bash
npm install
```

#### Step 3: Start Development Server
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

---

## Testing the Application

### 1. Access the Application
Open your browser and go to: `http://localhost:5173`

### 2. Test Conversation Creation
- Click "+ New Chat" button
- A new conversation should be created

### 3. Test Message Sending
- Type a message in the input field
- Press Enter or click Send
- Your message should appear on the right (blue)
- An AI response should appear on the left (gray)

### 4. Test Conversation Management
- View all conversations in the sidebar
- Click on a conversation to load its messages
- Delete a conversation by hovering and clicking the ✕ button

### 5. Check Backend Logs
```bash
# In backend directory, view logs:
tail -f storage/logs/laravel.log
```

---

## API Endpoints

### Health Check
```
GET /api/health
```

### Conversations
```
GET    /api/conversations              - List all conversations
POST   /api/conversations              - Create new conversation
GET    /api/conversations/{id}         - Get conversation with messages
PATCH  /api/conversations/{id}         - Update conversation
DELETE /api/conversations/{id}         - Delete conversation
```

### Messages
```
GET    /api/conversations/{id}/messages              - List messages
POST   /api/conversations/{id}/messages              - Create message
GET    /api/conversations/{id}/messages/{msg_id}    - Get message
PATCH  /api/conversations/{id}/messages/{msg_id}    - Update message
DELETE /api/conversations/{id}/messages/{msg_id}    - Delete message
```

### Provider Configs
```
GET    /api/provider-configs           - List configurations
POST   /api/provider-configs           - Create configuration
GET    /api/provider-configs/{id}      - Get configuration
PATCH  /api/provider-configs/{id}      - Update configuration
DELETE /api/provider-configs/{id}      - Delete configuration
```

---

## Troubleshooting

### Issue: "SQLSTATE[HY000]: General error: 1030 Got error..."
**Solution:** Ensure MySQL is running and database exists:
```bash
mysql -u root -p
SHOW DATABASES;
```

### Issue: "Connection refused" on port 8000
**Solution:** Backend server not running. Start it:
```bash
cd iaBot/backend
php artisan serve
```

### Issue: Frontend can't connect to backend
**Solution:** Check CORS configuration and ensure backend is running on port 8000.

### Issue: "Class not found" errors
**Solution:** Run composer autoload:
```bash
cd iaBot/backend
composer dump-autoload
```

### Issue: Migrations not running
**Solution:** Check database connection and run:
```bash
php artisan migrate:fresh
```

---

## Performance Optimizations

1. **Database Indexing** - Foreign keys are indexed
2. **Eager Loading** - Messages loaded with conversations
3. **Error Handling** - Prevents unnecessary database queries
4. **Logging** - Helps identify performance bottlenecks
5. **CORS Caching** - Configured for optimal performance

---

## Security Improvements

1. **Input Validation** - All inputs validated before database operations
2. **Authorization** - Public user isolation for multi-tenant support
3. **Error Messages** - Generic error messages to prevent information leakage
4. **Logging** - All operations logged for audit trail
5. **API Key Hiding** - Provider API keys hidden from responses

---

## Next Steps

1. **Implement AI Integration** - Connect to OpenAI, Anthropic, or other providers
2. **Add Authentication** - Implement user login/registration
3. **Database Backups** - Set up automated backups
4. **Deployment** - Deploy to production server
5. **Monitoring** - Set up error tracking and monitoring

---

## Support

For issues or questions, check:
- Backend logs: `iaBot/backend/storage/logs/laravel.log`
- Browser console: Press F12 in browser
- Network tab: Check API requests and responses

