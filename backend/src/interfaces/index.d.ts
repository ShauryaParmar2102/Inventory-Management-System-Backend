import { JwtPayload } from "jsonwebtoken"; // Imports the JWT payload type used for decoded authentication datas

declare global {
    // Extends the existing Express namespace with your own custom types
    namespace Express {

        // Adds a custom user property to every Express Request object
        interface Request {
            user: JwtPayload; // Stores the decoded JWT user information on the request
        }
    }
}