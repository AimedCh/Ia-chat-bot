# Setup Instructions - IA Chatbot

## Prerequisites Check

Before starting, ensure you have:
- [ ] PHP 8.2 or higher
- [ ] MySQL 5.7 or higher
- [ ] Node.js 16 or higher
- [ ] Composer installed
- [ ] npm or yarn installed

## Step-by-Step Setup

### Step 1: Database Setup

1. Open MySQL (via XAMPP Control Panel or command line)
2. Create the database:
   ```sql
   CREATE DATABASE iabot;
   ```
3. Verify it was created:
   ```sql
   SHOW DATABASES;
   ```

### Step 2: Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy environment file:
   ```bash
   copy .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Verify `.env` file has correct database settings:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=iabot
   DB_USERNAME=root
   DB_PASSWORD=
   ```

6. Run database migrations:
   ```bash
   php artisan migrate
   ```

   Expected output:
   ```
   Migration table created successfully.
   Migrating: 0001_01_01_000000_create_users_table
   Migrated:  0001_01_01_000000_create_users_table (XXXms)
   ...
   ```

7. Start the backend server:
   ```bash
   php artisan serve --host=0.0.0.0 --port=8000
   ```

   Expected output:
   ```
   Laravel development server started: http://127.0.0.1:8000
   ```

### Step 3: Frontend Setup

1. Open a new terminal/command prompt

2. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

3. Install Node dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   Expected output:
   ```
   VITE v7.0.7  ready in XXX ms

   ➜  Local:   http://localhost:5173/
   ➜  press h to show help
   ```

### Step 4: Access the Application

1. Open your web browser
2. Navigate to: **http://localhost:5173**
3. You should see the login page

## First Time Usage

### Create Your First Account

1. Click "Register here" link
2. Fill in the registration form:
   - **Full Name**: Your name
   - **Email**: Your email address
   - **Password**: At least 8 characters
   - **Confirm Password**: Same as password
3. Click "Register"
4. You'll be automatically logged in and redirected to the chat page

### Start Chatting

1. Click "+ New Chat" button
2. Type your message in the input field
3. Press Enter or click "Send"
4. Your message will appear on the right (blue)
5. AI response will appear on the left (gray)

### Configure AI Providers

1. Click the Settings (⚙️) button in the sidebar
2. Click "Add Provider"
3. Select a provider:
   - OpenAI
   - Azure OpenAI
   - Anthropic
   - Ollama
4. Enter the model name (e.g., gpt-4, claude-3)
5. Enter your API key
6. Click "Save Configuration"

## Troubleshooting

### Issue: "Connection refused" when accessing frontend

**Solution:**
- Ensure backend server is running on port 8000
- Ensure frontend server is running on port 5173
- Check that both terminals show "running" status

### Issue: "SQLSTATE[HY000]: General error: 1030 Got error"

**Solution:**
- Ensure MySQL is running
- Check database name is "iabot"
- Run: `php artisan migrate:fresh`

### Issue: "Port 8000 already in use"

**Solution:**
- Use different port: `php artisan serve --port=8001`
- Update frontend API URL in `src/api/client.js`

### Issue: "Port 5173 already in use"

**Solution:**
- Edit `frontend/vite.config.js`
- Change port in server config:
  ```js
  server: {
    port: 5174,
    ...
  }
  ```

### Issue: "npm: command not found"

**Solution:**
- Install Node.js from https://nodejs.org/
- Restart terminal after installation

### Issue: "composer: command not found"

**Solution:**
- Install Composer from https://getcomposer.org/
- Restart terminal after installation

### Issue: "CORS error" in browser console

**Solution:**
- Check `backend/config/cors.php`
- Ensure `FRONTEND_URL=http://localhost:5173` in `.env`
- Restart backend server

## Verification Checklist

After setup, verify everything works:

- [ ] Backend server running on http://localhost:8000
- [ ] Frontend server running on http://localhost:5173
- [ ] Can access login page
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Can create new conversation
- [ ] Can send message
- [ ] Can see AI response
- [ ] Can access settings
- [ ] Can add provider configuration
- [ ] Can logout

## File Locations

Important files to know:

**Backend Configuration:**
- `backend/.env` - Environment variables
- `backend/config/cors.php` - CORS settings
- `backend/routes/api.php` - API routes

**Frontend Configuration:**
- `frontend/vite.config.js` - Vite configuration
- `frontend/src/api/client.js` - API client setup
- `frontend/src/api/services.js` - API service functions

**Database:**
- `backend/database/migrations/` - Database migrations
- `backend/app/Models/` - Database models

## Common Commands

### Backend Commands
```bash
cd backend

# Run migrations
php artisan migrate

# Reset database
php artisan migrate:fresh

# Start server
php artisan serve

# Run tests
php artisan test

# Clear cache
php artisan cache:clear
```

### Frontend Commands
```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Next Steps

1. Read `README.md` for full documentation
2. Read `QUICKSTART.md` for quick reference
3. Read `TESTING.md` for testing guide
4. Integrate with real AI providers
5. Deploy to production

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the documentation files
3. Check browser console (F12) for errors
4. Check server terminal for error messages
5. Verify all prerequisites are installed

## Success!

If you can see the login page at http://localhost:5173, your setup is complete! 🎉

Now you can:
- Register a new account
- Create conversations
- Send messages
- Configure AI providers
- Manage your chats

Enjoy your IA Chatbot! 🤖

