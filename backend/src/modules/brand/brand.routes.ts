import {Router} from 'express';
import verifyAuth from '../../middlewares/verifyAuth.js';
import validateRequest from '../../middlewares/validateRequest.js';
import brandValidator from './brand.validator.js';
import brandController from './brand.controllers.js';

// Creates a new router for brand routes
const brandRoutes = Router();

// Applies authentication middleware to all brand routes
brandRoutes.use(verifyAuth);

// Creates a new brand after validating the request body
brandRoutes.post('/', validateRequest(brandValidator.createSchema), brandController.create);

// Gets all brands for the logged-in user
brandRoutes.get('/', brandController.getAll);

// Deletes a brand using its ID from the URL
brandRoutes.delete('/:id', brandController.delete);

// Updates a brand after validating the request body
brandRoutes.patch('/:id', validateRequest(brandValidator.updateSchema), brandController.create);

export default brandRoutes; // Exports the brand router so it can be used by the main router
