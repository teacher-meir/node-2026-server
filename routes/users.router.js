import { Router } from "express";
import { getAllUsers, register, login } from '../controllers/users.controller.js';
import {auth, authAdmin} from '../middlewares/auth.middleware.js';

const router = Router();

router.get("/", auth, authAdmin, getAllUsers);

// register user - add user
router.post("/", register);

// login user
router.post("/login", login);

export default router;