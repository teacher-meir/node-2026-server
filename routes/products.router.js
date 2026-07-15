import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/products.controller.js";
import { blockInDay, printHello } from "../middlewares/simple.middleware.js";

// כאן יהיו כל הניתובים של משאב מסוים
const router = Router();

// router.use(blockInDay);

// req.query.search
router.get('/', getAllProducts);

router.post('/', printHello, addProduct);

// req.params.id
router.put('/:id', printHello, updateProduct);

router.delete('/:idx', deleteProduct);

export default router;