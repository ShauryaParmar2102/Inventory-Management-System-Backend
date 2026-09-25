// Import Mongoose Types so ObjectId can be used for database references
import {Types} from 'mongoose';

// Defines the structure of a purchase object
export interface IPurchase {

    // ID of the user who owns/created the purchase
    user: Types.ObjectId;

    // ID of the seller the product was purchased from
    seller: Types.ObjectId;

    // ID of the purchased product
    product: Types.ObjectId;

     // Name of the seller
    sellerName: string;

     // Name of the purchased product
    productName: string;

     // Number of units purchased
    quantity: number;

    // Price of one unit of the product
    unitPrice: number;

    // Total cost of the purchase
    totalPrice: number;

    // Amount already paid (optional)
    paid?: number;
}