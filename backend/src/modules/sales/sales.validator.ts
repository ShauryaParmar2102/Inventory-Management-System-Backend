import { z } from 'zod';

// ==================== CREATE SALE VALIDATION ====================

// Defines the validation rules for creating a new sale
const createSchema = z.object({
    product: z.string(), // Product ID must be provided as a string
    productName: z.string(), // Product name must be a string
    quantity: z.number().min(1, { message: 'Must be equal or grater than 1' }), // Quantity must be a number and at least 1
    productPrice: z.number().min(1, { message: 'Must be equal or grater than 1' }), // Product price must be a number and at least 1
    buyerName: z.string(), // Buyer name must be a string
    date: z.string() // Sale date must be provided as a string
});

// ==================== UPDATE SALE VALIDATION ====================

// Defines the validation rules for updating an existing sale
const updateSchema = z.object({
    product: z.string().optional(), // Product ID is optional when updating
    quantity: z.number().min(1, { message: 'Must be equal or grater than 1' }).optional(), // Quantity is optional, but must be at least 1 if provided
    price: z.number().min(1, { message: 'Must be equal or grater than 1' }).optional(), // Price is optional, but must be at least 1 if provided
    buyerName: z.string().optional(), // Buyer name is optional when updating
    date: z.string().optional() // Sale date is optional when updating
});

// Store the sale validation schemas together
const saleValidator = {createSchema, updateSchema};

// Export the validators so they can be used in sale.routes.ts
export default saleValidator;