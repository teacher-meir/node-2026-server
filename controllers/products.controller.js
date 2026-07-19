import { Product } from "../models/product.model.js";

let productsArr = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
    { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
    { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard' }
];

export const getAllProducts = async (req, res, next) => {
    try {
        // req.params - פרמטר חובה מזהה משאב - פרמטרים עם סלש

        // req.query  - פרמטר אופציונלי - פרמטרים עם סימן שאלה
        // sort/search/pagintation

        // const { search = '', page } = req.query;

        const result = await Product.find();

        res.json(result);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const addProduct = (req, res, next) => {
    try {
        if (!req.body?.name) {
            return next({
                status: 409,
                error: new Error('name is required'),
                type: 'validation error'
            });
        }

        console.log('from addProduct');
        console.log(req.isAdmin ? 'admin' : 'user');
        // guard in case middleware didn't set req.currentDate1
        if (req.currentDate1 instanceof Date) {
            console.log((new Date()).getMilliseconds() - req.currentDate1.getMilliseconds());
        }

        req.body.id = Math.floor(Math.random() * 100); // באמת יתווסף בדטהבייס אוטומטית
        productsArr.push(req.body);
        res.status(201).json(req.body);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const updateProduct = (req, res, next) => {
    try {
        const { id } = req.params;

        // אינדקס של מוצר מתוך המערך
        const productI = productsArr.findIndex(p => p.id === +id);

        if (productI === -1) {
            return next({
                error: new Error('product not found'),
                type: 'resource not found error',
                status: 404,
            });
        }

        productsArr[productI] = req.body;
        res.json(productsArr[productI]);
    } catch (err) {
        next({ status: 500, error: err, type: 'server error' });
    }
};

export const deleteProduct = (req, res, next) => {
    try {
        const idx = +req.params.idx;
        if (productsArr.some(p => p.id === idx)) {
            productsArr = productsArr.filter(p => p.id !== idx);
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
