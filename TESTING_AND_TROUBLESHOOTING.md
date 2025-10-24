# iaBot - Testing and Troubleshooting Guide

## Quick Start

### Windows Users
```bash
# Double-click START_IABOT.bat
# Or run from command prompt:
START_IABOT.bat
```

### Linux/Mac Users
```bash
# Make script executable
chmod +x start-iabot.sh

# Run the script
./start-iabot.sh
```

---

## Manual Setup (If Scripts Don't Work)

### Terminal 1 - Backend
```bash
cd iaBot/backend
php artisan serve
```
Expected output:
```
Laravel development server started: http://127.0.0.1:8000
```

### Terminal 2 - Frontend
```bash
cd iaBot/frontend
npm run dev
```
Expected output:
```
VITE v7.0.7  ready in 123 ms

➜  Local:   http://localhost:5173/
```

---

## Testing Checklist

### ✅ Backend Health Check
```bash
curl http://localhost:8000/api/health
```
Expected response:
```json
{"status":"ok"}
```

### ✅ Create Conversation
```bash
curl -X POST http://localhost:8000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Conversation"}'
```

### ✅ List Conversations
```bash
curl http://localhost:8000/api/conversations
```

### ✅ Frontend Access
Open browser: `http://localhost:5173`

---

## Common Issues and Solutions

### Issue 1: "Port 8000 already in use"
**Symptoms:** Backend won't start, error about port 8000

**Solutions:**
```bash
# Find process using port 8000
netstat -ano | findstr :8000  # Windows
lsof -i :8000                  # Mac/Linux

# Kill the process
taskkill /PID <PID> /F         # Windows
kill -9 <PID>                  # Mac/Linux

# Or use different port
php artisan serve --port=8001
```

---

### Issue 2: "Database connection refused"
**Symptoms:** 
```
SQLSTATE[HY000]: General error: 2002 No such file or directory
```

**Solutions:**
```bash
# Check MySQL is running
# Windows: Start XAMPP Control Panel, click Start for MySQL

# Verify database exists
mysql -u root -p
SHOW DATABASES;

# Create database if missing
CREATE DATABASE iabot;

# Run migrations
php artisan migrate
```

---

### Issue 3: "Class not found" errors
**Symptoms:**
```
Class 'App\Models\Conversation' not found
```

**Solutions:**
```bash
cd backend

# Regenerate autoloader
composer dump-autoload

# Clear cache
php artisan cache:clear
php artisan config:clear

# Restart server
php artisan serve
```

---

### Issue 4: Frontend can't connect to backend
**Symptoms:** 
- Network errors in browser console
- "Failed to load conversations" message

**Solutions:**
1. Verify backend is running on port 8000
2. Check browser console (F12) for CORS errors
3. Verify frontend vite.config.js has correct proxy:
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

---

### Issue 5: "npm: command not found"
**Symptoms:** Frontend won't start

**Solutions:**
```bash
# Install Node.js from https://nodejs.org/
# Then verify installation
node --version
npm --version

# Try again
npm run dev
```

---

### Issue 6: Migrations fail
**Symptoms:**
```
SQLSTATE[42S01]: Table already exists
```

**Solutions:**
```bash
# Option 1: Fresh migration (WARNING: deletes all data)
php artisan migrate:fresh

# Option 2: Rollback and remigrate
php artisan migrate:rollback
php artisan migrate

# Option 3: Check migration status
php artisan migrate:status
```

---

## Testing API Endpoints

### Using cURL

#### Create Conversation
```bash
curl -X POST http://localhost:8000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Chat",
    "metadata": {"topic": "general"}
  }'
```

#### Get All Conversations
```bash
curl http://localhost:8000/api/conversations
```

#### Create Message
```bash
curl -X POST http://localhost:8000/api/conversations/1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "role": "user",
    "content": "Hello, how are you?",
    "status": "completed"
  }'
```

#### Get Messages
```bash
curl http://localhost:8000/api/conversations/1/messages
```

#### Update Conversation
```bash
curl -X PATCH http://localhost:8000/api/conversations/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

#### Delete Conversation
```bash
curl -X DELETE http://localhost:8000/api/conversations/1
```

---

### Using Postman

1. Import collection or create requests manually
2. Set base URL: `http://localhost:8000/api`
3. Test each endpoint with appropriate methods and payloads

---

## Browser Developer Tools

### Check Network Requests
1. Open browser (Chrome/Firefox)
2. Press F12 to open Developer Tools
3. Go to Network tab
4. Perform actions in the app
5. Check requests and responses

### Check Console Errors
1. Press F12
2. Go to Console tab
3. Look for red error messages
4. Check error details

### Check Application Storage
1. Press F12
2. Go to Application tab
3. Check Local Storage for any saved data
4. Check Cookies

---

## Performance Testing

### Backend Response Time
```bash
# Time a request
time curl http://localhost:8000/api/conversations
```

### Frontend Build
```bash
cd frontend
npm run build
```

Check build output size and time.

---

## Database Inspection

### View Tables
```bash
mysql -u root -p iabot
SHOW TABLES;
DESCRIBE conversations;
DESCRIBE messages;
SELECT * FROM conversations;
```

### Check Logs
```bash
# Backend logs
tail -f backend/storage/logs/laravel.log

# Frontend console
# Open browser F12 > Console tab
```

---

## Reset Everything

### Complete Reset (WARNING: Deletes all data)
```bash
cd backend

# Drop and recreate database
php artisan migrate:fresh

# Clear all caches
php artisan cache:clear
php artisan config:clear
php artisan view:clear

# Restart server
php artisan serve
```

---

## Success Indicators

✅ Backend server running on port 8000
✅ Frontend server running on port 5173
✅ Can create conversations
✅ Can send messages
✅ Can view conversation history
✅ Can delete conversations
✅ No errors in browser console
✅ No errors in backend logs

---

## Getting Help

1. Check backend logs: `storage/logs/laravel.log`
2. Check browser console: F12 > Console
3. Check network requests: F12 > Network
4. Verify database connection
5. Verify both servers are running
6. Check firewall settings

