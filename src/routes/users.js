import express from "express";
import * as userController from "../controller/user.controller.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/me", authenticateToken, userController.getMe);
router.put("/me", authenticateToken, userController.updateMe);

router.get("/", authenticateToken, userController.getUsers);
router.get("/:id", authenticateToken, userController.getUserById);
router.put("/:id", authenticateToken, userController.updateUser);
router.delete("/:id", authenticateToken, userController.deleteUser);

export default router;
