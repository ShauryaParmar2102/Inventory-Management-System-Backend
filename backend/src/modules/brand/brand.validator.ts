import {z} from 'zod'; // Imports Zod for request validation

// Validation schema for creating a brand
const createSchema = z.object({
    name: z.string().optional() // Brand name must be a string if provided
});

// Validation schema for updating a brand
const updateSchema = z.object({
    name: z.string().optional() // Updated brand name must be a string if provided
});

// Groups the brand validation schemas into one object
const brandValidator = {createSchema, updateSchema};

// Exports the validators so they can be used in the brand routes
export default brandValidator;