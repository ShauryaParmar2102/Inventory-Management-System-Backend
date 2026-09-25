/* eslint-disable @typescript-eslint/no-explicit-any */

import { Types } from 'mongoose';
import sortAndPaginatePipeline from '../../lib/sortAndPaginate.pipeline.js';
import BaseServices from '../baseServices.js';
import Product from './product.model.js';
import matchStagePipeline from './product.aggregation.pipeline.js';
import CustomError from '../../errors/customError.js';
import Purchase from '../purchase/purchase.model.js';
import Seller from '../seller/seller.model.js';
import type { IProduct } from './product.interface.js';

// Service class for product-related database logic
class ProductServices extends BaseServices<any> {
    constructor(model: any, modelName: string) {
        // Passes the Product model to BaseServices
        super(model, modelName);
    }

    // CREATE A NEW PRODUCT
    async create(payload: IProduct, userId: string) {
        // Gets all valid Product property names
        type str = keyof IProduct;

        // Removes empty string values from the payload
        (Object.keys(payload) as str[]).forEach((key: str) => {
            if (payload[key] === '') {
                delete payload[key];
            }
        });

        // Adds the logged-in user's ID to the product
        payload.user = new Types.ObjectId(userId);

        try {
            // Finds the seller linked to the product
            const seller = await Seller.findById(payload.seller);

            // Stops if the seller does not exist
            if (!seller) {
                throw new CustomError(404, 'Seller not found');
            }

            // Creates the new product
            const product: any = await this.model.create([payload]);

            // Creates a purchase record for the newly added product
            await Purchase.create([
                {
                    user: userId,
                    seller: product[0]?.seller,
                    product: product[0]?._id,
                    sellerName: seller.name,
                    productName: product[0]?.name,
                    quantity: product[0]?.stock,
                    unitPrice: product[0]?.price,
                    totalPrice:
                        Number(product[0]?.stock) *
                        Number(product[0]?.price)
                }
            ]);

            // Returns the newly created product
            return product;
        } catch (error) {
            // Prints the real error in the terminal for debugging
            console.log(error);

            throw new CustomError(400, 'Product create failed');
        }
    }

    // COUNT TOTAL PRODUCT STOCK
    async countTotalProduct(userId: string) {
        // Uses MongoDB aggregation to calculate stock totals for the user
        return this.model.aggregate([
            {
                // Only includes products belonging to the logged-in user
                $match: {
                    user: new Types.ObjectId(userId)
                }
            },
            {
                // Adds together all product stock quantities
                $group: {
                    _id: null,
                    totalQuantity: { $sum: '$stock' }
                }
            },
            {
                // Removes _id and returns only totalQuantity
                $project: {
                    totalQuantity: 1,
                    _id: 0
                }
            }
        ]);
    }

    // GET ALL PRODUCTS OF THE USER
    async readAll(
        query: Record<string, unknown> = {},
        userId: string
    ) {
        // Gets filtered, sorted and paginated products
        let data = await this.model.aggregate([
            ...matchStagePipeline(query, userId),
            ...sortAndPaginatePipeline(query)
        ]);

        // Counts how many products match the filters
        const totalCount = await this.model.aggregate([
            ...matchStagePipeline(query, userId),
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 }
                }
            },
            {
                // Removes the MongoDB _id field from the result
                $project: {
                    _id: 0,
                    total: 1
                }
            }
        ]);

        // Populates the category with its related document
        data = await this.model.populate(data, {
            path: 'category',
            select: '-__v -user'
        });

        // Populates the brand with its related document
        data = await this.model.populate(data, {
            path: 'brand',
            select: '-__v -user'
        });

        // Populates the seller with its related document
        data = await this.model.populate(data, {
            path: 'seller',
            select: '-__v -user -createdAt -updatedAt'
        });

        // Returns products and total matching product count
        return { data, totalCount };
    }

    // GET A SINGLE PRODUCT OF A USER
    async read(id: string, userId: string) {
        // Checks that the product exists
        await this._isExists(id);

        // Gets the product only if it belongs to the logged-in user
        return this.model.findOne({
            user: new Types.ObjectId(userId),
            _id: id
        });
    }

    // DELETE MULTIPLE PRODUCTS
    async bulkDelete(payload: string[]) {
        // Converts string IDs into MongoDB ObjectIds
        const data = payload.map(
            (item) => new Types.ObjectId(item)
        );

        // Deletes every product whose ID is in the list
        return this.model.deleteMany({
            _id: { $in: data }
        });
    }

    // ADD STOCK TO AN EXISTING PRODUCT
    async addToStock(
        id: string,
        payload: Pick<IProduct, 'seller' | 'stock'>,
        userId: string
    ) {
        try {
            // Finds the seller linked to the stock update
            const seller = await Seller.findById(payload.seller);

            // Stops if the seller does not exist
            if (!seller) {
                throw new CustomError(404, 'Seller not found');
            }

            // Increases the product stock by the provided amount
            const product: any =
                await this.model.findByIdAndUpdate(
                    id,
                    {
                        $inc: {
                            stock: payload.stock
                        }
                    },
                    {
                        new: true
                    }
                );

            // Stops if the product does not exist
            if (!product) {
                throw new CustomError(404, 'Product not found');
            }

            // Records the stock addition as a purchase
            await Purchase.create([
                {
                    user: userId,
                    seller: product.seller,
                    product: product._id,
                    sellerName: seller.name,
                    productName: product.name,
                    quantity: Number(payload.stock),
                    unitPrice: Number(product.price),
                    totalPrice:
                        Number(payload.stock) *
                        Number(product.price)
                }
            ]);

            // Returns the updated product
            return product;
        } catch (error) {
            // Prints the real error in the terminal for debugging
            console.log(error);

            throw new CustomError(
                400,
                'Product stock update failed'
            );
        }
    }
}

// Creates the product service instance
const productServices = new ProductServices(
    Product,
    'Product'
);

// Exports the service for use in controllers
export default productServices;