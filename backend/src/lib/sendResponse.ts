import type { response, Response } from "express";

// Defines pagination information returned with a response
interface IMeta {
    page: number; // Current page number
    limit: number;  // Number of items per page
    total: number; // Total number of items available
    totalPage: number; // Stores the total number of pages available
} 


// Defines the standard structure of an API response
interface IResponse<T> {
    statusCode: number, // HTTP status code returned by the API
    success: boolean, // Indicates whether the request was successful
    message: string, // Message describing the result of the request
    data?: T; // Optional response data of a generic type
    meta?: IMeta; // Optional pagination information
}

// Sends a consistent JSON response back to the client
const sendResponse = <T>(res: Response, responses: IResponse<T>) => {

    // Sets the status code and sends the formatted response as JSON
    return res.status(responses.statusCode).json({
        statusCode: responses.statusCode, // Sends the HTTP status code in the response body
        success: responses.success,  // Tells the frontend whether the request succeeded
        message: responses.message, // Sends a message describing the result
        meta: responses.meta, // Sends optional pagination information
        data: responses.data // Sends the actual response data
    });
};

// Exports the helper so it can be reused in controllers and other backend files
export default sendResponse; 
