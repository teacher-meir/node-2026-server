import { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: String,  
    password: String,
    address: {
        city: String,
        street: String,
        houseNumber: Number
    },
    role: String
});

export const User = model('users', userSchema);