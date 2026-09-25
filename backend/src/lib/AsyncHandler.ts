import type { NextFunction, Request, RequestHandler, Response } from "express";  // Imports Express types used for requests, responses, middleware and next()

// Wraps an async Express route handler so errors are automatically passed to error middleware
const asyncHandler = (fn: RequestHandler) => {

        // Returns a new Express middleware function
    return (req: Request, res: Response, next: NextFunction) => {

        // Runs the original handler and forwards any rejected promise/error to next()
        Promise.resolve(fn(req,res,next)).catch((err) => next(err));
    };
};

// Exports the helper so it can be reused around async route handlers
export default asyncHandler;