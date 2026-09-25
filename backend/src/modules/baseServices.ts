import { Model } from 'mongoose';
import CustomError from '../errors/customError.js';
import httpStatus from 'http-status';

// Reusable base service class for common CRUD operations
class BaseServices<T> {

        // Stores the Mongoose model
    protected model: Model<T>;

     // Stores the name of the model
    protected modelName: string = '';

    // Runs when a new BaseServices object is created
    constructor(model: Model<T>, modelName: string) {
        if(!model || !(model.prototype instanceof Model)) {
            throw new Error('Invalid mongoose model!')
        }

        this.model = model; // Saves the model for use in the service methods
        this.modelName = modelName; // Saves the model name for error messages
    }

    // Creates a new document
    async create(payload: any, userId: string) {
        payload.user = userId; // Adds the logged-in user's ID to the document
        return this.model.create(payload); // Saves the new document to MongoDB
    }

    // Updates an existing document
    async update(id: string, payload: any) {

        // Checks that the document exists before updating it
        await this._isExists(id);

        // Finds the document by ID and updates it
        return this.model.findByIdAndUpdate
        (id,
        payload, 
        {new: true, // Returns the updated document
        runValidators: true // Runs Mongoose validation during the update
        });
    }

     // Deletes an existing document
    async delete(id: string) {
        await this._isExists(id);   // Checks that the document exists before deleting it 
        return this.model.findByIdAndDelete(id);   // Finds the document by ID and deletes it
    }

     // Checks whether a document exists in the database
    protected async _isExists(id: string) {

        // Searches for the document using its ID
        if (!(await this.model.findById(id))) {

            // Throws a 404 error if the document does not exist
            throw new CustomError(httpStatus.NOT_FOUND, this.modelName + ' is not Found!');
        }
    }
}

export default BaseServices;