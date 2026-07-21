import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDB = async () => {
  try {
    const client = await pool.connect();

    console.log("Database connected");

    client.release(); // Bağlantıyı pool'a geri bırak
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  await pool.end();
};

export { pool, connectDB, disconnectDB };
