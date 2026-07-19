// סכמה = תבנית
// רק שדות שנמצאים כאן יכולים להיכנס לדטהבייס
// מגדירים טיפוסים ומבצע המרה אוטומטית
// כל השדות אופציונאליים

import { model, Schema } from "mongoose";

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
export const Product = model('products', productSchema);