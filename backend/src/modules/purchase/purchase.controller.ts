import httpStatus from 'http-status';
import asyncHandler from '../../lib/AsyncHandler.js';
import sendResponse from '../../lib/sendResponse.js';
import purchaseServices from './purchase.services.js';

// Controller responsible for handling purchase requests
class PurchaseController {

    // Gives this controller access to the purchase service methods
    private services  = purchaseServices;

    //CREATE
    // Creates a new purchase using the request body and logged-in user's ID
    create = asyncHandler(async (req,res) => {

        // Send the purchase data to the service
        const result = await this.services.create(req.body, req.user._id);

        // Return the newly created purchase
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'Purchase created successfully',
            data: result
        });
    });

    //READ
    // Retrieves all purchases belonging to the logged-in user
    getAll = asyncHandler(async (req,res) => {

        // Get purchases using the user's ID and query parameters
        const result = await this.services.getAll(req.user._id, req.query);

        const page = Number(req.query.page) || 1; // Get the requested page or default to page 1

        const limit = Number(req.query.limit) || 10; // Get the requested limit or default to 10 records per page

        // Return the purchases and pagination information
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Purchase retrieved successfully!',
            meta: {
                page,
                limit,
                total: result?.totalCount || 0, // Total number of matching purchases
                totalPage: Math.ceil(result?.totalCount / limit) // Calculate the total number of pages
            },
            data: result.data  // Purchase records returned by the service
        });
    });

    //UPDATE
    // Updates an existing purchase using its ID
    update = asyncHandler(async(req,res) => {

        // Get the purchase ID from the URL
        const id = req.params.id;

        // Make sure the ID is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid purchase ID');
        }

        // Pass the purchase ID and updated data to the service
        const result = await this.services.update(id, req.body);

        // Return the updated purchase
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Purchase Updated Successfully',
            data: result,
        });
    });

    //DELETE
     // Deletes a purchase using its ID
    delete = asyncHandler(async (req,res) => {

       // Get the purchase ID from the URL
        const id = req.params.id;

        // Make sure the ID is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid purchase ID');
        }

        // Pass the purchase ID to the delete service
        await this.services.delete(id);

        // Tell the client that the purchase was deleted
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Purchase Deleted Successfully'
        });
    });

}
// Create one instance of the PurchaseController class
const purchaseController = new PurchaseController();

// Export the controller so it can be used in purchase.routes.ts
export default purchaseController;

