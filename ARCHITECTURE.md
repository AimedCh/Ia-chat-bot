# IA Chatbot - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Browser                              │
│                   (http://localhost:5173)                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    HTTP/HTTPS (Axios)
                             │
        ┌────────────────────┴────────────────────┐
        │                                         │
┌───────▼──────────────────┐        ┌────────────▼──────────────┐
│   React Frontend (Vite)  │        │  Laravel Backend API      │
│   (Port 5173)            │        │  (Port 8000)              │
│                          │        │                           │
│ ┌──────────────────────┐ │        │ ┌─────────────────────┐  │
│ │ Pages                │ │        │ │ Controllers         │  │
│ │ - Login              │ │        │ │ - AuthController    │  │
│ │ - Register           │ │        │ │ - ConversationCtrl  │  │
│ │ - Chat               │ │        │ │ - MessageCtrl       │  │
│ │ - Settings           │ │        │ │ - ProviderCtrl      │  │
│ └──────────────────────┘ │        │ └─────────────────────┘  │
│                          │        │                           │
│ ┌──────────────────────┐ │        │ ┌─────────────────────┐  │
│ │ Components           │ │        │ │ Models              │  │
│ │ - Sidebar            │ │        │ │ - User              │  │
│ │ - ChatWindow         │ │        │ │ - Conversation      │  │
│ │ - MessageList        │ │        │ │ - Message           │  │
│ │ - MessageInput       │ │        │ │ - ProviderConfig    │  │
│ │ - Navbar             │ │        │ └─────────────────────┘  │
│ └──────────────────────┘ │        │                           │
│                          │        │ ┌─────────────────────┐  │
│ ┌──────────────────────┐ │        │ │ Routes              │  │
│ │ API Services         │ │        │ │ - /api/auth/*       │  │
│ │ - authService        │ │        │ │ - /api/conversations│  │
│ │ - conversationSvc    │ │        │ │ - /api/messages     │  │
│ │ - messageSvc         │ │        │ │ - /api/provider-cfg │  │
│ │ - providerConfigSvc  │ │        │ └─────────────────────┘  │
│ └──────────────────────┘ │        │                           │
│                          │        │ ┌─────────────────────┐  │
│ ┌──────────────────────┐ │        │ │ Middleware          │  │
│ │ Axios Client         │ │        │ │ - auth:sanctum      │  │
│ │ - Interceptors       │ │        │ │ - cors              │  │
│ │ - Token Management   │ │        │ └─────────────────────┘  │
│ └──────────────────────┘ │        │                           │
│                          │        │ ┌─────────────────────┐  │
│ ┌──────────────────────┐ │        │ │ Database            │  │
│ │ State Management     │ │        │ │ - Migrations        │  │
│ │ - useState hooks     │ │        │ │ - Seeders           │  │
│ │ - localStorage       │ │        │ └─────────────────────┘  │
│ └──────────────────────┘ │        │                           │
└──────────────────────────┘        └───────────────┬───────────┘
                                                    │
                                    ┌───────────────▼────────────┐
                                    │   MySQL Database           │
                                    │   (iabot)                  │
                                    │                            │
                                    │ ┌──────────────────────┐  │
                                    │ │ Tables               │  │
                                    │ │ - users              │  │
                                    │ │ - conversations      │  │
                                    │ │ - messages           │  │
                                    │ │ - provider_configs   │  │
                                    │ │ - personal_access... │  │
                                    │ │ - cache              │  │
                                    │ │ - jobs               │  │
                                    │ └──────────────────────┘  │
                                    └────────────────────────────┘
```

## Data Flow

### Authentication Flow
```
User Input (Email/Password)
    ↓
React Component (Login/Register)
    ↓
Axios HTTP Request
    ↓
Laravel AuthController
    ↓
User Model (Database)
    ↓
Generate Token (Sanctum)
    ↓
Return User + Token
    ↓
Store in localStorage
    ↓
Redirect to Chat
```

### Message Flow
```
User Types Message
    ↓
MessageInput Component
    ↓
Send Button Click
    ↓
messageService.create()
    ↓
Axios POST Request (with token)
    ↓
MessageController.store()
    ↓
Message Model (Database)
    ↓
Return Message Object
    ↓
Update MessageList Component
    ↓
Display Message
    ↓
Generate AI Response (simulated)
    ↓
Create Assistant Message
    ↓
Display Response
```

## Database Schema

```
users
├── id (PK)
├── name
├── email (UNIQUE)
├── password
├── created_at
└── updated_at

conversations
├── id (PK)
├── user_id (FK → users)
├── title
├── metadata (JSON)
├── created_at
└── updated_at

messages
├── id (PK)
├── conversation_id (FK → conversations)
├── role (enum: user, assistant, system, tool)
├── content (longText)
├── usage (JSON)
├── status
├── created_at
└── updated_at

provider_configs
├── id (PK)
├── user_id (FK → users)
├── provider (string)
├── model (string)
├── api_key (text)
├── settings (JSON)
├── created_at
└── updated_at

personal_access_tokens
├── id (PK)
├── tokenable_type
├── tokenable_id
├── name
├── token (UNIQUE)
├── abilities
├── last_used_at
├── created_at
└── updated_at
```

## Component Hierarchy

```
App
├── Router
│   ├── Login
│   ├── Register
│   ├── PrivateRoute
│   │   ├── Chat
│   │   │   ├── Sidebar
│   │   │   │   ├── Conversation List
│   │   │   │   ├── New Chat Button
│   │   │   │   ├── Settings Link
│   │   │   │   └── Logout Button
│   │   │   └── ChatWindow
│   │   │       ├── Header
│   │   │       ├── MessageList
│   │   │       │   └── Message (repeated)
│   │   │       └── MessageInput
│   │   └── Settings
│   │       ├── Navbar
│   │       ├── Provider Form
│   │       └── Provider List
│   └── Navigate (redirect)
```

## API Request/Response Flow

### Example: Send Message

**Request:**
```
POST /api/conversations/1/messages
Authorization: Bearer {token}
Content-Type: application/json

{
  "role": "user",
  "content": "Hello, how are you?",
  "usage": null,
  "status": "completed"
}
```

**Response:**
```json
{
  "id": 1,
  "conversation_id": 1,
  "role": "user",
  "content": "Hello, how are you?",
  "usage": null,
  "status": "completed",
  "created_at": "2025-10-15T12:00:00Z",
  "updated_at": "2025-10-15T12:00:00Z"
}
```

## Authentication Flow

```
1. User registers/logs in
   ↓
2. Backend creates token (Sanctum)
   ↓
3. Token stored in localStorage
   ↓
4. Axios interceptor adds token to headers
   ↓
5. Each request includes: Authorization: Bearer {token}
   ↓
6. Backend validates token
   ↓
7. If valid: Process request
   If invalid: Return 401 Unauthorized
   ↓
8. Frontend redirects to login on 401
```

## Error Handling

```
User Action
    ↓
Try/Catch Block
    ↓
Error Occurs?
    ├─ Yes → Catch Error
    │        ├─ Check Status Code
    │        ├─ 401? → Logout & Redirect
    │        ├─ 4xx? → Show Error Message
    │        └─ 5xx? → Show Server Error
    │
    └─ No → Success
            ├─ Update State
            ├─ Update UI
            └─ Show Success (optional)
```

## Deployment Architecture (Optional)

```
┌─────────────────────────────────────────┐
│         Production Environment          │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐  │
│  │      Nginx/Apache (Reverse       │  │
│  │      Proxy)                      │  │
│  └──────────────────────────────────┘  │
│           ↓                             │
│  ┌──────────────────────────────────┐  │
│  │   Docker Container               │  │
│  │   ┌────────────────────────────┐ │  │
│  │   │ Laravel Backend (PHP-FPM)  │ │  │
│  │   └────────────────────────────┘ │  │
│  └──────────────────────────────────┘  │
│           ↓                             │
│  ┌──────────────────────────────────┐  │
│  │   MySQL Database                 │  │
│  │   (Persistent Volume)            │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │   CDN / Static Files             │  │
│  │   (React Build)                  │  │
│  └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

## Performance Considerations

1. **Frontend**
   - Lazy loading of components
   - Message pagination
   - Caching with localStorage
   - Optimized re-renders

2. **Backend**
   - Database indexing
   - Query optimization
   - API rate limiting
   - Token caching

3. **Database**
   - Proper indexing on foreign keys
   - Cascade delete for data integrity
   - Connection pooling

## Security Measures

1. **Authentication**
   - Token-based (Sanctum)
   - Secure password hashing (bcrypt)
   - CORS protection

2. **Authorization**
   - User-specific data isolation
   - Middleware protection
   - Policy-based access control

3. **Data Protection**
   - API key encryption
   - HTTPS in production
   - SQL injection prevention (Eloquent ORM)

## Scalability

1. **Horizontal Scaling**
   - Stateless API design
   - Load balancing ready
   - Database replication

2. **Vertical Scaling**
   - Caching layer (Redis)
   - Database optimization
   - Queue system (for AI processing)

3. **Future Enhancements**
   - Message streaming
   - WebSocket support
   - Real-time notifications
   - File storage (S3)

