import express from 'express';

// 1. יצירת שרת
const app = express();

// מאפשר לקבל באדי - אוביקט
app.use(express.json());

// 2. מה שקורה כשמגיעים לשרת
app.get('/', (req, res) => {
    res.send('Hello World');
});

let productsArr = [
    { id: 1, name: 'Laptop', price: 999.99, description: 'High-performance laptop' },
    { id: 2, name: 'Mouse', price: 29.99, description: 'Wireless mouse' },
    { id: 3, name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard' }
];

app.get('/products', (req, res) => {
    res.send(productsArr);
});

app.post('/products', (req, res) => {
    productsArr.push(req.body);
    res.send('success');
});

app.put('/products/:id', (req, res) => {

});

app.delete('/products/:idx', (req, res) => {
    productsArr = productsArr.filter(p => p.id != req.params.idx);
    res.send('success');
});

// 3. הרצת השרת בכתובת מסוימת
app.listen(5000, () => {
    // כשהשרת עולה בפעם הראשונה מגיע לכאן
    console.log('Server is running on http://localhost:5000');
});