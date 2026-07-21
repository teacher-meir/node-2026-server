import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

/**
 * 
 * @param {import('express').Request} req 
 * @param {*} res 
 * @param {*} next 
 */
export const auth = (req, res, next) => {
    // url, body, headers
    // Bearer ............
    try {
        const token = req.headers.authorization.split(' ')[1];
        const userData = jwt.verify(token, env.JWT_SECRET_KEY);
        req.myUser = userData;
        next();
    } catch (error) {
        next({ status: 401, error: new Error('no token') });
    }
};

export const authAdmin = (req, res, next) => {    
    if (req.myUser.userRole === "admin") {
        return next();
    }
    next({ status: 403, error: new Error('no admin') });
};