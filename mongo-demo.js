import { connect, model, Schema } from 'mongoose';

// סכמה = תבנית
// רק שדות שנמצאים כאן יכולים להיכנס לדטהבייס
// מגדירים טיפוסים ומבצע המרה אוטומטית
// כל השדות אופציונאליים
// JOI בדיקות מורכבות נעשה עם
const productSchema = new Schema({
    // PK - _id - שם שמור
    // _id - אם לא מגדירים יוצר אוטומטית
    name: String,
    price: Number,
    type: [String],
});

// products מגדיר אוסף בשם
// שכל איבר בו מסוג הסכמה
// Product - מודל - מחלקה שניתן לגשת דרכה לאוסף המוצרים
const Product = model('products', productSchema);

const main = async () => {
    try {
        // 1. התחברות לדטהבייס
        await connect('mongodb://localhost:27017/storeDB');
        console.log('mongo connected succesfully');

        // שליפה של הנתונים
        const arr = await Product.find(); // select * from products
        console.log(arr.length);
    } catch (error) {
        console.log(error);
    }
};
main();