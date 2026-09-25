import { Router } from 'express'; // Import Router from Express to create the seller routes
import validateRequest from '../../middlewares/validateRequest.js'; // Middleware used to validate request data

import verifyAuth from '../../middlewares/verifyAuth.js'; // Middleware used to make sure the user is logged in/authenticated

import sellerValidator from './seller.validator.js'; // Import the validation schemas for creating and updating sellers

import sellerControllers from './seller.controllers.js'; // Import the controller functions that handle seller requests

// Create a new Express router for seller routes
const sellerRoutes = Router();

// Require authentication for all seller routes below this line
sellerRoutes.use(verifyAuth);

// CREATE SELLER
// Validate the request body and then create a new seller
sellerRoutes.post('/', validateRequest(sellerValidator.createSchema), sellerControllers.create);

// GET ALL SELLERS
// Retrieve all sellers belonging to the logged-in user
sellerRoutes.get('/', sellerControllers.readAll);

// UPDATE SELLER
// Validate the request body and update a seller using its ID
sellerRoutes.patch('/:id', validateRequest(sellerValidator.updateSchema), sellerControllers.update);

// GET SINGLE SELLER
// Retrieve one seller using the ID from the URL
sellerRoutes.get('/:id', sellerControllers.readSingle);

// DELETE SELLER
// Delete a seller using the ID from the URL
sellerRoutes.delete('/:id', sellerControllers.delete);

// Export the seller routes so they can be added to the main router
export default sellerRoutes;