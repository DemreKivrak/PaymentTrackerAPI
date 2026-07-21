import { pool } from "../config/db.js";

export async function createUser(username, email, password) {
  const result = await pool.query(
    `
        INSERT INTO users (username, email, password)
        VALUES ($1, $2, $3)
        RETURNING *;
        `,
    [username, email, password],
  );

  return result.rows[0];
}

export async function getUsers() {
  const result = await pool.query(
    `
        SELECT *
        FROM users
        ORDER BY id;
        `,
  );

  return result.rows;
}

export async function getUserById(id) {
  const result = await pool.query(
    `
        SELECT *
        FROM users
        WHERE id = $1;
        `,
    [id],
  );

  return result.rows[0];
}

export async function updateUser(id, username, email) {
  const result = await pool.query(
    `
        UPDATE users
        SET
            username = $1,
            email = $2
        WHERE id = $3
        RETURNING *;
        `,
    [username, email, id],
  );

  return result.rows[0];
}

export async function deleteUser(id) {
  const result = await pool.query(
    `
        DELETE FROM users
        WHERE id = $1
        RETURNING *;
        `,
    [id],
  );

  return result.rows[0];
}
