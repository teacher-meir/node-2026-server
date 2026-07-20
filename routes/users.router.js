import { Router } from "express";
import { getAllUsers, register, login } from '../controllers/users.controller.js';

const router = Router();

router.get("/", getAllUsers);

// register user - add user
router.post("/", register);

// login user
router.post("/login", login);

export default router;