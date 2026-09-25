import BaseServices from '../baseServices.js'; // Imports the reusable base service class
import Brand from './brand.model.js'; // Imports the Brand Mongoose model

// Service class that contains brand-related database logic
class BrandServices extends BaseServices<any> {

    // Passes the model and model name to the base service class
    constructor(model: any, modelName: string) {
        super(model, modelName);
    }

    // Gets all brands that belong to a specific user
    async getAll(userId: string) {

        // Finds all brand documents where the user field matches the given user ID
        return this.model.find({ user: userId });
    }
}

// Creates an instance of the BrandServices class using the Brand model
const brandServices = new BrandServices(Brand, 'Brand');

// Exports the service instance so controllers can use it
export default brandServices;