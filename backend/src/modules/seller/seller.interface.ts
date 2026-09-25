import {Types} from 'mongoose'; // Import the Mongoose Types object so we can use MongoDB ObjectIds

// Defines the structure of a seller object
export interface ISeller {

    // The ID of the user who owns/created this seller
    user: Types.ObjectId;

    // The seller's name
    name: string;

    // The seller's email address
    email: string;

    // The seller's contact phone number
    contactNo: string;
}