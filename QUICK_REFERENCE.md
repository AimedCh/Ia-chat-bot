# iaBot - Quick Reference Card

## 🚀 Quick Start

### Windows
```bash
cd iaBot
START_IABOT.bat
```

### Linux/Mac
```bash
cd iaBot
chmod +x start-iabot.sh
./start-iabot.sh
```

### Manual
```bash
# Terminal 1
cd iaBot/backend && php artisan serve

# Terminal 2
cd iaBot/frontend && npm run dev
```

---

## 🌐 URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8000 |
| API Health | http://localhost:8000/api/health |

---

## 📊 Database

| Property | Value |
|----------|-------|
| Host | 127.0.0.1 |
| Port | 3306 |
| Database | iabot |
| User | root |
| Password | (empty) |

---

## 📁 Project Structure

```
iaBot/
├── backend/          (Laravel API)
├── frontend/         (React + Vite)
├── SETUP_AND_FIXES_GUIDE.md
├── TESTING_AND_TROUBLESHOOTING.md
├── CHANGES_SUMMARY.md
├── FINAL_REPORT.md
├── START_IABOT.bat
└── start-iabot.sh
```

---

## 🔧 Common Commands

### Backend
```bash
cd iaBot/backend

# Install dependencies
composer install

# Run migrations
php artisan migrate

# Clear cache
php artisan cache:clear

# View logs
tail -f storage/logs/laravel.log

# Start server
php artisan serve
```

### Frontend
```bash
cd iaBot/frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📡 API Endpoints

### Conversations
```
GET    /api/conversations
POST   /api/conversations
GET    /api/conversations/{id}
PATCH  /api/conversations/{id}
DELETE /api/conversations/{id}
```

### Messages
```
GET    /api/conversations/{id}/messages
POST   /api/conversations/{id}/messages
GET    /api/conversations/{id}/messages/{msg_id}
PATCH  /api/conversations/{id}/messages/{msg_id}
DELETE /api/conversations/{id}/messages/{msg_id}
```

### Provider Configs
```
GET    /api/provider-configs
POST   /api/provider-configs
GET    /api/provider-configs/{id}
PATCH  /api/provider-configs/{id}
DELETE /api/provider-configs/{id}
```

---

## 🧪 Testing

### Health Check
```bash
curl http://localhost:8000/api/health
```

### Create Conversation
```bash
curl -X POST http://localhost:8000/api/conversations \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
```

### List Conversations
```bash
curl http://localhost:8000/api/conversations
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 8000 in use | `php artisan serve --port=8001` |
| Database error | Check MySQL is running |
| npm not found | Install Node.js |
| Class not found | `composer dump-autoload` |
| CORS error | Check backend is running |
| Migrations fail | `php artisan migrate:fresh` |

---

## 📝 Key Files Modified

| File | Change |
|------|--------|
| `.env` | Fixed DB_CONNECTION to mysql |
| `ConversationController.php` | Added error handling & logging |
| `MessageController.php` | Added error handling & logging |
| `Chat.jsx` | Added error state & notifications |

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| SETUP_AND_FIXES_GUIDE.md | Complete setup instructions |
| TESTING_AND_TROUBLESHOOTING.md | Testing & troubleshooting |
| CHANGES_SUMMARY.md | Technical changes |
| FINAL_REPORT.md | Executive summary |
| QUICK_REFERENCE.md | This file |

---

## ✅ Verification Checklist

- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] Can create conversation
- [ ] Can send message
- [ ] Can view messages
- [ ] Can delete conversation
- [ ] No errors in browser console
- [ ] No errors in backend logs

---

## 🔐 Security Notes

✅ Input validation enabled
✅ Authorization checks active
✅ Error messages generic
✅ API keys hidden
✅ Logging enabled
✅ CORS configured

---

## 📊 Database Tables

1. users
2. conversations
3. messages
4. provider_configs
5. personal_access_tokens
6. cache
7. jobs

---

## 🎯 Features

✅ Create conversations
✅ Send messages
✅ View message history
✅ Delete conversations
✅ Update conversation titles
✅ Provider configuration
✅ Error handling
✅ Logging

---

## 🚨 Emergency Commands

### Reset Everything
```bash
cd iaBot/backend
php artisan migrate:fresh
php artisan cache:clear
php artisan config:clear
```

### Kill Port 8000 (Windows)
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Kill Port 8000 (Mac/Linux)
```bash
lsof -i :8000
kill -9 <PID>
```

---

## 📞 Support

1. Check documentation files
2. View backend logs: `backend/storage/logs/laravel.log`
3. Check browser console: F12
4. Check network requests: F12 > Network

---

## 🎓 Learning Resources

- Laravel: https://laravel.com/docs
- React: https://react.dev
- Vite: https://vitejs.dev
- MySQL: https://dev.mysql.com/doc

---

## 📋 Checklist for First Run

- [ ] MySQL running
- [ ] Database created
- [ ] Migrations run
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server started
- [ ] Frontend server started
- [ ] Browser opened to localhost:5173
- [ ] Created first conversation
- [ ] Sent first message

---

**Last Updated:** 2025-10-24
**Status:** ✅ Ready for Use

