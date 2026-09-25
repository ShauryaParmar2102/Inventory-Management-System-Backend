// Custom error class used to create application-specific errors
class CustomError extends Error {
    public statusCode: number; // Stores the HTTP status code for the error
    public type: string = ''; // Stores an optional error type or category

        // Creates a new custom error with a status code, message, type and optional stack trace
    constructor(statusCode: number, message: string, type = '', stack = '') {
        super(message); // Passes the error message to the built-in Error class
        this.statusCode = statusCode; // Saves the HTTP status code
        this.type = type; // Saves the error type if one is provided

        if (stack) {
            this.stack = stack; // Uses the provided stack trace
        } else {
            Error.captureStackTrace(this, this.constructor); // Creates a stack trace starting from this custom error
        }
    }
}

// Exports the custom error class so it can be used in other backend files
export default CustomError; 