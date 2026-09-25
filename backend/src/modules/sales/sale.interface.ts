
// Import Mongoose Types so ObjectId can be used for database references
import {Types} from 'mongoose';

// Defines the structure of a sale object
export interface ISale {
    user: Types.ObjectId; // ID of the user who created/owns the sale
    product: Types.ObjectId;  // ID of the product being sold
    productName: string; // Stores the product name for the sale
    productPrice: number;  // Price of one unit of the product
    quantity: number; // Number of units sold
    buyerName: string; // Name of the buyer
    date: Date; // Date when the sale was made
    totalPrice: number;  // Total price of the sale
}