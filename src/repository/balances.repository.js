import { pool } from "../config/db.js";

export async function createBalance(
  userId,
  currentBalance = 0,
  totalIncome = 0,
  totalExpense = 0,
  debtAmount = 0,
) {
  const result = await pool.query(
    `
      INSERT INTO balances (user_id, current_balance, total_income, total_expense, debt_amount)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
    [userId, currentBalance, totalIncome, totalExpense, debtAmount],
  );

  return result.rows[0];
}

export async function getBalances() {
  const result = await pool.query(
    `
      SELECT *
      FROM balances
      ORDER BY id;
    `,
  );

  return result.rows;
}

export async function getBalanceById(id) {
  const result = await pool.query(
    `
      SELECT *
      FROM balances
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
}

export async function getBalanceByUserId(userId) {
  const result = await pool.query(
    `
      SELECT *
      FROM balances
      WHERE user_id = $1;
    `,
    [userId],
  );

  return result.rows[0];
}

export async function updateBalance(
  id,
  userId,
  currentBalance,
  totalIncome,
  totalExpense,
  debtAmount,
) {
  const result = await pool.query(
    `
      UPDATE balances
      SET user_id = $1,
          current_balance = $2,
          total_income = $3,
          total_expense = $4,
          debt_amount = $5
      WHERE id = $6
      RETURNING *;
    `,
    [userId, currentBalance, totalIncome, totalExpense, debtAmount, id],
  );

  return result.rows[0];
}

export async function deleteBalance(id) {
  const result = await pool.query(
    `
      DELETE FROM balances
      WHERE id = $1
      RETURNING *;
    `,
    [id],
  );

  return result.rows[0];
}
