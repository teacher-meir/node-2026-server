import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/products.controller.js";

// כאן יהיו כל הניתובים של משאב מסוים
const router = Router();

// req.query.search
router.get('/', getAllProducts);

router.post('/', addProduct);

// req.params.id
router.put('/:id', updateProduct);

router.delete('/:idx', deleteProduct);

export default router;