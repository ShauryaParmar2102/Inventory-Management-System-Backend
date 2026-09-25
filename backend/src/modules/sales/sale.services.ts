/* eslint-disable @typescript-eslint/no-explicit-any */

// Import ObjectId Types from Mongoose
import { Types } from 'mongoose';

// Import helper used for sorting and pagination
import sortAndPaginatePipeline from '../../lib/sortAndPaginate.pipeline.js';

// Import the reusable base service containing common CRUD methods
import BaseServices from '../baseServices.js';

// Import the Sale model
import Sale from './sale.model.js';

// Import the Product model so product stock can be updated
import Product from '../product/product.model.js';

// Import custom error class for throwing API errors
import CustomError from '../../errors/customError.js';


// ==================== SALE SERVICES ====================

// Service responsible for sale business logic and database operations
class SaleServices extends BaseServices<any> {

    // Pass the Mongoose model and model name to BaseServices
    constructor(model: any, modelName: string) {
        super(model, modelName);
    }


    // ==================== CREATE SALE ====================

    // Create a new sale and decrease the stock of the sold product
    async create(payload: any, userId: string) {

        // Get the product price and quantity from the request data
        const { productPrice, quantity } = payload;

        // Store the logged-in user's ID with the sale
        payload.user = userId;

        // Calculate the total price of the sale
        payload.totalPrice = productPrice * quantity;

        // Find the product being sold
        const product = await Product.findById(payload.product);

        // Stop if the product does not exist
        if (!product) {
            throw new CustomError(404, 'Product not found');
        }

        // Prevent the sale if there is not enough product stock
        if (quantity > product.stock) {
            throw new CustomError(
                400,
                `${quantity} product are not available in stock!`
            );
        }

        try {

            // Decrease the product stock by the quantity sold
            await Product.findByIdAndUpdate(
                product._id,
                {
                    $inc: {
                        stock: -quantity
                    }
                }
            );

            // Create and save the new sale
            const result = await this.model.create([payload]);

            // Return the newly created sale
            return result;

        } catch (error) {

            // Print the real error in the terminal for debugging
            console.log(error);

            throw new CustomError(400, 'Sale create failed');
        }
    }


    // ==================== GET ALL SALES ====================

    // Get all sales belonging to the logged-in user
    async readAll(
        query: Record<string, unknown> = {},
        userId: string
    ) {

        // Get the search query, or use an empty string if none was provided
        const search = query.search
            ? (query.search as string)
            : '';

        // Find sales belonging to the user
        // and allow searching by product or buyer
        const data = await this.model.aggregate([
            {
                $match: {
                    user: new Types.ObjectId(userId),

                    // Search the product name or buyer name
                    $or: [
                        {
                            productName: {
                                $regex: search,
                                $options: 'i'
                            }
                        },
                        {
                            buyerName: {
                                $regex: search,
                                $options: 'i'
                            }
                        }
                    ]
                }
            },

            // Apply sorting and pagination to the results
            ...sortAndPaginatePipeline(query)
        ]);

        // Count the total number of sales belonging to the user
        const totalCount = await this.model.aggregate([
            {
                // Only count sales belonging to this user
                $match: {
                    user: new Types.ObjectId(userId)
                }
            },
            {
                // Group the results and count each sale
                $group: {
                    _id: null,
                    total: { $sum: 1 }
                }
            },
            {
                // Remove MongoDB's generated group ID
                $project: {
                    _id: 0,
                    total: 1
                }
            }
        ]);

        // Return both the sales and total number of sales
        return { data, totalCount };
    }


    // ==================== WEEKLY SALES ====================

    // Get sales totals grouped by week
    async readAllWeeks(userId: string) {

        return await this.model.aggregate([
            {
                // Only include this user's sales that contain a date
                $match: {
                    user: new Types.ObjectId(userId),
                    date: {
                        $exists: true,
                        $ne: null
                    }
                }
            },
            {
                // Group sales by ISO week and year
                $group: {
                    _id: {
                        week: {
                            $isoWeek: '$date'
                        },
                        year: {
                            $isoWeekYear: '$date'
                        }
                    },

                    // Calculate the total quantity sold
                    totalQuantity: {
                        $sum: '$quantity'
                    },

                    // Calculate the total revenue
                    totalRevenue: {
                        $sum: '$totalPrice'
                    }
                }
            },
            {
                // Sort results from earliest to latest
                $sort: {
                    '_id.year': 1,
                    '_id.week': 1
                }
            },
            {
                // Format the data returned by MongoDB
                $project: {
                    week: '$_id.week',
                    year: '$_id.year',
                    totalQuantity: 1,
                    totalRevenue: 1,
                    _id: 0
                }
            }
        ]);
    }


    // ==================== YEARLY SALES ====================

    // Get sales totals grouped by year
    async readAllYearly(userId: string) {

        return await this.model.aggregate([
            {
                // Find this user's sales that contain a date
                $match: {
                    user: new Types.ObjectId(userId),
                    date: {
                        $exists: true,
                        $ne: null
                    }
                }
            },
            {
                // Group sales by year
                $group: {
                    _id: {
                        year: {
                            $year: '$date'
                        }
                    },

                    // Add together the quantities sold during the year
                    totalQuantity: {
                        $sum: '$quantity'
                    },

                    // Add together the revenue made during the year
                    totalRevenue: {
                        $sum: '$totalPrice'
                    }
                }
            },
            {
                // Sort the years in ascending order
                $sort: {
                    '_id.year': 1
                }
            },
            {
                // Format the yearly result
                $project: {
                    year: '$_id.year',
                    totalQuantity: 1,
                    totalRevenue: 1,
                    _id: 0
                }
            }
        ]);
    }


    // ==================== DAILY SALES ====================

    // Get sales totals grouped by date
    async readAllDaily(userId: string) {

        return await this.model.aggregate([
            {
                // Find this user's sales that contain a date
                $match: {
                    user: new Types.ObjectId(userId),
                    date: {
                        $exists: true,
                        $ne: null
                    }
                }
            },
            {
                // Group the sales by day, month and year
                $group: {
                    _id: {
                        day: {
                            $dayOfMonth: '$date'
                        },
                        month: {
                            $month: '$date'
                        },
                        year: {
                            $year: '$date'
                        }
                    },

                    // Calculate the quantity sold
                    totalQuantity: {
                        $sum: '$quantity'
                    },

                    // Calculate the revenue made
                    totalRevenue: {
                        $sum: '$totalPrice'
                    }
                }
            },
            {
                // Sort the results by year, month and day
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1,
                    '_id.day': 1
                }
            },
            {
                // Format the daily sales result
                $project: {
                    day: '$_id.day',
                    month: '$_id.month',
                    year: '$_id.year',
                    totalQuantity: 1,
                    totalRevenue: 1,
                    _id: 0
                }
            }
        ]);
    }


    // ==================== MONTHLY SALES ====================

    // Get sales totals grouped by month
    async readAllMonths(userId: string) {

        return await this.model.aggregate([
            {
                // Find this user's sales that contain a date
                $match: {
                    user: new Types.ObjectId(userId),
                    date: {
                        $exists: true,
                        $ne: null
                    }
                }
            },
            {
                // Group sales by month and year
                $group: {
                    _id: {
                        month: {
                            $month: '$date'
                        },
                        year: {
                            $year: '$date'
                        }
                    },

                    // Calculate the total quantity sold
                    totalQuantity: {
                        $sum: '$quantity'
                    },

                    // Calculate the total revenuwe
                    totalRevenue: {
                        $sum: '$totalPrice'
                    }
                }
            },
            {
                // Sort results chronologically
                $sort: {
                    '_id.year': 1,
                    '_id.month': 1
                }
            },
            {
                // Format the monthly sales result
                $project: {
                    month: '$_id.month',
                    year: '$_id.year',
                    totalQuantity: 1,
                    totalRevenue: 1,
                    _id: 0
                }
            }
        ]);
    }


    // ==================== GET SINGLE SALE ====================

    // Get one sale belonging to the logged-in user
    async read(id: string, userId: string) {

        // Check that a sale with this ID exists
        await this._isExists(id);

        // Find the sale belonging to the user
        return this.model
            .findOne({
                user: new Types.ObjectId(userId),
                _id: id
            })
            .populate({
                // Replace the product ObjectId with product information
                path: 'product',

                // Exclude unnecessary fields from the populated product
                select: '-createdAt -updatedAt -__v'
            });
    }
}


// Create one instance of the SaleServices class
const saleServices = new SaleServices(
    Sale,
    'Sale'
);

// Export the service instance for use by the sale controller
export default saleServices;