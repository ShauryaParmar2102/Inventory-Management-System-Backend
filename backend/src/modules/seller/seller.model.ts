// Import Schema for defining the seller structure
// Import model for creating the Mongoose Seller mode
import { Schema, model } from 'mongoose';

// Import the ISeller interface that defines the TypeScript structure of a seller
import type { ISeller } from './seller.interface.js';

// Create the MongoDB schema for sellers
// ISeller tells TypeScript what structure the seller data should have
const sellerSchema = new Schema<ISeller>(
    {
        // The user who created/owns this seller
        // ref connects this ObjectId to the user collection
        user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },

         // Seller's name
        name: { type: String, required: true },

         // Seller's email address
        email: {type: String, required: true},

         // Seller's contact phone number
        contactNo: { type: String, required: true }
    },
    {timestamps: true}  // Automatically adds createdAt and updatedAt fields
);

// Create the Seller model using the seller schema
// This model is used to create, read, update and delete sellers in MongoDB
const Seller = model<ISeller>('Seller', sellerSchema);

// Export the Seller model so it can be used in services and other files
export default Seller;
