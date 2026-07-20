import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

// hash password
// verfiy password

// register user - add user
export const register = async (req, res, next) => {
    try {
        // הצפנת הסיסמא
        const hashPassword = await bcrypt.hash(req.body.password, 12);
        // שמירה בדטהבייס
        const user = new User({
            ...req.body, // אמור לעבור ולידציה
            password: hashPassword
        });
        await user.save();
        
        res.json(user);
    } catch (error) {
        next({ status: 500, error: err, type: 'server error' });
    }
};


// login user
export const login = async (req, res, next) => {
    try {

    } catch (error) {
    }
};