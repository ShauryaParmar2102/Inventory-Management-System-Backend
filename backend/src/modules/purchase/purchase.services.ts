import { Types } from 'mongoose'; // Import Mongoose Types so ObjectId can be used for user IDs

// Import the reusable base service containing common CRUD methods
import BaseServices from '../baseServices.js'; 

// Import the TypeScript interface that defines a purchase
import type { IPurchase } from './purchase.interface.js';

// Import the Purchase Mongoose model
import Purchase from './purchase.model.js';

// Import the pipeline used for sorting and pagination
import sortAndPaginatePipeline from '../../lib/sortAndPaginate.pipeline.js';

// Service class containing the business and database logic for purchases
class PurchaseServices extends BaseServices<any> {

    // Pass the Purchase model and model name to BaseServices
    constructor(model: any, modelName: string) {
        super(model, modelName);
    }

    //CREATE NEW SALE AND DECREASE PRODUCT STOCK
    async create(payload: IPurchase, userId: string) {
        const {unitPrice, quantity} = payload; // Get the unit price and quantity from the purchase data
        payload.user = new Types.ObjectId(userId); // Store the logged-in user's ID on the purchase
        payload.totalPrice = unitPrice * quantity;  // Calculate the total purchase price

        return this.model.create(payload); // Save the purchase to MongoDB
    }

    //READ
    // Get all purchases belonging to the logged-in user
    async getAll(userId: string, query: Record<string, unknown>) {
        const search = query.search ? query.search : ''; // Use the search query if provided, otherwise use an empty string

        // Find purchases belonging to the user
        const data = await this.model.aggregate([
            {
                // Only return purchases belonging to this user
                $match: {
                    user: new Types.ObjectId(userId),

                    // Search by seller name OR product name
                    $or: [{ sellerName: {$regex: search, $options: 'i'} }, {productName: {$regex: search, $options: 'i' } }],
                }
            },
            ...sortAndPaginatePipeline(query) // Apply sorting and pagination
        ]);

        // Count the user's total number of purchases
        const totalCount = await this.model.find({user: userId}).countDocuments();

         // Return both the purchase records and total count
        return { data, totalCount };
    }
}

// Create an instance of the PurchaseServices class
const purchaseServices = new PurchaseServices(Purchase, 'Purchase');

// Export the service so the purchase controller can use it
export default purchaseServices;

