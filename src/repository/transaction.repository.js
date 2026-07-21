import { pool } from "../config/db.js";
import * as balanceRepository from "./balances.repository.js";

export async function createTransaction(
  userId,
  categoryId,
  type,
  amount,
  description,
  transactionDate,
) {
  const result = await pool.query(
    `INSERT INTO transactions (user_id, category_id, type, amount, description, transaction_date)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *;`,
    [userId, categoryId, type, amount, description, transactionDate],
  );

  await balanceRepository.updateBalanceForTransaction(userId, type, amount);

  return result.rows[0];
}

export async function getTransactions() {
  const result = await pool.query(
    `
      SELECT *
      FROM transactions
      ORDER BY id;
    `,
  );

  return result.rows;
}

export async function getTransactionById(id) {
  const result = await pool.query(
    `
      SELECT *
      FROM transactions
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
}

export async function updateTransaction(
  id,
  userId,
  categoryId,
  type,
  amount,
  description,
  transactionDate,
) {
  const result = await pool.query(
    `
      UPDATE transactions
      SET user_id = $1,
          category_id = $2,
          type = $3,
          amount = $4,
          description = $5,
          transaction_date = $6
      WHERE id = $7
      RETURNING *;
    `,
    [userId, categoryId, type, amount, description, transactionDate, id],
  );

  return result.rows[0];
}

export async function deleteTransaction(id) {
  const result = await pool.query(
    `
      DELETE FROM transactions
      WHERE id = $1
      RETURNING *;
    `,
    [id],
  );

  return result.rows[0];
}
