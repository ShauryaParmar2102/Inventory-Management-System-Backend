import { z } from 'zod'; // Import Zod for validating data sent to the API

// REGISTER VALIDATION
// Defines what data is required when creating a new user account
const registerSchema = z.object({
    name: z.string(),  // User's name must be a string
    email: z.email(),  // User must provide a valid email address
    password: z.string().min(6, { message: 'password must have 6 characters' }) // Password must be a string with at least 6 characters
}); 

// UPDATE PROFILE VALIDATION
// Defines the fields that can be changed on a user's profile
const updatedProfileSchema = z.object({
    name: z.string().optional(), // All fields are optional because the user may only update one field
    title: z.string().optional(), // Optional profile title
    description: z.string().optional(), // Optional profile description
    avatar: z.string().optional() // Optional avatar/image value
});

// LOGIN VALIDATION
// Checks the email and password sent when a user logs in
const loginSchema = z.object({
    email: z.email(), // Must contain a valid email address
    password: z.string().min(6, { message: 'password must have 6 characters' }) // Password must contain at least 6 characters
});

// CHANGE PASSWORD VALIDATION
// Validates the user's old and new passwords
const changePasswordSchema = z.object({

    // User's current password
    oldPassword: z
        .string()
        .min(6, { message: 'Old password must have 6 characters' }),

    // Password the user wants to change to
    newPassword: z
        .string()
        .min(6, { message: 'New password must have 6 characters' }),
});

// Store all user validation schemas in one object
// This allows other files to access them through userValidator
const userValidator = { registerSchema, loginSchema, updatedProfileSchema, changePasswordSchema};


// Export the validators so they can be used in user.routes.ts
export default userValidator

