import httpStatus from 'http-status';
import asyncHandler from '../../lib/AsyncHandler.js';
import sendResponse from '../../lib/sendResponse.js';
import categoryServices from './category.services.js';


// Controller class for handling category-related requests
class CategoryController {

    // Stores the category service functions
    private services = categoryServices;

    //CREATE
    create = asyncHandler(async (req, res) => {

        // Creates a new category using request data and the logged-in user's ID
        const result = await this.services.create(req.body, req.user._id);

         // Sends the created category back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'Category created successfully!',
            data: result
        });
    });

    //READ
    getAll = asyncHandler(async (req, res) => {

         // Gets all categories belonging to the logged-in user
        const result = await this.services.getAll(req.user._id);

          // Sends the category data back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Category retrieved successfully!',
            data: result
        });
    });

    //Update
    update = asyncHandler(async (req,res) => {

        // Updates the category using the ID from the URL and request data
        const id = req.params.id;

        // Checks that the ID exists and is a string
            if (typeof id !== 'string') {
                throw new Error('Invalid category ID');
            }

            // Updates the category using the checked ID and new request data
            const result = await this.services.update(id, req.body);

        // Sends the updated category back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Category updated successfully!',
            data: result
        });
    });

    //DELETE
    delete = asyncHandler(async (req,res) => {

        // Gets the category ID from the URL parameters
        const id = req.params.id;

        // Checks that the ID exists and is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid category ID');
        }

        // Deletes the category using the checked ID
        await this.services.delete(id);

        // Sends a success response back to the client
        sendResponse(res, {
            success: true, // Marks the request as successful
            statusCode: httpStatus.OK, // Sends HTTP 200 OK
            message: 'Category deleted successfully!' // Success message
        });
    });
}

// Creates an instance of the CategoryController class
const categoryController = new CategoryController();

// Exports the controller so it can be used in category routes
export default categoryController;