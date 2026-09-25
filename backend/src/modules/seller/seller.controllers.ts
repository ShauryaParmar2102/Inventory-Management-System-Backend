import httpStatus from 'http-status';
import asyncHandler from '../../lib/AsyncHandler.js';
import sendResponse from '../../lib/sendResponse.js';
import sellerServices from './seller.services.js';

// Controller responsible for handling seller requests
class SellerControllers { 
    services = sellerServices;  // Gives the controller access to the seller service methods

    // CREATE NEW SELLER
    // Creates a new seller for the logged-in user
    create = asyncHandler(async (req,res) => {
        const result = await this.services.create(req.body, req.user._id); // Send the seller data and logged-in user's ID to the service

        // Return the newly created seller
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'New seller created successfully!',
            data: result
        });
    });

    // GET ALL SELLERS
    // Retrieves the logged-in user's sellers with search, sorting and pagination
    readAll = asyncHandler(async (req,res) => {

         // Get sellers using the query parameters and user's ID
        const result = await this.services.readAll(req.query, req.user._id);

        // Set the current page, defaulting to page 1
        const page = Number(req.query.page) || 1;

         // Set the number of sellers per page, defaulting to 10
        const limit = Number(req.query.limit) || 10;

        // Return the sellers with pagination information
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'All seller retrieved successfully',
            meta: {
                page,
                limit,
                total: result?.totalCount[0]?.total || 0,
                totalPage: Math.ceil(result?.totalCount[0]?.total / limit)
            },
            data: result.data
        });
    });

    // GET SINGLE SELLER
    // Retrieves one specific seller belonging to the logged-in user
    readSingle = asyncHandler(async (req,res) => {

        // Get the seller ID from the URL
        const id = req.params.id;

        // Make sure the seller ID is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid seller ID');
        }

        // Find the seller using its ID and the logged-in user's ID
        const result = await this.services.read(id, req.user._id);

        // Return the requested seller
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Seller fetched successfully!',
            data: result
        });
    });

    //UPDATE SELLER
    // Updates an existing seller using its ID
    update = asyncHandler(async (req,res) => {

        // Get the seller ID from the URL
        const id = req.params.id;

        // Make sure the seller ID is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid seller ID');
        }

        // Update the seller using its ID
        const result = await this.services.update(id, req.body);

        // Return the updated seller
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Seller Updated Successfully',
            data: result
        });
    });

    //DELETE SELLER
    // Deletes an existing seller using its ID
    delete = asyncHandler(async (req,res) => {

        // Get the seller ID from the URL
        const id = req.params.id;

        // Make sure the seller ID is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid seller ID');
        }

        // Delete the seller using its ID
        await this.services.delete(id);

         // Tell the client that the seller was successfully deleted
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Seller deleted successfully'
        });
    });
}
// Create one instance of the SellerControllers class
const sellerControllers = new SellerControllers();

// Export the controller so it can be used in seller.routes.ts
export default sellerControllers;
