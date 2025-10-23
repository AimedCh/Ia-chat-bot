# Quick Start Guide - IA Chatbot

## Prerequisites
- PHP 8.2+
- Node.js 16+
- MySQL 5.7+
- Composer installed

## Step 1: Create MySQL Database

Open MySQL and run:
```sql
CREATE DATABASE iabot;
```

## Step 2: Backend Setup

```bash
cd backend

# Install dependencies
composer install

# Setup environment
copy .env.example .env

# Generate key
php artisan key:generate

# Run migrations
php artisan migrate

# Start server (Terminal 1)
php artisan serve --host=0.0.0.0 --port=8000
```

Backend will be at: **http://localhost:8000**

## Step 3: Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start dev server (Terminal 2)
npm run dev
```

Frontend will be at: **http://localhost:5173**

## Step 4: Access the Application

1. Open browser to: **http://localhost:5173**
2. Click "Register" to create an account
3. Fill in your details and register
4. Start chatting!

## Features to Try

### 1. Create Conversations
- Click "+ New Chat" in the sidebar
- Start typing your message
- Messages appear in real-time

### 2. Manage Conversations
- Click on any conversation to view it
- Delete conversations with the X button
- Conversations are automatically titled from first message

### 3. Configure AI Providers
- Go to Settings (⚙️ button)
- Click "Add Provider"
- Select provider (OpenAI, Azure, Anthropic, Ollama)
- Enter API key and model name
- Save configuration

### 4. User Management
- Click "Logout" to logout
- Create new account to test multi-user support

## API Testing

Test the API with curl or Postman:

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get conversations (replace TOKEN with actual token)
curl -X GET http://localhost:8000/api/conversations \
  -H "Authorization: Bearer TOKEN"
```

## Troubleshooting

### "Connection refused" error
- Make sure both servers are running
- Backend: `php artisan serve` in backend folder
- Frontend: `npm run dev` in frontend folder

### "Database connection error"
- Check MySQL is running
- Verify database name is "iabot"
- Check credentials in `backend/.env`

### "Port already in use"
- Backend: `php artisan serve --port=8001`
- Frontend: Edit `vite.config.js` and change port

### CORS errors
- Check `backend/config/cors.php`
- Ensure `FRONTEND_URL=http://localhost:5173` in `.env`

## Project Structure

```
iaBot/
├── backend/          # Laravel API
│   ├── app/
│   ├── database/
│   ├── routes/
│   └── .env
└── frontend/         # React App
    ├── src/
    ├── public/
    └── package.json
```

## Next Steps

1. **Integrate Real AI**: Connect to OpenAI, Azure, or other providers
2. **Add Message Streaming**: Real-time message streaming
3. **File Upload**: Support file uploads in conversations
4. **Search**: Add conversation search functionality
5. **Export**: Export conversations as PDF/JSON

## Support

Check README.md for detailed documentation.

