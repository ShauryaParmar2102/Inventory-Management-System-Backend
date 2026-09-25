import type { ZodError } from 'zod';

// Converts Zod validation issues into a simpler error object
const zodErrorSanitize = (err: ZodError) => {

    // Loops through all Zod validation issues and builds an error object
    const errors = err.issues.reduce(
        (acc,cur) => {
            
            const path = cur.path[cur.path.length - 1]; // Gets the last part of the validation path, usually the field name

            const field = String(path); // Converts the path into a string so it can be used as an object key

            acc[field] = `${field} is ${cur.message}!`; // Stores the validation message using the field name as the key
            
            return acc;  // Returns the accumulator for the next validation issue
        },
        {} as Record<string, unknown>   // Starts with an empty object that will hold the validation errors
    );

    return errors; // Returns the formatted validation errors
};

export default zodErrorSanitize; // Exports the function so it can be used in other backend files