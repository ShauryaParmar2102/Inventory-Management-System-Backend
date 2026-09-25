import httpStatus from 'http-status';
import asyncHandler from "../../lib/AsyncHandler.js";
import sendResponse from "../../lib/sendResponse.js";
import brandServices from './brand.services.js'

// Controller class that handles brand-related requests
class BrandController {   
    private services = brandServices; // Stores the brand service functions used by this controller

    //Create
    create = asyncHandler(async (req,res) => {

        // Calls the brand service with the request data and the logged-in user's ID
        const result = await this.services.create(req.body, req.user._id);

         // Sends a successful response back to the client
        sendResponse(res, {
            success: true, // Marks the request as successful
            statusCode: httpStatus.CREATED, // Sends HTTP 201 Created
            message: 'Brand created successfully', // Success message for the frontend
            data: result // Sends the newly created brand data
        });
    });

    //READ
    getAll = asyncHandler(async (req, res) => {
        const result = await this.services.getAll(req.user._id); // Calls the brand service and passes the logged-in user's ID

          // Sends the retrieved brands back to the client
        sendResponse(res, {
            success: true,  // Marks the request as successfu
            statusCode: httpStatus.OK,  // Sends HTTP 200 OK
             message: 'Brand retrieved successfully!', // Success message for the client
             data: result // Sends the brand data returned by the service
        });
    });

    //UPDATE
    update = asyncHandler(async (req, res) => {

        // Gets the brand ID from the URL parameters
        const id = req.params.id;

        // Checks that the ID exists and is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid brand ID');
        }

        // Calls the brand service with the brand ID and updated data
        const result = await this.services.update(id, req.body);

        // Sends the updated brand back to the client
        sendResponse(res, {
            success: true,  // Marks the request as successful
            statusCode: httpStatus.OK, // Sends HTTP 200 OK
            message: 'Brand updated successfully!',  // Success message for the client
            data: result // Sends the updated brand data returned by the service
        });
    });

    //DELETE
    delete = asyncHandler(async (req,res) => {

        
        const id = req.params.id;  // Gets the brand ID from the URL parameters

        // Checks that the ID exists and is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid brand ID');
        }

         // Calls the brand service to delete the brand using its ID
        await this.services.delete(id); 

         // Sends a success response back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Brand Deleted Successfully!'
        });
    });
}

const brandController = new BrandController(); // Creates an instance of the BrandController class
export default brandController; // Exports the controller instance so it can be used in the routes
