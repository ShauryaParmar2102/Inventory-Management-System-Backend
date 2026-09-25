import  type { NextFunction, Request, Response } from "express"; // Imports Express types used for middleware typing
import type { ZodType } from "zod"; // Imports the Zod object schema type used for request validation

// Creates middleware that validates incoming request data using a Zod schema
const validateRequest = (schema: ZodType) => {

     // Returns an async Express middleware function
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            // Validates the request body against the provided Zod schema
            await schema.parseAsync(req.body);

            next(); // Continues to the next middleware or route if validation succeeds
        } catch (error) {

            // Passes validation errors to the global error handler
            next(error);
        }
    };
};

// Exports the validation middleware helper for use in routes
export default validateRequest;