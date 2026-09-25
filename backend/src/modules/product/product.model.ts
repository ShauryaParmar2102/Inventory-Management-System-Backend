import { Schema, model } from 'mongoose';
import type { IProduct } from './product.interface.js';

// Defines the MongoDB schema for products
const productSchema = new Schema<IProduct>(
    {
        user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}, // Stores the user who owns the product
        seller: {type: Schema.Types.ObjectId, required: true, ref: 'Seller'}, // Stores the seller linked to the product
        category: {type: Schema.Types.ObjectId, required: true, ref: 'category'}, // Stores the category linked to the product
        name: { type: String, required: true },  // Stores the product name
        size: { type: String, enum: ['SMALL', 'MEDIUM', 'LARGE']}, // Stores the optional product size
        brand: {type: Schema.Types.ObjectId, ref: 'brand'}, // Stores the optional brand linked to the product
        price: {type: Number, required: true},   // Stores the product price
        stock: { type: Number, required: true }, // Stores how many units of the product are in stock
        description: {type: String} // Stores the product description
    },
     // Automatically adds createdAt and updatedAt fields
    {timestamps: true}
);

const Product = model<IProduct>('product', productSchema); // Creates the Product model using the product schema

export default Product; // Exports the Product model so it can be used in services
