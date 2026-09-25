import {Schema, model} from 'mongoose';
import type { ICategory } from './category.interface.js';

// Defines the MongoDB schema for categories
const categorySchema = new Schema<ICategory>(

     // Stores the user who owns the category
    {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },

    // Stores the category name
    name: {type: String, reqired: true}
    },

    // Automatically adds createdAt and updatedAt fields
    {timestamps: true}
);

const Category = model<ICategory>('category', categorySchema); // Creates the Category model using the category schema

export default Category; // Exports the Category model so it can be used in services
