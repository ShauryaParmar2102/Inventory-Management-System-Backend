import cors from 'cors'; // Import CORS so your React frontend is allowed to communicate with the backend

import express from "express"; // Import Express to create the backend application

import type {Application} from "express"; // Import the Application type for TypeScript

import morgan from 'morgan'; // Import Morgan to log HTTP requests in the terminal

import rootRouter from "./routes/index.js"; // Import the main router that connects all your module routes

import notFound from './middlewares/notFound.js'; // Import middleware for requests to routes that don't exist

import globalErrorHandler from './middlewares/globalErrorhandler.js'; // Import middleware that handles errors from the application

// Create the Express application
const app: Application = express();

// Allows Express to read JSON request bodies
// For example: { "name": "Keyboard", "price": 50 }
app.use(express.json());

// Logs requests in your terminal while the server is running
// Example: POST /api/v1/users/login 200
app.use(morgan('dev'));

// CORS controls which frontend websites are allowed to call this backend
app.use(cors({
    origin: [
        // Your local Vite React frontend
        'http://localhost:5173',
         // Replace this with real deployed frontend URL later
        'https://your-own-frontend.vercel.app'
    ]
}));

app.use('/api/v1', rootRouter); // Connect all of your module routes to /api/v1

app.use(globalErrorHandler); // Handles errors that happen while processing requests

app.use(notFound); // Handles requests to API routes that don't exist

export default app; // Export the Express app so server.ts can start it
