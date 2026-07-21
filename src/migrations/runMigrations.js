import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { pool } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations() {
  const files = await fs.readdir(__dirname);

  const migrationFiles = files.filter((file) => file.endsWith(".sql")).sort();

  for (const file of migrationFiles) {
    console.log(`Running migration: ${file}`);

    const sql = await fs.readFile(path.join(__dirname, file), "utf8");

    await pool.query(sql);
  }

  console.log("All migrations completed.");
}
