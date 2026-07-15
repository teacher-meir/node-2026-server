import express from 'express';
import productRouter from './routes/products.router.js';

// 1. יצירת שרת
const app = express();

// מאפשר לקבל באדי - אוביקט
app.use(express.json());

// 2. מה שקורה כשמגיעים לשרת
app.get('/', (req, res) => {
    res.send('Hello World');
});

// use - מתחיל בניתוב הנוכחי
app.use('/products', productRouter);

// 3. הרצת השרת בכתובת מסוימת
app.listen(5000, () => {
    // כשהשרת עולה בפעם הראשונה מגיע לכאן
    console.log('Server is running on http://localhost:5000');
});