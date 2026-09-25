// Import Schema to define the user structure
// Import model to create the Mongoose User model
import { Schema, model } from 'mongoose';

// Import the IUser interface that defines the TypeScript structure of a user
import type { IUser } from './user.interface.js';

// Import the helper function used to hash passwords
import hashPassword from '../../utils/hashPassword.js';

// Import the allowed user roles and user statuses
import { UserRole, UserStatus } from '../../constant/userRole.js';


// Create the MongoDB schema for users
// IUser tells TypeScript what structure the user data should have
const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true }, // User's name - must be a string and is required
        email: { type: String, required: true, unique: true }, // User's email - required and must be unique

        // User's password - required
        // select: 0 prevents the password from being returned by default in queries
        password: { type: String, required: true, select: 0 },


        title: {type: String}, // Optional title for the user's profile
        description: {type: String}, // Optional description or bio for the user

        // User's role must match one of the allowed UserRole values
        // New users are USER by default
        role: { type: String, enum: UserRole, default: 'USER' }, 

        // User's status must match one of the allowed UserStatus values
         // New users are ACTIVE by default
        status: { type: String, enum: UserStatus, default: 'ACTIVE' },

        address: {type: String}, // Optional address
        phone: { type: String }, // Optional phone number
        city: {type: String}, // Optional city
        country: {type: String}, // Optional country
        facebook: { type: String }, // Optional Facebook profile
        twitter: { type: String }, // Optional Twitter profile
        linkedin: { type: String }, // Optional LinkedIn profile
        instagram: {type: String}, // Optional Instagram profile
    },
    {timestamps: true} // Automatically creates createdAt and updatedAt fields
);

// Run this middleware before a user is saved to MongoDB
userSchema.pre('save', async function () {
    
    // Check whether the user's password has been created or changed
    if (this.isModified('password')) {

        // Hash the password before saving it to MongoDB
        this.password = await hashPassword(this.password);
    }
});

// Create the User model using the user schema
// This model is used to work with users in MongoDB
const User = model<IUser>('user', userSchema);

// Export the User model so other files can use it
export default User;

