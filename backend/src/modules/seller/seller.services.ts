import { Types } from 'mongoose'; // Import Mongoose Types so MongoDB ObjectIds can be created

import sortAndPaginatePipeline from '../../lib/sortAndPaginate.pipeline.js'; // Import the pipeline used for sorting and pagination

import BaseServices from '../baseServices.js'; // Import the base service containing reusable CRUD methods

import Seller from './seller.model.js'; // Import the Seller model used to access seller data in MongoDB

// Service class containing the business logic for sellers
class SellerServices extends BaseServices<any> {

    // Pass the Mongoose model and model name to BaseServices
    constructor(model: any, modelName: string) {
        super(model, modelName);
    }

     // CREATE NEW SELLER
    // Creates a seller belonging to the logged-in user
    async create(payload: any, userId: string) {
        payload.user = userId; // Store the logged-in user's ID with the seller
        return this.model.create(payload) // Create and save the new seller in MongoDB
    }

    // GET ALL SELLERS
    // Retrieves sellers belonging to the logged-in user
    // Supports searching, sorting and pagination
    async readAll(query: Record<string, unknown> = {}, userId: string) {

        // Get the search value from the query
        // Use an empty string if no search was provided
        const search = query.search ? query.search : '';

         // Find sellers belonging to the logged-in user
        const data = await this.model.aggregate([
            {
                $match: {
                    user: new Types.ObjectId(userId), // Only retrieve sellers belonging to this user

                    // Search the seller's name, email or contact number
                    $or: [
                        { name: { $regex: search, $options: 'i' } },
                        { email: {$regex: search, $options: 'i'} },
                        { contactNo: { $regex: search, $options: 'i' } } 
                    ]
                }
            },
             // Apply sorting and pagination to the results
            ...sortAndPaginatePipeline(query)
        ]);

        // Count the total number of sellers belonging to the user
        const totalCount = await this.model.aggregate([
            {
                // Only count sellers belonging to this user
                $match: {
                    user: new Types.ObjectId(userId)
                }
            }, 
            {
                // Group the results and count each seller
                $group: {
                    _id: null,
                    total: { $sum: 1}
                }
            },
            {
                // Remove the MongoDB _id field from the result
                $project: {
                    _id: 0
                }
            }
        ]);

        // Return both the seller data and total count
        // The controller uses totalCount for pagination information
        return {data, totalCount};
    }

    //GET SINGLE SALE
    // Retrieves one seller belonging to the logged-in user
    async read(id: string, userId: string) {
        await this._isExists(id); // Check that a seller with this ID exists
        return this.model.findOne({user: new Types.ObjectId(userId), _id: id }); // Find the seller using both the seller ID and user's ID
    }
}

// Create one instance of SellerServices using the Seller model
const sellerServices = new SellerServices(Seller, 'seller');

// Export the service so it can be used by the seller controller
export default sellerServices;