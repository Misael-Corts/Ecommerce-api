import app from "./app";
import { pool } from "../src/config/db";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


pool.connect()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("DB connection error", err));