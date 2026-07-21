import { pool } from "../config/db.js";

export async function createCategory(
  name,
  type,
  userId = null,
  parentId = null,
  isDefault = false,
) {
  const result = await pool.query(
    `
      INSERT INTO categories (name, type, user_id, parent_id, is_default)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
    [name, type, userId, parentId, isDefault],
  );

  return result.rows[0];
}

export async function getCategories(userId = null) {
  const result = await pool.query(
    `
      SELECT *
      FROM categories
      WHERE is_default = true
         OR user_id = $1
         OR user_id IS NULL
      ORDER BY is_default DESC, id;
    `,
    [userId],
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

export async function updateCategory(
  id,
  name,
  type,
  userId = null,
  parentId = null,
  isDefault = false,
) {
  const result = await pool.query(
    `
      UPDATE categories
      SET name = $1,
          type = $2,
          user_id = $3,
          parent_id = $4,
          is_default = $5
      WHERE id = $6
      RETURNING *;
    `,
    [name, type, userId, parentId, isDefault, id],
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
