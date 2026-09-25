import dotenv from 'dotenv'; // Imports dotenv so environment variables can be loaded from a .env file
import path from 'path'; // Imports Node's path module for building file paths

dotenv.config({
    path: path.join(process.cwd(), '.env') // Loads the .env file from the backend project root
});

export default {
    nodeEnv: process.env.NODE_ENV, // Stores the current environment, such as development or production
    port: process.env.PORT, // Stores the port number used by the backend server
    database_url: process.env.DATABASE_URL, // Stores the MongoDB connection URL
    jwt_secret: process.env.JWT_SECRET // Stores the secret key used for JWT authentication
};