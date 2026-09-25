import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import CustomError from '../errors/customError.js';
import httpStatus from 'http-status';
import config from '../config/index.js';

// Middleware that checks whether the request contains a valid JWT
const verifyAuth: RequestHandler = (req, _res, next) => {

    // Gets the Authorization header from the incoming request
    const bearerToken = req.headers.authorization;

    // Checks that an Authorization header was provided
    if(bearerToken) {

        // Gets the token part from the Authorization header
        const token = bearerToken.split(' ')[1]; // Splits "Bearer token" and gets the token part

        // Checks that a token was found
        if(token) {
            try {
                // Verifies the token using the JWT secret and decodes its data
                const decode = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

                // Adds the logged-in user's details to the Express request
                req.user = {
                    _id: decode?._id,
                    email: decode?.email
                };

                next(); // Continues to the next middleware or route
                
            } catch (error) {

                // Throws an unauthorized error if the token is invalid or expired
                throw new CustomError(httpStatus.UNAUTHORIZED, 'Unauthorize! Please login', 'Unauthorize');
            }
        } else {
            // Throws an unauthorized error if no token was found
            throw new CustomError(httpStatus.UNAUTHORIZED, 'Unauthorize! Please login', 'Unauthorize');
        } 
    } else {
         // Throws an unauthorized error if there is no Authorization header
        throw new CustomError(httpStatus.UNAUTHORIZED, 'Unauthorize! Please login', 'Unauthorize');
    }
};

export default verifyAuth; // Exports the authentication middleware for use in protected routes
