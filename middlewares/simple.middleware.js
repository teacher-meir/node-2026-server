export const printHello = (req, res, next) => {
    // req - בקשה
    // res - תגובה
    // next - מעבר לפונקציה הבאה בשרשרת
    console.log(`hello from server ${req.method}`);
    next();
};

// middleware creator - יוצרת מידלוואר לפי פרמטרים
// פונקציית מעטפת
export const blockInDay = (days = []) => {// [1, 5, 7]
    // 1. הגדרת המידלוואר
    const mdl = (req, res, next) => {
        // days=[5,7]
        const now = new Date();

        if (!days.includes(now.getDay() + 1)) {// מתחיל מ-0
            // next בלי פרמטרים יעביר למידלוואר הבא
            // כדי לשלוח פרמטר לנקסט נשנה את הבקשה/תגובה
            req.isAdmin = true;
            req.currentDate1 = new Date();
            next();
        } else {
            res.status(500).json({ error: `האתר לא עובד ביום ${now.getDay() + 1}` })
        }
    };

    // 2. החזרת פונקציית המידלוואר
    return mdl;
};