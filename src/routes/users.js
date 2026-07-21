import express from "express";
import * as userController from "../controller/user.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "users table test" });
});

router.post("/", userController.createUser);

router.get("/", userController.getUsers);

router.get("/:id", userController.getUserById);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export default router;
