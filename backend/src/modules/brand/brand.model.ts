import { Schema, model } from 'mongoose';
import type { IBrand } from './brand.interface.js';

// Defines the MongoDB schema for a brand
const brandSchema = new Schema<IBrand>({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'user'},
    name: { type: String, required: true }
});

// Creates the Brand model using the brand schema
const Brand = model<IBrand>('brand', brandSchema);

// Exports the Brand model so it can be used in services
export default Brand;