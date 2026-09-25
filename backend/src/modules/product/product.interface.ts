import {Types} from 'mongoose';

// Defines the structure of a product
export interface IProduct {

    user: Types.ObjectId; // ID of the user who owns/created the product

    name: string;  // Product name

    seller: Types.ObjectId;  // ID of the seller linked to the product

    category: Types.ObjectId; // ID of the category the product belongs to

    brand?: Types.ObjectId; // Optional ID of the product's brand

    size?: string; // Optional product size

    price: number; // Product price

    stock: number; // Number of items currently in stock
    
    description: string; // Description of the product
}