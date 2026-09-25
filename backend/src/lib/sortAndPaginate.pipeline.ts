// Creates the sorting and pagination settings from the query parameters
const sortAndPaginatePipeline = (query: Record<string, unknown>) => {
    let page = 1;  // Sets the default page number to 1
    let limit = 10;  // Sets the default number of items per page to 10
    const sortBy = 'createdAt';  // Sorts the records using the date they were created
    let sortOrder: -1 | 1 = -1;  // Sets sorting to newest first; -1 = descending, 1 = ascending

    if(query.limit) {
         // Converts the limit query value into a number
        limit = Number(query.limit);
    }
    
    if (query.page) {
        // Converts the page query value into a number
        page = Number(query.page);
    }

    if(query.sortOrder) {
        // Sets descending order for "desc", otherwise ascending order
        sortOrder = query.sortOrder === 'desc' ? -1 : 1;
    }

    return [
        {
            // Sorts the records using the selected field and sort order
            $sort: {
                [sortBy]: sortOrder
            }
        },
        {
            $skip: (page - 1) * limit // Skip products from previous pages
        },
        {
        $limit: limit // Return only this many products
        }
    ];
};

// Exports the function so it can be used in other files
export default sortAndPaginatePipeline;