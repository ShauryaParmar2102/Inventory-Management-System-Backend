import BaseServices from '../baseServices.js';
import Category from './category.model.js';

// Service class for category-related database logic
class CategoryServices extends BaseServices<any> {

    // Passes the model and model name to BaseServices
    constructor(model: any, modelName: string) {
        super(model, modelName);
    }

      // Gets all categories that belong to a specific user
    async getAll(userId: string) {

        // Finds categories where the user field matches the logged-in user's ID
        return this.model.find({user: userId});
    }
}

// Creates an instance of the CategoryServices class
const categoryServices = new CategoryServices(Category, 'Category');

// Exports the service so the controller can use it
export default categoryServices;

