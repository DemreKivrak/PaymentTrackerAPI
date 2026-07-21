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

export async function updateBalanceForTransaction(userId, type, amount) {
  await ensureBalanceForUser(userId);

  const sign = type === "income" ? 1 : -1;
  const amountValue = Number(amount);

  const result = await pool.query(
    `
      UPDATE balances
      SET current_balance = current_balance + $1,
          total_income = total_income + $2,
          total_expense = total_expense + $3
      WHERE user_id = $4
      RETURNING *;
    `,
    [
      sign * amountValue,
      type === "income" ? amountValue : 0,
      type === "expense" ? amountValue : 0,
      userId,
    ],
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
export async function ensureBalanceForUser(userId) {
  const existing = await pool.query(
    `SELECT * FROM balances WHERE user_id = $1;`,
    [userId],
  );

  if (existing.rows[0]) {
    return existing.rows[0];
  }

  const created = await pool.query(
    `
      INSERT INTO balances (user_id, current_balance, total_income, total_expense, debt_amount)
      VALUES ($1, 0, 0, 0, 0)
      RETURNING *;
    `,
    [userId],
  );

  return created.rows[0];
}
