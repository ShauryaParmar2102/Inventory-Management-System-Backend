import {Types} from 'mongoose';

// Builds the MongoDB match stage used to filter products
const matchStagePipeline = (query: Record<string, unknown>, userId: string) => {
    let minPrice = 0; // Default minimum price
    let maxPrice = Number.MAX_VALUE; // Default maximum price

    // Uses the minimum price from the query if one was provided
    if(query.minPrice) {
        minPrice = Number(query.minPrice);
    }

    // Uses the maximum price from the query if one was provided
    if(query.maxPrice) {
        maxPrice = Number(query.maxPrice);
    }

    // Stores all filter conditions that will be used in the $match stage
    const fieldQuery: any = [
        { user: new Types.ObjectId(userId)}, // Only gets products that belong to the logged-in user
        {price: { $gte: minPrice, $lte: maxPrice } }]; // Filters products between the minimum and maximum price

        // Adds a product name filter if a name was provided
    if(query.name) {

        // Searches product names without caring about uppercase/lowercase letters
        fieldQuery.push({ name: 
            {$regex: new RegExp(query.name as string, 'i') 
            } 
        } );
    }

       // Adds a category filter if a category was provided
    if(query.category) {

        // Checks whether the category value is a valid MongoDB ObjectId
        const isValidId = Types.ObjectId.isValid(query.category as string); 

        // Only adds the category filter if the ID is valid
        if (isValidId) {
            fieldQuery.push({ category: { $eq: new Types.ObjectId(query.category as string) } });
        }
    }

    // Returns the MongoDB aggregation match stage
    return [
        {
            $match: {
                // Requires all filter conditions to match
                $and: [...fieldQuery]
            }
        }
    ];
};

export default matchStagePipeline;

