import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import categoryValidator from './category.validator.js';
import categoryController from './category.controller.js';

// Creates a new router for category routes
const CategoryRoutes = Router();

// Applies authentication middleware to all category routes
CategoryRoutes.use(verifyAuth);

// Creates a new category after validating the request body
CategoryRoutes.post('/', validateRequest(categoryValidator.createSchema), categoryController.create); 

// Gets all categories for the logged-in user
CategoryRoutes.get('/', categoryController.getAll);

// Deletes a category using its ID from the URL
CategoryRoutes.delete('/:id', categoryController.delete);

// Updates a category after validating the request body
CategoryRoutes.patch('/:id', validateRequest(categoryValidator.updateSchema), categoryController.update);

// Exports the category router so it can be used by the main router
export default CategoryRoutes;



