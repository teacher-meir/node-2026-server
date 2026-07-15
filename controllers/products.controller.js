let productsArr = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
    { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
    { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard' }
];

export const getAllProducts = (req, res, next) => {
    // req.params - פרמטר חובה מזהה משאב - פרמטרים עם סלש

    // req.query  - פרמטר אופציונלי - פרמטרים עם סימן שאלה
    // sort/search/pagintation

    const { search = '', page } = req.query;
    // const search = req.query.search;

    console.log(req.query);

    // if (!page) {
    //     res.status(400).json('חסר עמוד');
    // }
    // else {
    const result = productsArr.filter(p => p.name.includes(search));

    res.json(result);
    // }
};

export const addProduct = (req, res, next) => {
    if (req.body?.name) {
        console.log('from addProduct');
        console.log(req.isAdmin ? 'admin' : 'user');
        console.log((new Date()).getMilliseconds() - req.currentDate1.getMilliseconds());        


        req.body.id = Math.floor(Math.random() * 100); // באמת יתווסף בדטהבייס אוטומטית
        productsArr.push(req.body);
        res.status(201).json(req.body);
    } else {
        res.status(409).json({ error: 'name is required' });
    }
};

export const updateProduct = (req, res, next) => {
    const { id } = req.params;

    // אינדקס של מוצר מתוך המערך
    const productI = productsArr.findIndex(p => p.id === +id);

    if (productI === -1) {
        res.status(404).json({ error: 'product not found' });
    } else {
        productsArr[productI] = req.body;
        res.json(productsArr[productI]);
    }
};

export const deleteProduct = (req, res, next) => {
    if (productsArr.some(p => p.id == req.params.idx)) {
        productsArr = productsArr.filter(p => p.id !== +req.params.idx);
        res.status(204).send();
    } else {
        // res.statusCode = 404; // node:http
        res.status(404).json({ error: 'product not found' });
    }
};
