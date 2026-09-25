// Import Schema and model from Mongoose
import { Schema, model } from 'mongoose';

// Import the TypeScript interface that defines a sale
import type { ISale } from './sale.interface.js';

// Create the MongoDB schema for sales
const saleSchema = new Schema<ISale>(
    {
        user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },  // ID of the user who owns/created the sale
        product: {type: Schema.Types.ObjectId, required: true, ref: 'product'}, // ID of the product that was sold
        buyerName: { type: String, required: true }, // Name of the buyer
        productName: { type: String, required: true}, // Name of the product that was sold
        quantity: { type: Number, required: true },  // Number of units sold
        totalPrice: { type: Number, required: true },  // Total price of the sale
        productPrice: { type: Number, required: true },  // Price of one unit of the product
        date: {type: Date, required: true}  // Date when the sale was made
    },
    {timestamps: true} // Automatically adds createdAt and updatedAt fields
);

const Sale = model<ISale>('sale', saleSchema); // Create the Sale model using the sale schema

export default Sale; // Export the model so it can be used by the sales services