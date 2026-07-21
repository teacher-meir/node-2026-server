import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import productRouter from './routes/products.router.js';
import userRouter from './routes/users.router.js';
import { blockInDay } from './middlewares/simple.middleware.js';
import { errorHandler } from './middlewares/error.middleware.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

// 1. יצירת שרת
const app = express();
console.log('teacher pt!!!!!!!!!!!');

// התחברות לדטהבייס
connectDB();

// תוספת הרשאה לקליינט ספציפי
app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// מאפשר לקבל באדי
app.use(express.json()); // מאפשר לקבל באדי - אוביקט
app.use(express.urlencoded({ extended: true })); // מאפשר לקבל קבצים - פורמט של טפסים

app.use(blockInDay([4, 7]));

app.use(express.static('public'));

app.use(morgan('dev'));

// 2. מה שקורה כשמגיעים לשרת
app.get('/', (req, res) => {
    res.send('Hello World');
});

// use - מתחיל בניתוב הנוכחי
app.use('/products',/*blockInDay,*/ productRouter);
app.use('/users',userRouter);

// נחבר את המידלוואר לכל השרת בסוף הקוד
app.use(errorHandler);

// 3. הרצת השרת בכתובת מסוימת
app.listen(env.PORT, () => {
    // כשהשרת עולה בפעם הראשונה מגיע לכאן
    console.log('Server is running on http://localhost:4000');
});
