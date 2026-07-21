import * as balanceRepository from "../repository/balances.repository.js";

export async function createBalance(req, res) {
  try {
    const { userId, currentBalance, totalIncome, totalExpense, debtAmount } =
      req.body;

    const balance = await balanceRepository.createBalance(
      userId,
      currentBalance,
      totalIncome,
      totalExpense,
      debtAmount,
    );

    res.status(201).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getBalances(req, res) {
  try {
    const balances = await balanceRepository.getBalances();

    res.status(200).json(balances);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getBalanceById(req, res) {
  try {
    const { id } = req.params;

    const balance = await balanceRepository.getBalanceById(id);

    if (!balance) {
      return res.status(404).json({ message: "Balance not found" });
    }

    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getBalanceByUserId(req, res) {
  try {
    const { userId } = req.params;

    const balance = await balanceRepository.getBalanceByUserId(userId);

    if (!balance) {
      return res
        .status(404)
        .json({ message: "Balance not found for this user" });
    }

    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateBalance(req, res) {
  try {
    const { id } = req.params;
    const { userId, currentBalance, totalIncome, totalExpense, debtAmount } =
      req.body;

    const balance = await balanceRepository.updateBalance(
      id,
      userId,
      currentBalance,
      totalIncome,
      totalExpense,
      debtAmount,
    );

    if (!balance) {
      return res.status(404).json({ message: "Balance not found" });
    }

    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteBalance(req, res) {
  try {
    const { id } = req.params;

    const balance = await balanceRepository.deleteBalance(id);

    if (!balance) {
      return res.status(404).json({ message: "Balance not found" });
    }

    res.status(200).json({
      message: "Balance deleted successfully",
      balance,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
