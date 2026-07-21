import express from "express";
import * as balanceController from "../controller/balance.controller.js";

const router = express.Router();

router.get("/", balanceController.getBalances);
router.post("/", balanceController.createBalance);
router.get("/:id", balanceController.getBalanceById);
router.put("/:id", balanceController.updateBalance);
router.delete("/:id", balanceController.deleteBalance);

export default router;
