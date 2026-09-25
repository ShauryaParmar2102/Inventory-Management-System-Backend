const castError = () => {
    // Returns a simple error object when an invalid MongoDB document ID is provided
    return {_id: 'Request ID is Invalid'};
};

export default castError;  // Exports the function so it can be used in other files