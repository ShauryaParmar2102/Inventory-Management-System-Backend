
import type { Server } from 'http';
import mongoose from 'mongoose';

// Import your Express application
import app from './app.js';

// Import your environment configuration
import config from './config/index.js';

// Store the running HTTP server
let server: Server;

// Connect to MongoDB and start the backend
async function main() {
    try {
        // Connect to MongoDB using DATABASE_URL from .env
        await mongoose.connect(config.database_url as string);

        console.log('MongoDB connected successfully');

        // Start the Express server on the configured port
        server = app.listen(config.port, () => {
            console.log(`Server running at http://localhost:${config.port}`);
        });

    } catch (err) {
        // Display any errors that occur during startup
        console.log(err);
        process.exit(1);
    }
}

// Run the main function
main();

// Handle rejected promises that were not caught
process.on('unhandledRejection', (err) => {
    console.log('Unhandled rejection detected, shutting down...', err);

    // Close the HTTP server before exiting
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Handle unexpected errors that were not caught
process.on('uncaughtException', (err) => {
    console.log('Uncaught exception detected, shutting down...', err);
    process.exit(1);
});