import { z } from 'zod'; // Imports Zod for validating request data

// Validation schema for creating a category
const createSchema = z.object({
    name: z.string() // Category name is required and must be a string
});

// Validation schema for updating a category
const updateSchema = z.object({
    name: z.string().optional() // Category name is optional when updating
});

// Groups the category validation schemas together
const categoryValidator = {createSchema, updateSchema};

// Exports the validators so they can be used in category routes
export default categoryValidator;