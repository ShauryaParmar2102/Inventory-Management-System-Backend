import { Router } from 'express'; // Import Router from Express to create the user routes
import userControllers from './user.controllers.js'; // Import the controller functions that handle user requests
import validateRequest from '../../middlewares/validateRequest.js'; // Middleware used to validate request data
import userValidator from './user.validator.js'; // Import the validation schemas for user requests
import verifyAuth from '../../middlewares/verifyAuth.js'; // Middleware used to check that a user is logged in/authenticated

const userRoutes = Router(); // Create a new Express router for user-related routes

// REGISTER USER
// Validate the registration data and create a new user account
userRoutes.post('/register', validateRequest(userValidator.registerSchema), userControllers.register);

// LOGIN USER
// Validate the login data and log the user into their account
userRoutes.post('/login', validateRequest(userValidator.loginSchema), userControllers.login);

// GET SELF PROFILE
// verifyAuth makes sure the user is logged in before showing their profile
userRoutes.get('/self', verifyAuth, userControllers.getSelf);

// CHANGE PASSWORD
// Make sure the user is logged in, validate the password data,
// and then change the user's password
userRoutes.post('/change-password', verifyAuth, validateRequest(userValidator.changePasswordSchema), userControllers.changePassword);

// UPDATE PROFILE
// Make sure the user is logged in and then update their profile information
userRoutes.patch('/', verifyAuth, userControllers.updateProfile);

export default userRoutes; // Export the user routes so they can be added to the main application router