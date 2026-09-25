import httpStatus from 'http-status'; // Import HTTP status codes such as 200 (OK) and 201 (Created)
import asyncHandler from '../../lib/AsyncHandler.js'; // Handles errors from asynchronous controller functions
import sendResponse from '../../lib/sendResponse.js'; // Sends API responses in a consistent format
import saleServices from './sale.services.js';  // Contains the business logic for sales

// Controller responsible for handling sale requests
class SaleControllers {
    services = saleServices;  // Gives the controller access to the sale service methods

    //CREATE NEW SALE
    // Creates a new sale for the logged-in user
    create = asyncHandler(async (req,res) => {

        // Send the sale data and user's ID to the service
        const result = await this.services.create(req.body, req.user._id);

        // Return the newly created sale
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'sale created successfully!',
            data: result
        });
    });

    // GET ALL SALES OF USER WITH QUERY
    // Retrieves the user's sales using search, sorting or pagination queries
    readAll = asyncHandler(async (req,res) => {

        // Get the sales using query parameters and the logged-in user's ID
        const result = await this.services.readAll(req.query, req.user._id);

        const page = Number(req.query.page) || 1; // Use page 1 if no page was provided
        const limit = Number(req.query.limit) || 10; // Show 10 records per page if no limit was provided

         // Return the sales with pagination information
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'All sales retrieved successfully',
            meta: {
                page,
                limit,
                total: result?.totalCount[0]?.total || 0,
                totalPage: Math.ceil(result?.totalCount[0]?.total / limit)
            },
            data: result.data
        });
    });

    // GET ALL SALES BY MONTH
    // Retrieves monthly sales data for the logged-in user
    readAllMonths = asyncHandler(async (req,res) => {
        const result = await this.services.readAllMonths(req.user._id); // Get the user's monthly sales from the service

        // Return the monthly sales data
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'monthly sales retrieved successfully',
            data: result
        });
    });

    //GET ALL SALES BY DAILY
    readAllDaily = asyncHandler(async (req,res) => {
        const result = await this.services.readAllDaily(req.user._id);

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'daily sales retrieved successfully',
            data: result
        });
    });

    // GET ALL SALES BY YEARLY
    // Retrieves yearly sales data for the logged-in user
    readAllYearly = asyncHandler(async (req,res) => {

         // Get the user's yearly sales from the service
        const result = await this.services.readAllYearly(req.user._id);

        // Return the yearly sales data
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'yearly sales retrieved successfully',
            data: result
        });
    });

    // GET ALL SALE BY WEEK
    // Retrieves weekly sales data for the logged-in user
    readAllWeeks = asyncHandler(async (req,res) => {

        // Get the user's weekly sales from the service
        const result = await this.services.readAllWeeks(req.user._id);

        // Return the weekly sales data
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'weekly sales retrieved successfully',
            data: result
        });
    });

    // GET SINGLE SALE BY USER
    // Retrieves one specific sale belonging to the logged-in user
    readSingle = asyncHandler(async (req,res) => {

         // Find the sale using the sale ID and logged-in user's ID
        const id = req.params.id;

        // Make sure the route ID is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid sale ID');
        }

        // Find the sale using the sale ID and logged-in user's ID
        const result = await this.services.read(id, req.user._id);
        
        // Return the requested sale
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'sale fetched successfully!',
            data: result
        });
    });

    // UPDATE SALE
    // Updates an existing sale
    update = asyncHandler(async (req,res) => {

        // Get the sale ID from the URL
        const id = req.params.id;

         // Make sure the sale ID is a valid string
        if (typeof id !== 'string') {
            throw new Error('Invalid sale ID');
        }

        // Separate price and quantity from the rest of the request data
        const {price, quantity, ...restPayload} = req.body;

        // Get the existing sale before updating it
        const sale = await this.services.read(id, req.user._id);

        // Use the new price if provided, otherwise use the existing product price
        const updatedPrice = price || sale.product.price;

         // Use the new quantity if provided, otherwise use the existing quantity
        const updatedQuantity = quantity || sale.quantity;

         // Update the sale using its ID and the remaining request data
        const result = await this.services.update(id, restPayload);

        // Return the updated sale
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'sale updated successfully!',
            data: result
        });
    });

   // DELETE SALE
// Deletes an existing sale
delete = asyncHandler(async (req,res) => {

    // Get the sale ID from the URL
    const id = req.params.id;

    // Make sure the ID is a string
    if (typeof id !== 'string') {
        throw new Error('Invalid sale ID');
    }

    // Delete the sale using its ID
    await this.services.delete(id);

    // Tell the client that the sale was successfully deleted
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'sale delete successfully!'
    });
});

} 


// Create one instance of the SaleControllers class
const saleControllers = new SaleControllers();

// Export the controller so it can be used in sale.routes.ts
export default saleControllers;
