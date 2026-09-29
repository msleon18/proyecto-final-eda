const express = require("express");
const router = express.Router();
const Queue = require("../structures/Queue");
const {
  guardarOperacion,
  obtenerHistorial,
} = require("../db/operacionesRepository");
const colaActual = new Queue();
router.get("/", (req, res) => {
  res.json({ items: colaActual.toArray() });
});
router.post("/enqueue", async (req, res) => {
  try {
    const { valor } = req.body;
    if (valor === undefined || valor === "") {
      return res.status(400).json({ error: "Debes enviar un valor" });
    }
    colaActual.enqueue(valor);
    const estadoActual = colaActual.toArray();
    await guardarOperacion("queue", "enqueue", String(valor), estadoActual);
    res.json({ items: estadoActual });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/dequeue", async (req, res) => {
  try {
    const valorEliminado = colaActual.dequeue();
    const estadoActual = colaActual.toArray();
    await guardarOperacion(
      "queue",
      "dequeue",
      String(valorEliminado),
      estadoActual,
    );
    res.json({ items: estadoActual, valorEliminado });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/historial", async (req, res) => {
  try {
    const historial = await obtenerHistorial("queue");
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
