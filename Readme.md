# MERN Notes Application

A full-stack CRUD notes application built with MongoDB, Express.js, React, and Node.js.

## Features

- **Full CRUD Operations**: Create, Read, Update, Delete notes
- **Rate Limiting**: Upstash Redis-based rate limiting with custom error page
- **Real-time Notifications**: Toast notifications for user feedback
- **Smooth Animations**: Framer Motion animations throughout the app

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mern-notes-app.git
cd mern-notes-app
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory with the following:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/notes-app
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd frontend/Notes

# Install dependencies
npm install
```

### 5. Start the Application

#### Option A: Run Both Services Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run backend
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend/Notes
npm run dev
# App will run on http://localhost:5173
```

## Project Structure

```
Learn MERN/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── upstash.js
│   ├── middleware/
│   │   └── RateLimiter.js
│   ├── routes/
│   │   └── NoteRoutes.js
│   ├── models/
│   │   └── Note.js
│   ├── server.js
│   └── .env
├── frontend/
│   └── Notes/
│       ├── src/
│       │   ├── components/
│       │   │   ├── Navbar.jsx
│       │   │   ├── Notes.jsx
│       │   │   └── RateLimited.jsx
│       │   ├── pages/
│       │   │   ├── home.jsx
│       │   │   ├── create.jsx
│       │   │   └── view.jsx
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── package.json
│       └── vite.config.js
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/Notes` | Get all notes |
| GET | `/Notes/:id` | Get specific note |
| POST | `/Notes` | Create new note |
| PUT | `/Notes/:id` | Update specific note |
| DELETE | `/Notes/:id` | Delete specific note |

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Upstash Redis** - Rate limiting
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **React Router** - Navigation
- **Framer Motion** - Animations
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **React Hot Toast** - Notifications
- **Axios** - HTTP client

## Usage

1. **Home Page**: View all your notes in a responsive grid
2. **Create Note**: Click "New Note" to add investigation details
3. **View/Edit Note**: Click on any note card to view/edit
4. **Delete Note**: Use delete button with confirmation dialog
5. **Rate Limiting**: Automatic protection against too many requests

**1. MongoDB Connection Error:**
- Ensure MongoDB is running locally or check Atlas connection string
- Verify database URL in `.env` file

**2. Rate Limiting Not Working:**
- Check Upstash Redis credentials in `.env`
- Ensure Redis instance is active

**3. Frontend Not Loading:**
- Ensure backend is running on port 5000
- Check for CORS issues in browser console

**4. Dependencies Issues:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again