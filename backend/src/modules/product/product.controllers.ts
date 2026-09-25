import httpStatus from 'http-status';
import asyncHandler from '../../lib/AsyncHandler.js';
import sendResponse from '../../lib/sendResponse.js';
import productServices from './product.services.js';

// Controller class for handling product-related requests
class ProductControllers {
    services = productServices; // Stores the product service functions

    //Create a new product
    create = asyncHandler(async (req,res) => {

        // Adds stock using the product ID, request data, and logged-in user's ID
        const result = await this.services.create(req.body, req.user._id);

         // Sends the created product back to the client
        sendResponse(res, {
            success: true, // Marks the request as successful
            statusCode: httpStatus.CREATED, // Sends HTTP 201 Created
            message: 'Product created successfully!',  // Success message
            data: result // Sends the created product data
        });
    });

     // ADD STOCK - adds more stock to an existing product
    addStock = asyncHandler(async (req,res) => {

         // Adds stock using the product ID, request data, and logged-in user's ID
        const id = req.params.id;

        // Checks that the product ID exists and is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid product ID');
        }

        // Add stock to the selected product using the request data and logged-in user's ID
        const result = await this.services.addToStock(id, req.body, req.user._id);

        // Sends the updated product stock back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Product added to stock successfully!',
            data: result
        });
    });

     // READ ALL - gets products using filters and query parameters
    readAll = asyncHandler(async (req,res) => {

        const result = await this.services.readAll(req.query, req.user._id); // Gets products using the query parameters and logged-in user's ID

        const page = Number(req.query.page) || 1;  // Gets the current page number from the query, defaulting to 1
        const limit = Number(req.query.limit) || 10;  // Gets the number of products per page, defaulting to 10

        // Sends the retrieved product information back to the client
        sendResponse(res, {
            success: true, // Marks the request as successful
            statusCode: httpStatus.OK, // Sends HTTP 200 OK
            message: 'All products retrieved successfully',

            // Pagination information
            meta: {
                page, // Current page number
                limit, // Number of products shown per page
                total: result?.totalCount[0]?.total || 0, // Total number of products found
                totalPage: Math.ceil((result?.totalCount[0]?.total || 0) / limit) // Calculates the total number of pages available
            },

            data: result.data // Sends the actual product list
        });
    });

    // GET TOTAL PRODUCT - gets the total number of products
    getTotalProduct = asyncHandler(async (req,res) => {

         // Counts the total products belonging to the logged-in user
        const result = await this.services.countTotalProduct(req.user._id);

        // Sends the total product count back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Count total products successfully',
            data: result[0]
        });
    });

    // UPDATE - updates an existing product
    update = asyncHandler(async (req,res) => {

        // Updates the product using the product ID and new request data
        const id = req.params.id;

        // Checks that the product ID exists and is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid product ID');
        }

        const result = await this.services.update(id, req.body);

         // Sends the updated product back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Product updated successfully!',
            data: result
        });
    });

    // READ SINGLE - gets one product by its ID
    readSingle = asyncHandler(async (req, res) => {

        // Gets the product ID from the URL
        const id = req.params.id;

        // Makes sure the product ID exists and is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid product ID');
        }

        // Gets one product belonging to the logged-in user
        const result = await this.services.read(id, req.user._id);

        // Sends the product back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Product retrieved successfully!',
            data: result
        });
    });

     // DELETE - deletes a single product
    delete = asyncHandler(async (req,res) => {

        // Deletes the product using the ID from the URL
        const id = req.params.id;

        // Checks that the product ID exists and is a string
        if (typeof id !== 'string') {
            throw new Error('Invalid product ID');
        }

        await this.services.delete(id);

        // Sends a success response back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Product deleted successfully!'
        });
    });

    // BULK DELETE - deletes multiple products at once
    bulkDelete = asyncHandler(async (req,res) => {

        // Deletes multiple products using IDs/data from the request body
        await this.services.bulkDelete(req.body);

        // Sends a success response back to the client
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Delete Selected Product successfully!'
        });
    });
}

const productControllers = new ProductControllers(); // Creates an instance of the ProductControllers class

export default productControllers; // Exports the controller so it can be used in product routes