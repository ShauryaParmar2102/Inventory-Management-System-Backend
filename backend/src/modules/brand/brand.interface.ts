import { Types } from "mongoose"; // Imports Mongoose types, including ObjectId

// Defines the structure of a brand document/object
export interface IBrand {
    user: Types.ObjectId; // Stores the MongoDB ObjectId of the user who owns/created the brand
    name: String; // Stores the brand name
}