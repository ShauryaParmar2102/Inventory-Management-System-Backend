// Import the application's configuration settings
// This gives us access to the JWT secret stored in the .env file
import config from '../config/index.js';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken so we can create JWT authentication tokens

// Import the JwtPayload TypeScript type
// This defines the type of data that can be stored inside the token
import type { JwtPayload } from 'jsonwebtoken';

// GENERATE JWT TOKEN
// Creates an authentication token using the supplied user information
const generateToken = (payload: JwtPayload) => {

    // Sign/create the JWT using:
    // 1. The user's data (payload)
    // 2. The secret key from the environment variables
    // 3. An expiry time of 2 days
  return jwt.sign(payload, config.jwt_secret!, { expiresIn: '2d' });
};

export default generateToken; // Export the function so it can be used when users register or log in