import CustomError from "./customError.js";

// Converts different custom error types into response-friendly error objects
const handleCustomError = (err: CustomError) => {
    let errorResponse: Record<string, unknown> | null = {};

    // Returns field errors when the email or password is incorrect
    if (err.type === "WrongCredentials") {
        errorResponse = {
            email: {
                path: 'email',
                message: 'Wrong Credentials'
            },
            password: {
                path: 'password',
                message: 'Wrong Credentials'
            }
        };
    }
    // Marks the user as unauthenticated when they are not authorized
    if(err.type === "Unauthorize") {
        errorResponse = {isAuthenticated: false};
    }
    // Returns an empty error object when the requested resource is not found
    if (err.type === 'NOT_FOUND') {
        errorResponse = {};
    }

    // Returns the formatted error response
    return errorResponse;
};

// Exports the error handler so it can be used in other backend files
export default handleCustomError;
