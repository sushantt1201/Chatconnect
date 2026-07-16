# 💬 ChatConnect — Real-Time Full-Stack Messaging Platform

ChatConnect is a modern full-stack messaging application built for secure, fast, and responsive one-to-one communication. It combines account authentication, real-time messaging, online presence tracking, user discovery, profile management, and a polished responsive interface in one connected platform.

The project uses React and Vite for the frontend, Node.js and Express for the backend, MongoDB for data storage, and Socket.IO for real-time communication. The frontend is configured for deployment on Vercel, while the backend can be deployed on platforms such as Render.

## ✨ What the Project Does..

Many basic chat applications rely on page refreshes, weak authentication, or disconnected frontend and backend logic. This creates delays in message delivery, makes it difficult to identify online users, and can expose protected application data.

ChatConnect provides a unified messaging experience where:

- Users can create an account and securely sign in.
- Authenticated users can discover other registered users.
- Conversations and previous messages can be loaded from MongoDB.
- Messages are delivered instantly through Socket.IO.
- Online users are tracked and displayed in real time.
- Users can update their profile image.
- Authentication remains available across page refreshes through secure cookies.

## ✅ Features Implemented

### 🔐 Authentication and Account Security

- User registration with full name, email, and password.
- Secure login and logout flows.
- Password hashing with `bcryptjs`.
- JSON Web Token authentication.
- Authentication token stored using HTTP cookies.
- Protected backend routes for authenticated users.
- Authentication-state verification when the application loads.
- Socket.IO authentication middleware for protected real-time connections.
- Duplicate-account and invalid-credential handling.
- API protection and rate-limiting support through Arcjet.

### 💬 Real-Time Messaging

- One-to-one messaging between registered users.
- Real-time message delivery through Socket.IO.
- MongoDB persistence for conversation history.
- Automatic retrieval of messages for the selected user.
- Chat partner list based on previous conversations.
- Registered-contact discovery for starting new conversations.
- Online-user tracking through socket connections.
- Instant online-status updates after connection and disconnection.
- Sender and receiver message alignment in the chat interface.

### 👤 User Profile Management

- Authenticated user profile display.
- Profile-image upload and update support.
- Cloudinary integration for hosted profile images.
- Updated profile information returned to the frontend immediately.
- Profile data stored with the user account in MongoDB.

### 🎨 Responsive Frontend Interface

- React-based single-page application.
- Responsive layouts for desktop and mobile screens.
- Dedicated sign-up, login, chat, profile, and settings experiences.
- Sidebar-based contact and conversation navigation.
- Loading and authentication states.
- Toast notifications for success and error feedback.
- Reusable UI components.
- Lucide React icons.
- Tailwind CSS and DaisyUI styling support.
- Global client-side state management with Zustand.

### ⚡ Backend API

- Express.js REST API.
- MongoDB integration through Mongoose.
- Cookie parsing and credential-aware CORS configuration.
- JSON and URL-encoded request handling with increased payload limits.
- Authentication routes under `/api/auth`.
- Messaging routes under `/api/messages`.
- Root service-status route.
- Lightweight `/ping` route for uptime monitoring and reducing free-tier cold starts.

## 🚧 Work in Progress

- Improving validation and standardized backend error responses.
- Adding message read and delivery status.
- Adding typing indicators.
- Supporting image, document, and audio messages.
- Adding message deletion and editing.
- Improving conversation search.
- Adding group conversations.
- Adding notifications for new messages.
- Expanding automated backend and frontend tests.
- Improving production monitoring, logging, and security configuration.

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
- Cloudinary — profile-image storage

## 🌍 Live Deployment

- **Frontend:** https://chatconnect-theta.vercel.app
- **Backend health route:** `/`
- **Backend uptime route:** `/ping`
- **GitHub repository:** https://github.com/sushantt1201/Chatconnect

> Free-tier backend services may take additional time to wake after a period of inactivity. The `/ping` endpoint can be used with an uptime-monitoring service.

## 🔄 System Flow

1. A visitor opens the ChatConnect frontend.
2. The frontend checks whether a valid authenticated session already exists.
3. A new user creates an account, or an existing user signs in.
4. The backend validates the credentials and creates a JWT-based session cookie.
5. After authentication, the frontend establishes an authenticated Socket.IO connection.
6. The backend associates the connected user ID with the active socket ID.
7. The server broadcasts the current list of online users.
8. The user selects an existing chat partner or another registered contact.
9. Previous messages are loaded from MongoDB through the REST API.
10. A newly sent message is stored in MongoDB.
11. When the receiver is online, the backend emits the message to the receiver's active socket.
12. The frontend updates the conversation immediately without requiring a page refresh.

## 📡 API Overview

### Authentication Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Public | Create a new user account |
| `POST` | `/api/auth/login` | Public | Sign in to an existing account |
| `POST` | `/api/auth/logout` | Public | Clear the active session |
| `GET` | `/api/auth/check` | Protected | Verify the current authenticated user |
| `PUT` | `/api/auth/update-profile` | Protected | Update the user's profile image |

### Messaging Routes

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/messages/contacts` | Protected | Get registered contacts |
| `GET` | `/api/messages/chats` | Protected | Get previous chat partners |
| `GET` | `/api/messages/:id` | Protected | Get messages exchanged with a user |
| `POST` | `/api/messages/send/:id` | Protected | Send a message to a user |

### Service Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Confirm that the backend is live |
| `GET` | `/ping` | Lightweight uptime-monitoring endpoint |

## 📂 Project Structure

```text
Chatconnect/
├── backend/
│   ├── src/
│   │   ├── controllers/       # Authentication and messaging logic
│   │   ├── lib/               # Database, Socket.IO and external-service setup
│   │   ├── middleware/        # HTTP, socket authentication and API protection
│   │   ├── models/            # MongoDB user and message models
│   │   ├── routes/            # Authentication and messaging routes
│   │   └── server.js          # Express and Socket.IO server entry point
│   └── package.json
├── frontend/
│   ├── public/                # Static frontend assets
│   ├── src/
│   │   ├── components/        # Reusable interface components
│   │   ├── lib/               # Axios and shared frontend configuration
│   │   ├── pages/             # Authentication, chat, profile and settings pages
│   │   ├── store/             # Zustand authentication and chat state
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

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

## 📄 License

This repository currently uses the ISC license declaration in the backend package configuration. Add a root `LICENSE` file before distributing or reusing the project under formal license terms.

---

⭐ If you find ChatConnect useful, consider starring the repository.
