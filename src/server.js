import express from "express";
import userRouter from "./routes/users.js";
import categoryRouter from "./routes/categories.js";
import transactionRouter from "./routes/transactions.js";
import balanceRouter from "./routes/balances.js";
import { connectDB } from "./config/db.js";
import { runMigrations } from "./migrations/runMigrations.js";
import dotenv from "dotenv";

dotenv.config({ path: new URL(".env", import.meta.url) });

const app = express();
const PORT = 5000;

await connectDB();
await runMigrations();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());
app.use(express.static("frontend-test"));

app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);
app.use("/balances", balanceRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
