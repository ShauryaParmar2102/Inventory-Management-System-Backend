// Import Router from Express to create the main/root router
import { Router } from 'express';

// Import the routes for each module
import userRoutes from '../modules/user/user.routes.js';
import productRoute from '../modules/product/product.routes.js';
import saleRoutes from '../modules/sales/sale.routes.js';
import categoryRoutes from '../modules/category/category.routes.js';
import brandRoutes from '../modules/brand/brand.routes.js';
import sellerRoutes from '../modules/seller/seller.routes.js';
import purchaseRoutes from '../modules/purchase/purchase.routes.js';

const rootRouter = Router(); // Create the main router for the application

// USER ROUTES
// Requests starting with /users will be handled by user.routes.ts
rootRouter.use('/users', userRoutes);

// PRODUCT ROUTES
// Requests starting with /products will be handled by product.routes.ts
rootRouter.use('/products', productRoute);


// SALES ROUTES
// Requests starting with /sales will be handled by sale.routes.ts
rootRouter.use('/sales', saleRoutes);

// CATEGORY ROUTES
// Requests starting with /categories will be handled by category.routes.ts
rootRouter.use('/categories', categoryRoutes);

// BRAND ROUTES
// Requests starting with /brands will be handled by brand.routes.ts
rootRouter.use('/brands', brandRoutes);

// SELLER ROUTES
// Requests starting with /sellers will be handled by seller.routes.ts
rootRouter.use('/sellers', sellerRoutes);

// PURCHASE ROUTES
// Requests starting with /purchases will be handled by purchase.routes.ts
rootRouter.use('/purchases', purchaseRoutes);
 
export default rootRouter; // Export the root router so it can be used in app.ts