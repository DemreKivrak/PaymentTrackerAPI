import { pool } from "../config/db.js";

export async function createCategory(name, type) {
  const result = await pool.query(
    `
      INSERT INTO categories (name, type)
      VALUES ($1, $2)
      RETURNING *;
    `,
    [name, type],
  );

  return result.rows[0];
}

export async function getCategories() {
  const result = await pool.query(
    `
      SELECT *
      FROM categories
      ORDER BY id;
    `,
  );

  return result.rows;
}

export async function getCategoryById(id) {
  const result = await pool.query(
    `
      SELECT *
      FROM categories
      WHERE id = $1;
    `,
    [id],
  );

  return result.rows[0];
}

export async function updateCategory(id, name, type) {
  const result = await pool.query(
    `
      UPDATE categories
      SET name = $1,
          type = $2
      WHERE id = $3
      RETURNING *;
    `,
    [name, type, id],
  );

  return result.rows[0];
}

export async function deleteCategory(id) {
  const result = await pool.query(
    `
      DELETE FROM categories
      WHERE id = $1
      RETURNING *;
    `,
    [id],
  );

  return result.rows[0];
}
