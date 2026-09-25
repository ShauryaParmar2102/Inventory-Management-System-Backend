import {Types} from 'mongoose'; // Imports Mongoose types, including ObjectId

// Defines the structure of a category object/document
export interface ICategory {
    user: Types.ObjectId;  // Stores the MongoDB ObjectId of the user who owns the category
    name: string; // Stores the category name
}