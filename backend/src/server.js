const express = require("express");
const cors = require("cors");
const pool = require("./db/connection");
const stackRoutes = require("./routes/stack.routes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/stack", stackRoutes);
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ status: "ok", db_time: result.rows[0].now });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
