import * as transactionRepository from "../repository/transaction.repository.js";

export async function createTransaction(req, res) {
  try {
    const { userId, categoryId, type, amount, description, transactionDate } =
      req.body;

    const transaction = await transactionRepository.createTransaction(
      userId,
      categoryId,
      type,
      amount,
      description,
      transactionDate,
    );

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTransactions(req, res) {
  try {
    const transactions = await transactionRepository.getTransactions();

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getTransactionById(req, res) {
  try {
    const { id } = req.params;

    const transaction = await transactionRepository.getTransactionById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updateTransaction(req, res) {
  try {
    const { id } = req.params;
    const { userId, categoryId, type, amount, description, transactionDate } =
      req.body;

    const transaction = await transactionRepository.updateTransaction(
      id,
      userId,
      categoryId,
      type,
      amount,
      description,
      transactionDate,
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params;

    const transaction = await transactionRepository.deleteTransaction(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({
      message: "Transaction deleted successfully",
      transaction,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
