import { z } from 'zod'; // Import Zod for validating request data

// Validation schema used when creating a new seller
const createSchema = z.object ({

    // Seller's name
    // Optional means the request does not have to include it
    name: z.string().optional(),

    email: z.string(), // Seller's email must be a string
    contactNo: z.string() // Seller's contact number must be a string
});

// Validation schema used when updating an existing seller
const updateSchema = z.object({
    name: z.string().optional(), // All update fields are optional because the user may only want to update one field
    email: z.string().optional(), // Seller's updated email
    contactNo: z.string().optional()  // Seller's updated contact number
});

const sellerValidator = {createSchema, updateSchema}; // Group the seller validation schemas together

export default sellerValidator; // Export the validators so they can be used in seller.routes.ts