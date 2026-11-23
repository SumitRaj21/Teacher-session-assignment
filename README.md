# Teacher Session Assignment API

A RESTful backend for creating users and teachers, scheduling teacher sessions, booking sessions, and tracking completed sessions.

## Features

- Create users with contact details
- Create available teacher sessions
- Find available sessions for a specific day
- Book a session for a user
- Mark a booked session as completed
- List a user's upcoming and completed sessions
- Health-check endpoint
- Joi request validation and centralized error responses

## Tech Stack

- Node.js
- Express 5
- MongoDB with Mongoose
- Joi
- CORS
- dotenv
- Nodemon

## Project Structure

```text
src/
├── config/
│   └── db.config.js
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── utils/
├── validations/
├── app.js
└── server.js
```

- `server.js` loads environment variables, connects to MongoDB, and starts the HTTP server.
- `app.js` configures middleware and registers routes.
- Routes delegate validation and request handling to controllers.
- Controllers delegate business logic to services.
- Mongoose models store users, teachers, and sessions.

## Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB instance or MongoDB Atlas cluster

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/teacher_sessions
```

For MongoDB Atlas, use an authorized connection string in this format:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

Do not commit `.env` files or database credentials. If credentials have already been committed, revoke or rotate them.

## Running the API

Development mode with Nodemon:

```bash
npm start
```

The server uses `PORT` or defaults to port `3000`.

Check that the API is running:

```http
GET http://localhost:3000/health
```

Example response:

```json
{
  "success": true,
  "message": "API is running"
}
```

## API Endpoints

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/health` | Check API status |

### Users

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/users` | Create a user |
| `GET` | `/users/:id/sessions` | Get upcoming and completed sessions for a user |

Create a user:

```http
POST /users
Content-Type: application/json

{
  "fullName": "Test User",
  "email": "test.user@example.com",
  "phone": "9876543210"
}
```

Get a user's sessions:

```http
GET /users/<user-object-id>/sessions
```

### Sessions

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/sessions` | Create an available session |
| `GET` | `/sessions/available?dateTimestamp=<milliseconds>` | Get available sessions for a day |
| `POST` | `/sessions/:id/book` | Book a session |
| `PATCH` | `/sessions/:id/complete` | Mark a booked session as completed |

Create a session:

```http
POST /sessions
Content-Type: application/json

{
  "teacherId": "<teacher-object-id>",
  "startTime": "2026-12-01T10:00:00.000Z",
  "endTime": "2026-12-01T11:00:00.000Z"
}
```

Get sessions available on a date:

```http
GET /sessions/available?dateTimestamp=1764547200000
```

`dateTimestamp` is the date represented as milliseconds since the Unix epoch.

Book a session:

```http
POST /sessions/<session-object-id>/book
Content-Type: application/json

{
  "userId": "<user-object-id>"
}
```

Complete a session:

```http
PATCH /sessions/<session-object-id>/complete
```

## Session Status

Each session moves through these statuses:

| Status | Meaning |
| --- | --- |
| `AVAILABLE` | The session can be booked |
| `BOOKED` | A user has booked the session |
| `COMPLETED` | The booked session has been completed |

## Response Format

Successful responses generally use:

```json
{
  "success": true,
  "message": "Session created successfully",
  "data": {}
}
```

Available-session responses include a count:

```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

Errors use:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP statuses include `400` for invalid input, `404` for missing records, `409` for booking-state conflicts or duplicate unique values, and `500` for unexpected server errors.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Start the server with Nodemon |
| `npm test` | No test suite is configured yet |

## Development Notes

- MongoDB ObjectIds must contain 24 hexadecimal characters.
- User phone numbers must contain exactly 10 digits.
- Session end times must be later than session start times.
- Duplicate user or teacher email addresses are rejected.
- The API is configured to accept cross-origin requests.