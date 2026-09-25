import type { Request, Response } from 'express'; // Imports Express request and response types for TypeScript
import { success } from 'zod'; // Imports success from Zod, although it is not being used in this file

// Handles requests to routes that do not exist
const notFound = (_req: Request, res: Response) => {

    // Sends a 404 response back to the client
    return res.status(404).json({
        success: false, // Tells the frontend that the request was not successful
        statusCode: 404, // Sends the HTTP 404 status code in the response body
        message: '404! Route Not found.' // Sends a message explaining that the route does not exist
    });
};

// Exports the middleware so it can be used in the Express app
export default notFound;