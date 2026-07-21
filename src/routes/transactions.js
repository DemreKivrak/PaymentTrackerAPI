import express from "express";
import * as transactionController from "../controller/transaction.controller.js";

const router = express.Router();

router.get("/", transactionController.getTransactions);
router.post("/", transactionController.createTransaction);
router.get("/:id", transactionController.getTransactionById);
router.put("/:id", transactionController.updateTransaction);
router.delete("/:id", transactionController.deleteTransaction);

export default router;
