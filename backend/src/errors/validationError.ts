import mongoose from "mongoose";

// Converts Mongoose validation errors into a simpler object
const validationError = (error: mongoose.Error.ValidationError) => {

    // Loops through all validation errors and builds a response object
    const errRes = Object.keys(error.errors).reduce(
        (acc, cur) => {
            const currentError = error.errors[cur]; // Gets the current validation error using its key

            // Checks that the error exists before using its properties
        if (currentError) {
            acc[currentError.path] = currentError.message;
        }

            return acc; // Returns the accumulator for the next loop
        },

        // Starts with an empty object that stores field errors
        {} as Record<string, unknown>
    );

    return errRes; // Returns the formatted validation errors
};

// Exports the function so it can be used in other files
export default validationError;