// Import Router from Express to create the purchase routes
import { Router } from 'express';

// Middleware that checks if the user is authenticated
import verifyAuth from '../../middlewares/verifyAuth.js';

// Middleware that validates request data using a Zod schema
import validateRequest from '../../middlewares/validateRequest.js';

// Import the purchase controller containing the route logic
import purchaseController from './purchase.controller.js';

// Import the purchase validation schemas
import purchaseValidator from './purchase.validator.js';

// Create a new router for purchase endpoints
const PurchaseRoutes = Router();

// Require authentication for all purchase routes below
PurchaseRoutes.use(verifyAuth);

// CREATE
// Validate the request body and create a new purchase
PurchaseRoutes.post('/', validateRequest(purchaseValidator.createSchema), purchaseController.create);

// READ
// Get all purchases for the logged-in user
PurchaseRoutes.get('/', purchaseController.getAll);

// DELETE
// Delete a purchase using its ID
PurchaseRoutes.delete('/:id', purchaseController.delete);

// UPDATE
// Validate the request body and update a purchase using its ID
PurchaseRoutes.patch('/:id', validateRequest(purchaseValidator.updateSchema), purchaseController.create);

// Export the router so it can be added to the main router
export default PurchaseRoutes;