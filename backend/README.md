# Event Portal Backend

A Node.js/Express backend API for the Event Portal application with MongoDB database.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Event Management**: CRUD operations for events with filtering and search
- **User Management**: User profiles and role-based access control
- **RESTful API**: Clean REST API design with proper error handling
- **MongoDB Integration**: Mongoose ODM for database operations

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-portal
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Events
- `GET /api/events` - Get all events (with filtering)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (protected)
- `PUT /api/events/:id` - Update event (protected)
- `DELETE /api/events/:id` - Delete event (protected)
- `GET /api/events/user/:userId` - Get events by user

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users/:id` - Get user by ID

## Database Models

### User Model
- name, email, password
- role (user/admin)
- profileImage, bio, interests
- isVerified, timestamps

### Event Model
- title, description, type, mode
- date, location, participants, prize
- image, organizer, website, deadline
- domain, createdBy, isActive
- tags, requirements, registrationLink

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Demo Credentials

After running the seed script, you can use these demo credentials:

- **Email:** demo@example.com
- **Password:** password123
- **Role:** admin

## Development

- **Hot Reload:** The server automatically restarts on file changes using nodemon
- **Error Handling:** Comprehensive error handling with proper HTTP status codes
- **Validation:** Input validation using Mongoose schemas
- **Security:** Password hashing, JWT tokens, and CORS configuration

## Production Deployment

1. Set `NODE_ENV=production` in your environment variables
2. Use a strong JWT secret
3. Set up proper MongoDB connection (Atlas recommended)
4. Configure CORS for your frontend domain
5. Set up proper logging and monitoring 