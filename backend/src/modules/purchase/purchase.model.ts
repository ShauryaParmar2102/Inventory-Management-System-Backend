// Import Mongoose model and Schema for creating the database model
import { model, Schema } from 'mongoose';

// Import the TypeScript interface that defines a purchase
import type { IPurchase } from './purchase.interface.js';

// Create the MongoDB schema for purchases
const purchaseSchema = new Schema<IPurchase>(
    {
        user: {type: Schema.Types.ObjectId, required: true, ref: 'user'}, // User who owns/created the purchase
        seller: { type: Schema.Types.ObjectId, required: true, ref: 'seller' }, // Seller the product was purchased from
        product: {type: Schema.Types.ObjectId, required: true, ref: 'product'}, // Product that was purchased
        sellerName: { type: String, required: true }, // Store the seller's name with the purchase
        productName: { type: String, required: true}, // Store the product's name with the purchase
        quantity: {type: Number, required: true}, // Number of products purchased
        unitPrice: {type: Number, required: true}, // Price of one unit
        totalPrice: {type: Number, required: true}, // Total price of the purchase
        paid: {type: Number, default: 0} // Amount paid so far - defaults to 0
    },
    {timestamps: true}  // Automatically adds createdAt and updatedAt fields
);

// Create the Purchase model using the purchase schema
const Purchase = model<IPurchase>('purchase', purchaseSchema);

// Export the model so it can be used by the purchase services
export default Purchase;


