import httpStatus from 'http-status';
import CustomError from '../../errors/customError.js';
import generateToken from '../../utils/generateToken.js';
import type { IUser } from './user.interface.js';
import User from './user.model.js';
import verifyPassword from '../../utils/verifyPassword.js';
import bcrypt from 'bcrypt';

// Service class containing the business logic for users
class UserServices {

    // Gives the service access to the User model
    private model = User;

    //GET PROFILE
    // Retrieves the logged-in user's profile
    async getSelf(userId: string) {
        return this.model.findById(userId); // Find the user in MongoDB using their ID
    }

    //REGISTER NEW USER
    // Creates a new user account
    async register(payload: any) {

         // Check that the password and confirmation password match
        if (payload.password !== payload.confirmPassword) {
            throw new CustomError(httpStatus.BAD_REQUEST, 'Passwords do not match');
        }

        const user = await this.model.create(payload); // Create the new user in MongoDB

        // Generate a JWT token containing the user's ID and email
        const token = generateToken({ _id: user._id, email: user.email});
        return { token, user }; // Return the token and newly created user
    }

    //LOGIN EXISTING USER
    // Logs an existing user into their account
    async login(payload: {email: string; password: string}) {

        // Find the user by their email
        // +password includes the password because it is hidden by default
        const user = await this.model.findOne({ email: payload.email}).select('+password');

         // Check that the user exists
        if (user) {
            await verifyPassword(payload.password, user.password); // Check that the entered password matches the stored password

             // Generate a JWT token for the logged-in user
            const token = generateToken({_id: user._id, email: user.email});

            // Return the token and user information
            return {token, user};
        } else {
            throw new CustomError(httpStatus.BAD_REQUEST, 'WrongCredentials'); // Throw an error if no matching user was found
        }
    } 

    //UPDATE USER PROFILE
    // Updates information on an existing user's profile
    async updateProfile(id: string, payload: Partial<IUser>) {
        return this.model.findByIdAndUpdate(id, payload);
    }

    //CHANGE PASSWORD
     // Changes the password of the logged-in user
    async changePassword(userId: string, payload: { oldPassword: string; newPassword: string}) {

        // Find the user and include their password in the result
        const user = await this.model.findById(userId).select('+password');

        // Stop if the user could not be found
        if (!user) throw new CustomError(httpStatus.NOT_FOUND, 'User not found');

         // Compare the entered old password with the stored password
        const matchedPassword = await bcrypt.compare(payload.oldPassword, user.password);

        // Stop if the old password is incorrect
        if (!matchedPassword){
            throw new CustomError(400, 'Old Password does not matched!');
            } 

            // Hash the new password before storing it in MongoDB
            const hashedPassword = await bcrypt.hash(payload.newPassword, 10);

            // Update the user's password with the newly hashed password
            const updatedUser = await this.model.findByIdAndUpdate(userId, {password: hashedPassword});

            // Return the updated user
            return updatedUser;
        }
    }

const userServices = new UserServices(); // Create one instance of the UserServices class

export default userServices; // Export the service so it can be used by the user controller

