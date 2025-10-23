# Testing Guide - IA Chatbot

## Running the Application

### Terminal 1: Start Backend
```bash
cd backend
php artisan serve --host=0.0.0.0 --port=8000
```

Expected output:
```
Laravel development server started: http://127.0.0.1:8000
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
  VITE v7.0.7  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Manual Testing Checklist

### 1. Authentication Tests

#### Register New User
- [ ] Navigate to http://localhost:5173
- [ ] Click "Register here"
- [ ] Fill in form:
  - Name: "Test User"
  - Email: "test@example.com"
  - Password: "password123"
  - Confirm: "password123"
- [ ] Click "Register"
- [ ] Should redirect to chat page
- [ ] User should be logged in

#### Login
- [ ] Click "Logout"
- [ ] Should redirect to login page
- [ ] Enter email: "test@example.com"
- [ ] Enter password: "password123"
- [ ] Click "Login"
- [ ] Should redirect to chat page

#### Validation
- [ ] Try registering with existing email (should show error)
- [ ] Try password < 8 characters (should show error)
- [ ] Try mismatched passwords (should show error)
- [ ] Try login with wrong password (should show error)

### 2. Conversation Tests

#### Create Conversation
- [ ] Click "+ New Chat" button
- [ ] Should create new conversation
- [ ] Should appear in sidebar

#### Send Message
- [ ] Type message in input field
- [ ] Click "Send" or press Enter
- [ ] Message should appear in chat
- [ ] AI response should appear below
- [ ] Conversation title should update from first message

#### Multiple Conversations
- [ ] Create 3 different conversations
- [ ] All should appear in sidebar
- [ ] Click each to switch between them
- [ ] Messages should persist

#### Delete Conversation
- [ ] Hover over conversation in sidebar
- [ ] Click X button
- [ ] Confirm deletion
- [ ] Should be removed from sidebar

### 3. Settings Tests

#### Add Provider Configuration
- [ ] Click Settings (⚙️)
- [ ] Click "Add Provider"
- [ ] Select "OpenAI"
- [ ] Enter Model: "gpt-4"
- [ ] Enter API Key: "test-key-123"
- [ ] Click "Save Configuration"
- [ ] Should appear in list

#### Multiple Providers
- [ ] Add another provider (Azure)
- [ ] Both should appear in list
- [ ] Each should show provider name and model

#### Delete Provider
- [ ] Click "Delete" on a provider
- [ ] Should be removed from list

### 4. UI/UX Tests

#### Responsive Design
- [ ] Test on desktop (full width)
- [ ] Test on tablet (medium width)
- [ ] Test on mobile (small width)
- [ ] Sidebar should collapse on mobile
- [ ] Toggle button should work

#### Navigation
- [ ] Sidebar navigation works
- [ ] Settings link works
- [ ] Chat link works
- [ ] Logout works

#### Message Display
- [ ] User messages appear on right (blue)
- [ ] Assistant messages appear on left (gray)
- [ ] Timestamps display correctly
- [ ] Long messages wrap properly

### 5. API Tests

#### Health Check
```bash
curl http://localhost:8000/api/health
```
Expected: `{"status":"ok"}`

#### Register via API
```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"API User",
    "email":"api@example.com",
    "password":"password123"
  }'
```
Expected: User object and token

#### Login via API
```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"api@example.com",
    "password":"password123"
  }'
```
Expected: User object and token

#### Get Conversations (replace TOKEN)
```bash
curl -X GET http://localhost:8000/api/conversations \
  -H "Authorization: Bearer TOKEN"
```
Expected: Array of conversations

#### Create Conversation
```bash
curl -X POST http://localhost:8000/api/conversations \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Conversation"}'
```
Expected: New conversation object

### 6. Database Tests

#### Check Database
```bash
# In MySQL
USE iabot;
SELECT * FROM users;
SELECT * FROM conversations;
SELECT * FROM messages;
SELECT * FROM provider_configs;
```

#### Verify Relationships
- [ ] Each conversation has a user_id
- [ ] Each message has a conversation_id
- [ ] Each provider_config has a user_id
- [ ] Deleting user cascades to conversations

## Performance Tests

### Load Testing
- [ ] Create 10 conversations
- [ ] Add 50 messages to one conversation
- [ ] Check if UI remains responsive
- [ ] Check if loading times are acceptable

### Browser Console
- [ ] Open DevTools (F12)
- [ ] Check Console tab for errors
- [ ] Check Network tab for failed requests
- [ ] Check for memory leaks

## Error Handling Tests

### Network Errors
- [ ] Stop backend server
- [ ] Try to send message
- [ ] Should show error message
- [ ] Should not crash app

### Invalid Data
- [ ] Try to send empty message
- [ ] Should not send
- [ ] Should show validation error

### Session Expiry
- [ ] Clear localStorage
- [ ] Refresh page
- [ ] Should redirect to login

## Browser Compatibility

Test on:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Accessibility Tests

- [ ] Tab navigation works
- [ ] Form labels are associated
- [ ] Color contrast is sufficient
- [ ] Keyboard shortcuts work

## Final Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] No network errors
- [ ] Responsive on all devices
- [ ] Database is clean
- [ ] Both servers running
- [ ] Ready for deployment

## Troubleshooting

If tests fail:
1. Check server logs
2. Check browser console
3. Check network tab
4. Verify database connection
5. Clear browser cache
6. Restart servers

