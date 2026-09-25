import { z } from 'zod';

// Validation schema for creating a product
const createSchema = z.object({
    name: z.string(), //Product name is required
    seller: z.string(), //Seller Id is required
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(), // Product size is optional
    category: z.string(), //Category id is required
    brand: z.string().optional(), // Brand ID is optional
    price: z.number().min(1, { message: 'Must be grater than 1!' }), // Price must be at least 1
    stock: z.number().min(1, { message: 'Must be grater than 1!' }) // Stock must be at least 1
});

// Validation schema for updating a product
const updateSchema = z.object({
    name: z.string().optional(),  // Product name is optional when updating
    seller: z.string().optional(),  // Seller ID is optional when updating
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(), // Size is optional when updating
    category: z.string().optional(), // Category ID is optional when updating
    brand: z.string().optional(),  // Brand ID is optional when updating

    // Price is optional when updating, but must be at least 1 if provided
    price: z.number().min(1, { message: 'Must be greater than 1!' }).optional(),

    // Stock is optional when updating, but must be at least 1 if provided
    stock: z.number().min(1, { message: 'Must be greater than 1!' }).optional()
});

// Validation schema for adding stock to an existing product
const addStockSchema = z.object({
    stock: z.number().min(1, {message: 'Must be greater than 1'}) // Stock amount must be at least 1
});

// Groups all product validation schemas together
const productValidator = {createSchema, updateSchema, addStockSchema};

// Exports the validators so they can be used in product routes
export default productValidator;