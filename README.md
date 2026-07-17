
# 💬 ChatConnect — Real-Time Full-Stack Messaging Platform

ChatConnect is a modern full-stack messaging application built for secure, fast, and responsive one-to-one communication. It combines account authentication, real-time messaging, online presence tracking, user discovery, unread-message management, delivery and read receipts, profile management, image sharing, message deletion, and a polished responsive interface in one connected platform.

The project uses React and Vite for the frontend, Node.js and Express for the backend, MongoDB for persistent data storage, and Socket.IO for real-time communication. The frontend is configured for deployment on Vercel, while the backend is compatible with platforms such as Render.

---

## ✨ What the Project Does

Many basic chat applications rely on page refreshes, temporary frontend-only state, weak authentication, or incomplete socket handling. This can cause delayed messages, inaccurate unread counts, missing online indicators, and incorrect message status after refreshing the page.

ChatConnect provides a unified messaging experience where:

- Users can create an account and securely sign in.
- Authenticated users can discover other registered users.
- Users can start one-to-one conversations.
- Conversations and previous messages are loaded from MongoDB.
- Messages are delivered instantly through Socket.IO.
- Online users are tracked and displayed in real time.
- Multiple tabs and devices can remain connected to the same account.
- Unread-message counts are stored and restored correctly after refresh.
- Messages display sent, delivered, and read status.
- Read receipts update in real time using blue double ticks.
- Users can delete messages they sent for both participants.
- Users can share text and image messages.
- Users can update their profile image.
- Authentication remains available across page refreshes through secure cookies.

---

## ✅ Features Implemented

### 🔐 Authentication and Account Security

- User registration with full name, email, and password.
- Secure email and password login.
- Secure logout flow.
- Password hashing with `bcryptjs`.
- JSON Web Token authentication.
- Authentication token stored using HTTP-only cookies.
- Protected backend routes for authenticated users.
- Authentication-state verification when the application loads.
- Persistent login after browser refresh.
- Socket.IO authentication middleware for protected real-time connections.
- Duplicate-account handling.
- Invalid-credential handling.
- Normalized email storage.
- Credential-aware CORS configuration.
- API protection and rate-limiting support through Arcjet.

### 💬 Real-Time Messaging

- One-to-one messaging between registered users.
- Real-time message delivery through Socket.IO.
- MongoDB persistence for conversation history.
- Automatic retrieval of messages for the selected user.
- Optimistic message rendering while requests are processed.
- Real-time message updates without refreshing the page.
- Automatic Socket.IO reconnection.
- Conversation synchronization across multiple tabs and devices.
- Chat partner list based on previous conversations.
- Registered-contact discovery for starting new conversations.
- Sender and receiver message alignment.
- Automatic scrolling when new messages arrive.
- Manual scrolling without forced interruption.
- Fixed conversation header.
- Fixed message composer.
- Independently scrollable message area.

### 🟢 Online Presence

- Real-time online and offline indicators.
- Online-user tracking through socket connections.
- Multiple active socket connections supported per user.
- Multi-tab and multi-device presence support.
- Instant online-status updates after connection.
- Instant offline-status updates after the final socket disconnects.
- Online status displayed in Chats and Contacts views.

### ✓ Delivery and Read Receipts

- Single-tick sent-message status.
- Double-tick delivered-message status.
- Blue double-tick read status.
- Persistent `deliveredAt` timestamp.
- Persistent `readAt` timestamp.
- Real-time read-receipt updates.
- Sender interface updated immediately when messages are opened.
- Read state restored correctly after browser refresh.

### 🔔 Unread Message Management

- Unread-message counts for each conversation.
- Unread counts calculated from MongoDB.
- Unread badges displayed in the sidebar.
- Unread counts retained after browser refresh.
- Unread counts cleared when the relevant conversation is opened.
- Read state persisted in the database.
- Chat and contact lists updated immediately.
- Last-message previews displayed in the conversation list.

### 🗑️ Message Deletion

- Users can delete messages they sent.
- Delete-for-everyone behavior.
- Server-side ownership verification.
- Deleted messages removed from MongoDB.
- Real-time deletion events sent to both participants.
- Immediate removal from both conversation interfaces.
- Optimistic deletion with error recovery.

### 👤 User Profile Management

- Authenticated user profile display.
- Profile-image upload and update support.
- Cloudinary integration for hosted profile images.
- Updated profile information returned to the frontend immediately.
- Profile data stored with the user account in MongoDB.

### 🖼️ Media Support

- Image-message upload support.
- Cloudinary-hosted media.
- Text and image validation.
- Image previews inside conversations.
- Increased backend request-body limits for encoded image uploads.

### 🔎 Contacts and Conversations

- Separate Chats and Contacts views.
- Previous chat-partner list.
- Registered-contact discovery.
- Conversation search.
- Contact search.
- Last-message previews.
- Unread-count aggregation.
- Selected-conversation highlighting.
- Conversation separators.
- Empty-chat and empty-contact states.

### 🎨 Responsive Frontend Interface

- React-based single-page application.
- Responsive layouts for desktop and mobile screens.
- Animated blue-gradient authentication pages.
- Matching blue-gradient messaging interface.
- Glass-style panels.
- Sidebar-based contact and conversation navigation.
- Fixed profile header.
- Fixed Chats and Contacts switch.
- Fixed search field.
- Responsive authentication cards.
- Height-aware authentication layouts.
- Loading and authentication states.
- Skeleton loading components.
- Toast notifications for success and error feedback.
- Reusable UI components.
- Lucide React icons.
- Tailwind CSS and DaisyUI support.
- Custom responsive CSS.
- Global client-side state management with Zustand.
- Consistent Montserrat-based typography.

### ⚡ Backend API

- Express.js REST API.
- MongoDB integration through Mongoose.
- Cookie parsing.
- Credential-aware CORS configuration.
- JSON and URL-encoded request handling.
- Increased request-body limits for image uploads.
- Authentication routes under `/api/auth`.
- Messaging routes under `/api/messages`.
- Message-read endpoint.
- Message-deletion endpoint.
- Root service-status route.
- Lightweight `/ping` route for uptime monitoring.
- Socket.IO server integrated with the HTTP server.

---

## 🚧 Work in Progress

- Adding typing indicators.
- Adding message editing.
- Supporting documents, audio files, and voice notes.
- Adding message replies and reactions.
- Adding group conversations.
- Adding push notifications.
- Adding user blocking and reporting.
- Adding message pagination for long conversations.
- Expanding automated backend and frontend tests.
- Adding CI/CD workflows.
- Improving production monitoring and logging.
- Improving accessibility.
- Researching end-to-end encryption.

---

## 🛠️ Technology Stack

### Frontend

- React 19
- Vite
- JavaScript
- React Router
- Axios
- Zustand
- Socket.IO Client
- React Hot Toast
- Lucide React
- Tailwind CSS
- DaisyUI
- CSS animations
- Responsive media queries
- ESLint

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JSON Web Tokens
- bcryptjs
- Cookie Parser
- CORS
- dotenv
- Cloudinary
- Arcjet
- Resend
- Nodemon

### Deployment

- Vercel — frontend
- Render-compatible Node.js backend
- MongoDB Atlas — database
- Cloudinary — profile and image storage

---

## 🌍 Live Deployment

- **Frontend:** https://chatconnect-theta.vercel.app
- **Backend health route:** `/`
- **Backend uptime route:** `/ping`
- **GitHub repository:** https://github.com/sushantt1201/Chatconnect

> Free-tier backend services may take additional time to wake after a period of inactivity. The `/ping` endpoint can be used with an uptime-monitoring service.

---

## 🔄 System Flow

1. A visitor opens the ChatConnect frontend.
2. The frontend checks whether a valid authenticated session already exists.
3. A new user creates an account, or an existing user signs in.
4. The backend validates the credentials.
5. The backend creates a JWT-based HTTP-only session cookie.
6. The frontend stores the authenticated user in Zustand.
7. The frontend establishes an authenticated Socket.IO connection.
8. The backend associates the user with one or more active socket IDs.
9. The server broadcasts the current list of online users.
10. The user opens the Chats or Contacts section.
11. Contacts and previous chat partners are loaded through the REST API.
12. The user selects an existing conversation or another registered contact.
13. Previous messages are loaded from MongoDB.
14. Unread-message state is calculated from MongoDB.
15. Opening a conversation marks unread messages as read.
16. The backend stores the read timestamp.
17. The backend emits a `messagesRead` event to the sender.
18. The sender's message ticks update immediately.
19. A newly sent message is stored in MongoDB.
20. The backend checks whether the receiver is online.
21. When the receiver is connected, the backend emits the message to every active receiver socket.
22. The receiver's frontend updates without requiring a refresh.
23. Deleting a message removes it from MongoDB.
24. A `messageDeleted` event removes the message from both interfaces.
25. Refreshing the application restores authentication, messages, unread counts, and message status.

---

## 📡 API Overview

### Authentication Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Public | Create a new user account |
| `POST` | `/api/auth/login` | Public | Sign in to an existing account |
| `POST` | `/api/auth/logout` | Public | Clear the active session |
| `GET` | `/api/auth/check` | Protected | Verify the authenticated user |
| `PUT` | `/api/auth/update-profile` | Protected | Update the user's profile image |

### Messaging Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/messages/contacts` | Protected | Get registered contacts with unread counts |
| `GET` | `/api/messages/chats` | Protected | Get previous chat partners and message previews |
| `GET` | `/api/messages/:id` | Protected | Get messages exchanged with another user |
| `POST` | `/api/messages/send/:id` | Protected | Send a text or image message |
| `PATCH` | `/api/messages/read/:id` | Protected | Mark messages from a user as read |
| `DELETE` | `/api/messages/:id` | Protected | Delete a message sent by the current user |

### Service Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Confirm that the backend is live |
| `GET` | `/ping` | Lightweight uptime-monitoring endpoint |

---

## 🔌 Socket.IO Events

| Event | Direction | Description |
|---|---|---|
| `getOnlineUsers` | Server → Client | Broadcast the currently connected user IDs |
| `newMessage` | Server → Receiver | Deliver a newly created message |
| `messagesRead` | Server → Sender | Update message delivery and read state |
| `messageDeleted` | Server → Participants | Remove a deleted message in real time |

The backend stores multiple socket IDs for the same user, allowing presence and message synchronization to work across multiple browser tabs or devices.

---

## 📂 Project Structure

```text
Chatconnect/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── emails/
│   │   ├── lib/
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── socket.js
│   │   │   └── utils.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   ├── socket.auth.middleware.js
│   │   │   └── arcjet.middleware.js
│   │   ├── models/
│   │   │   ├── Message.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   │   └── axios.js
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   └── useChatStore.js
│   │   ├── styles/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md

## 🚀 Local Installation

### 1. Clone the Repository

```bash
git clone https://github.com/sushantt1201/Chatconnect.git
cd Chatconnect
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

Open another terminal from the project root:

```bash
cd frontend
npm install
```

### 4. Configure Backend Environment Variables

Create a `.env` file inside the `backend` directory.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
RESEND_API_KEY=your_resend_api_key
```

The exact Cloudinary, Arcjet, and Resend variables should match the names used by their corresponding configuration files in the backend.

### 5. Configure Frontend Environment Variables

Create a `.env` file inside the `frontend` directory.

```env
VITE_API_URL=http://localhost:4000
```

The frontend Axios client uses `VITE_API_URL` and sends requests with credentials enabled.

### 6. Start the Backend

```bash
cd backend
npm run dev
```

The backend runs on:

```text
http://localhost:4000
```

### 7. Start the Frontend

Open a second terminal:

```bash
cd frontend
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## 🧪 Available Commands

### Frontend Development Server

```bash
cd frontend
npm run dev
```

### Frontend Production Build

```bash
cd frontend
npm run build
```

### Frontend Lint Check

```bash
cd frontend
npm run lint
```

### Frontend Production Preview

```bash
cd frontend
npm run preview
```

### Backend Development Server

```bash
cd backend
npm run dev
```

### Backend Production Server

```bash
cd backend
npm start
```

## 🔒 Security Notes

- Never commit `.env` files, database credentials, API keys, or JWT secrets.
- Use a long, randomly generated `JWT_SECRET` in production.
- Restrict CORS origins to trusted frontend domains.
- Use HTTPS in production so cookies and socket connections are encrypted.
- Configure production cookies with secure and appropriate SameSite settings.
- Protect Cloudinary, Arcjet, Resend, and MongoDB credentials.
- Keep dependencies updated and review security alerts regularly.

## 🔮 Future Scope

- Group chats and channels.
- Message reactions and replies.
- Typing and recording indicators.
- Read receipts and delivery status.
- Voice notes and video calling.
- File, image, and document sharing.
- Message editing and deletion.
- Push and email notifications.
- Advanced user and conversation search.
- User blocking and reporting.
- Custom themes and accessibility improvements.
- End-to-end encryption research and implementation.
- Automated testing and CI/CD workflows.
- Improved analytics, logging, and uptime monitoring.

## 🎓 Learning Outcomes

This project demonstrates:

- Component-based frontend development with React.
- Client-side routing with React Router.
- Global state management using Zustand.
- REST API development with Node.js and Express.
- MongoDB data modelling through Mongoose.
- Secure password hashing and JWT-cookie authentication.
- Protected HTTP and Socket.IO communication.
- Real-time online-presence and message-delivery logic.
- Profile-image uploads through Cloudinary.
- Cross-origin frontend and backend deployment.
- Full-stack debugging across local and production environments.

## 👨‍💻 Author

**Sushant Kumar Singh**

- GitHub: https://github.com/sushantt1201
- Repository: https://github.com/sushantt1201/Chatconnect


---

⭐ If you find ChatConnect useful, consider starring the repository.
