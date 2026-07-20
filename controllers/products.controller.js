import { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";

// CRUD
// Create
// Read
// Update
// Delete

export const getAllProducts = async (req, res, next) => {
    try {
        // req.params - פרמטר חובה מזהה משאב - פרמטרים עם סלש

        // req.query  - פרמטר אופציונלי - פרמטרים עם סימן שאלה
        // sort/search/pagintation

        const { search = '', page = 1, perPage = 5 } = req.query;

        // RegExp - LIKE ביטוי רגולרי, כלומר חיפוש לפי תבנית כמו
        // i - התעלמות מגודל האות
        const result = await Product.find({ name: new RegExp(search, 'i')/*, price: { $gt: 100 } */})
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.json(result);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const addProduct = async (req, res, next) => {
    try {
        console.log(req.isAdmin ? 'admin' : 'user');
        // guard in case middleware didn't set req.currentDate1
        if (req.currentDate1 instanceof Date) {
            console.log((new Date()).getMilliseconds() - req.currentDate1.getMilliseconds());
        }

        // תמיד נבצע בדיקות תקינות
        // 1. JS יצירת אוביקט
        const newP = new Product(req.body);
        // 2. DB-שמירת האוביקט ב
        await newP.save();

        res.status(201).json(newP);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next({
                error: new Error('product not found'),
                type: 'resource not found error',
                status: 404
            });
        }

        const p = await Product.findByIdAndUpdate(
            id,
            {
                $set: req.body, // add/update field
                $unset: { price: true }, // delete field
                // $push: { type: ['aaaa'] }, // הוספה לסוף מערך פנימי
                $addToSet: { type: ['aaaa'] }, // הוספה לסוף מערך פנימי ללא כפולים
            },
            { new: true } // החזרת האוביקט לאחר העדכון
        );

        if (!p) {
            return next({
                error: new Error('product not found'),
                type: 'resource not found error',
                status: 404,
            });
        }

        // productsArr[productI] = req.body;
        res.json(p);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const idx = req.params.idx;

        // חובה לבדוק אם האיי-די חוקי
        // ורק אז להפעיל שאילתות
        if (!isValidObjectId(idx)) {
            return next({
                error: new Error('product not found'),
                type: 'resource not found error',
                status: 404
            });
        }

        const p = await Product.findByIdAndDelete(idx);

        if (p) {
            return res.status(204).send();
        }

        return next({
            error: new Error('product not found'),
            type: 'resource not found error',
            status: 404
        });
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};
