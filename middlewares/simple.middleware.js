export const printHello = (req, res, next) => {
    // req - בקשה
    // res - תגובה
    // next - מעבר לפונקציה הבאה בשרשרת
    console.log(`hello from server ${req.method}`);
    next();
};

export const blockInDay = (req, res, next) => {
    const now = new Date();

    if (now.getDay() !== 6) {// מתחיל מ-0
        // next בלי פרמטרים יעביר למידלוואר הבא
        // כדי לשלוח פרמטר לנקסט נשנה את הבקשה/תגובה
        req.isAdmin = true;
        req.currentDate1 = new Date();
        next();
    } else {
        res.status(500).json({ error: 'האתר לא עובד ביום רביעי' })
    }
};