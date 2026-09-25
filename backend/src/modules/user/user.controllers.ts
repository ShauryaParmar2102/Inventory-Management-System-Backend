import httpStatus from 'http-status';
import asyncHandler from '../../lib/AsyncHandler.js';
import sendResponse from '../../lib/sendResponse.js';
import userServices from './user.services.js';

// Controller responsible for handling user-related requests
class UserController {

        // Gives the controller access to the user service methods
    private services = userServices;

    //GET SELF PROFILE
    // Retrieves the profile of the currently logged-in user
    getSelf = asyncHandler(async (req,res) => {

        // Use the logged-in user's ID to retrieve their profile
        const result = await this.services.getSelf(req.user._id);

        // Return the user's profile
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User profile retrieved successfully!',
            data: result
        });
    });

    //REGISTER NEW ACCOUNT
    // Creates a new user account using the request data
    register = asyncHandler(async (req,res) => {

        // Send the registration data to the user service
        const result = await this.services.register(req.body);

        // Return the result of the registration
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User Login Successful',
            data: result
        });
    });

    //LOG INTO REGISTERED ACCOUNT
    // Handles a user's login request
    login = asyncHandler(async (req,res) => {

        // Send the user's login details to the service
        // The service will handle checking the user's credentials
        const result = await this.services.login(req.body);

        //Return the result of the login
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK, // 200 OK means the login request was successful
            message: 'User login successfully!', // Success message returned to the client
            data: result // Return the login data from the service
        })
    })

    //UPDATE PROFILE
    // Updates the profile of the currently logged-in user
    updateProfile = asyncHandler(async (req,res) => {

        // Send the user's ID and updated profile data to the service
        const result = await this.services.updateProfile(req.user._id, req.body);

        // Return the updated user profile
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'User Profile updated successfully!',
            data: result
        });
    });

    //CHANGE PASSWORD
    // Changes the password of the currently logged-in user
    changePassword = asyncHandler(async (req,res) => {

        // Send the user's ID and password data to the service
        const result = await this.services.changePassword(req.user._id, req.body);

         // Tell the client that the password was successfully changed
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Password changed successfully!',
            data: result
        });
    });
}

// Create one instance of the UserController class
const userControllers = new UserController();

// Export the controller so it can be used in the user routes
export default userControllers;