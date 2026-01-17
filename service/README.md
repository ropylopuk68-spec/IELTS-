# Backend Service

A standard backend API server built with Node.js, Express, and MongoDB.

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up MongoDB:
   - Install MongoDB locally or use a cloud service like MongoDB Atlas
   - Create a database named `backend-service`
   - Set the connection string in `.env` file: `MONGODB_URI=mongodb://localhost:27017/backend-service`

## Running the Server

- Development mode:
  ```bash
  npm run dev
  ```

- Production mode:
  ```bash
  npm start
  ```

The server will run on port 3000 by default, or the port specified in the `PORT` environment variable.

## API Endpoints

- `GET /api/topics` - Get all topics
- `GET /api/topics/:id` - Get a specific topic by ID
- `POST /api/topics` - Create a new topic

## Database Schema

The database uses MongoDB with the following main collection:

### Topics Collection
- `id`: String (unique identifier)
- `question`: String (main question)
- `topicType`: String (optional)
- `questionCount`: Number (optional)
- `examTakers`: Number (optional)
- `answerCount`: Number
- `duration`: String
- `isNew`: Boolean (optional)
- `questions`: Array of sub-documents with question details
- `answer`: Array of answer objects

Each question sub-document contains:
- `question`: String
- `questionCN`: String (Chinese translation)
- `answer`: Array of answer objects
- `translation`: String
- `audioUrl`: String (optional)
- `keyPoints`: Array of strings

Each answer object contains:
- `text`: String
- `keywords`: Array of strings

## Project Structure

- `server.js` - Main server file
- `config/database.js` - Database connection
- `models/Topic.js` - Topic model/schema
- `routes/` - API routes (to be expanded)
- `controllers/` - Route handlers (to be expanded)
- `middleware/` - Custom middleware