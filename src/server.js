import express from "express";
import userRouter from "./routes/users.js";
import categoryRouter from "./routes/categories.js";
import transactionRouter from "./routes/transactions.js";
import balanceRouter from "./routes/balances.js";
import { connectDB } from "./config/db.js";
import { runMigrations } from "./migrations/runMigrations.js";

const app = express();
const PORT = 5000;

await connectDB();
await runMigrations();

app.use(express.json());

//API Routes
app.use("/users", userRouter);
app.use("/categories", categoryRouter);
app.use("/transactions", transactionRouter);
app.use("/balances", balanceRouter);

app.listen(PORT, () => {
  console.log("server running");
});
