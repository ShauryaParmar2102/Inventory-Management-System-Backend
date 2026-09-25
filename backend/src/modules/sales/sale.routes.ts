import { Router } from 'express'; // Import Router from Express to create the sale routes
import validateRequest from '../../middlewares/validateRequest.js'; // Middleware used to validate request data
import verifyAuth from '../../middlewares/verifyAuth.js'; // Middleware used to make sure the user is authenticated
import saleValidator from './sales.validator.js'; // Import the validation schemas for sales
import saleControllers from './sale.controllers.js'; // Import the sale controller functions

const saleRoutes = Router(); // Create a new router for sale-related routes


saleRoutes.use(verifyAuth); // Require authentication for all sale routes below

// ==================== SALE ROUTES ====================

saleRoutes.get('/days', saleControllers.readAllDaily); // Get daily sales data

saleRoutes.get('/years', saleControllers.readAllYearly); // Get yearly sales data

saleRoutes.get('/months', saleControllers.readAllMonths); // Get monthly sales data

saleRoutes.get('/weeks', saleControllers.readAllWeeks); // Get weekly sales data

saleRoutes.post('/', validateRequest(saleValidator.createSchema), saleControllers.create); // Create a new sale

saleRoutes.get('/', saleControllers.readAll); // Get all sales

saleRoutes.patch('/:id', validateRequest(saleValidator.updateSchema), saleControllers.update); // Update a sale

saleRoutes.get('/:id', saleControllers.readSingle); // Get a single sale

saleRoutes.delete('/:id', saleControllers.delete); // Delete a sale

export default saleRoutes; // Export the sale routes so they can be used in the main application router
