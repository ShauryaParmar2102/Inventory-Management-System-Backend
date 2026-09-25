import {ZodError} from 'zod'; // Imports Zod's validation error class
import mongoose from 'mongoose';
import type { ErrorRequestHandler } from 'express';
import config from '../config/index.js';
import zodErrorSanitize from '../errors/zodErrorSanitize.js';
import validationError from '../errors/validationError.js';
import castError from '../errors/CastError.js';
import handleCustomError from '../errors/handleCustomError.js';
import CustomError from '../errors/customError.js';
import httpStatus from 'http-status';

// Handles errors from anywhere in the Express application
const globalErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {

    // Creates the default error response
    const errorResponse = {
        success: false, // Marks the request as unsuccessful
        statusCode: 500, // Uses 500 as the default server error status
        message: 'Internal Server Error', // Default error message
        errors: {}, // Stores detailed error information
        stack: config.nodeEnv === 'dev' ? err.stack : null // Shows the stack trace only in development
    };

        // Handles Zod validation errors
    if(err instanceof ZodError) {

        const errors = zodErrorSanitize(err); // Converts the Zod error into a simpler object
        
        errorResponse.statusCode = httpStatus.BAD_REQUEST;  // Sets HTTP status to 400
        errorResponse.message = "Validation Failed"; // Sets the response message
        errorResponse.errors = errors; // Adds the formatted validation errors

    // Handles Mongoose schema validation errors    
    } else if (err?.name === 'ValidationError') {

        // Converts the Mongoose validation error into a simpler object
        const errors = validationError(err as mongoose.Error.ValidationError);

        errorResponse.statusCode = httpStatus.BAD_REQUEST; // Sets HTTP status to 400
        errorResponse.message = "Validation Failed"; // Sets the validation message
        errorResponse.errors = errors; // Adds the formatted errors

    // Handles MongoDB/Mongoose cast errors such as invalid IDs
    } else if (err?.name === 'CastError') {

        const errors = castError(); // Creates a formatted cast error response

        errorResponse.statusCode = httpStatus.BAD_REQUEST; // Sets HTTP status to 400
        errorResponse.message = 'Cast Error'; // Sets the cast error message
        errorResponse.errors = errors; // Adds the cast error details


    // Handles errors created using the CustomError class
    } else if (err instanceof CustomError) {

        const errors = handleCustomError(err);  // Converts the custom error into a response-friendly object

        errorResponse.statusCode = err.statusCode; // Uses the custom error's status code
        errorResponse.message = err.message;  // Uses the custom error's message
        errorResponse.errors = errors; // Adds the formatted custom error details

         // Handles MongoDB duplicate key errors
    } else if (err?.code === 11000) {
    const firstEntry = Object.entries(err.keyValue)[0];  // Gets the first duplicated field and value

    // Makes sure a duplicate field was found before using it
    if (firstEntry) {
        const [key, value] = firstEntry; // Separates the field name and duplicated value

        errorResponse.statusCode = httpStatus.CONFLICT; // Sets HTTP status to 409
        errorResponse.message = 'Duplicate Entities';  // Sets the duplicate error message

        // Stores which field already exists
        errorResponse.errors = {
            [key]: `${value} already exists`
        };
    }
}

    // Sends the final formatted error response back to the frontend
    return res.status(errorResponse.statusCode).json(errorResponse); 
};

// Exports the middleware so it can be used by the Express app
export default globalErrorHandler;