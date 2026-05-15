# 🎵 Music Player Backend API

A scalable and production-style backend API for a Music Streaming Application built using **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **Cloudinary**.

This backend supports:
- Authentication & Authorization
- Song Uploading
- Playlist Management
- Search System
- History Tracking
- Trending Songs
- Cloudinary Media Storage
- JWT Security
- MongoDB Aggregation Pipelines
- RESTful APIs

---

# 🚀 Features

## 🔐 Authentication System
- User Registration
- User Login
- User Logout
- JWT Token Authentication
- Cookie-based Authentication
- Role-based Authorization

---

## 🎵 Song Management
- Upload Songs
- Upload Thumbnails
- Get All Songs
- Get Song By ID
- Search Songs
- Get Songs By Artist
- Trending Songs API

---

## 📂 Playlist System
- Create Playlist
- Add Song To Playlist
- Remove Song From Playlist
- Get Playlist By ID
- MongoDB Relationship Population

---

## 📜 History System
- Track Played Songs
- Get User Listening History
- Recently Played Songs

---

## 📈 Trending System
Trending songs are generated using:
- MongoDB Aggregation Pipeline
- Song Play History
- Grouping & Sorting by Play Count

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Multer | File Upload |
| Cloudinary | Media Storage |
| Cookie Parser | Cookie Handling |

---

# 📁 Project Structure

```bash
music_player/

├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── model/
│   ├── routes/
│   ├── utils/
│   └── app.js
│
├── tests/
│
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone <your_repository_url>
```

---

## 2. Move Into Project

```bash
cd music_player
```

---

## 3. Install Dependencies

```bash
npm install
```

---

# 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

MONGO_URL=your_mongodb_url

SECRET_KEY=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶️ Run Application

## Development Mode

```bash
npm run dev
```

---

## Production Mode

```bash
npm start
```

---

# 🌐 API Endpoints

# 🔐 Authentication APIs

## Register User

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Vishnu",
  "username": "vishnu123",
  "email": "vishnu@gmail.com",
  "password": "123456"
}
```

---

## Login User

```http
POST /api/auth/login
```

---

## Logout User

```http
POST /api/auth/logout
```

---

# 🎵 Song APIs

## Upload Song

```http
POST /api/song
```

### Form Data

| Key | Type |
|---|---|
| title | text |
| artist | text |
| genre | text |
| audio | file |
| thumbnail | file |

---

## Get All Songs

```http
GET /api/song
```

---

## Get Song By ID

```http
GET /api/song/:id
```

---

## Search Songs

```http
GET /api/song/search?q=bhojpuri
```

---

## Get Songs By Artist

```http
GET /api/song/artist/:artist
```

---

## Trending Songs

```http
GET /api/song/trending
```

---

# 📂 Playlist APIs

## Create Playlist

```http
POST /api/playlist/create
```

---

## Add Song To Playlist

```http
POST /api/playlist/:playlistId/song/:songId
```

---

## Remove Song From Playlist

```http
DELETE /api/playlist/:playlistId/song/:songId
```

---

## Get Playlist By ID

```http
GET /api/playlist/:id
```

---

# 📜 History APIs

## Play Song

```http
POST /api/song/:songId/play
```

---

## Get User History

```http
GET /api/history
```

---

# ☁️ Cloudinary Integration

Media uploads are handled using:
- Multer
- Cloudinary

Supports:
- Audio Uploads
- Thumbnail Uploads

---

# 🔒 Authentication & Security

Protected routes use:
- JWT Authentication
- HTTP-only Cookies
- Middleware-based Route Protection

---

# 📈 Trending Song Logic

Trending songs are calculated using:
- MongoDB Aggregation Pipeline
- History Collection
- Song Play Frequency
- Grouping & Sorting

---

# 🧠 MongoDB Concepts Used

- Relationships
- populate()
- Aggregation Pipeline
- $group
- $lookup
- $sort
- $limit
- $addToSet
- $pull

---

# 🧪 Testing

Recommended tools:
- Postman
- Jest
- Supertest

---

# 🚀 Deployment

Recommended deployment stack:

| Service | Purpose |
|---|---|
| Render | Backend Hosting |
| MongoDB Atlas | Database |
| Cloudinary | Media Storage |
| GitHub | Version Control |

---

# 📌 Future Improvements

- Like System
- Recommendation Engine
- Pagination
- Redis Caching
- Real-time Streaming
- WebSocket Integration
- Swagger Documentation
- Docker Deployment
- CI/CD Pipelines

---

# 📄 License

This project is open-source and available for learning purposes.

---

# 👨‍💻 Author

Developed by Vishnu 🚀
