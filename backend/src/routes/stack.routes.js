const express = require("express");
const router = express.Router();
const Stack = require("../structures/Stack");
const {
  guardarOperacion,
  obtenerHistorial,
} = require("../db/operacionesRepository");
const pilaActual = new Stack();
router.get("/", (req, res) => {
  res.json({ items: pilaActual.toArray() });
});
router.post("/push", async (req, res) => {
  try {
    const { valor } = req.body;
    if (valor === undefined || valor === "") {
      return res.status(400).json({ error: "Debes enviar un valor" });
    }
    pilaActual.push(valor);
    const estadoActual = pilaActual.toArray();
    await guardarOperacion("stack", "push", String(valor), estadoActual);
    res.json({ items: estadoActual });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/pop", async (req, res) => {
  try {
    const valorEliminado = pilaActual.pop();
    const estadoActual = pilaActual.toArray();
    await guardarOperacion(
      "stack",
      "pop",
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
    const historial = await obtenerHistorial("stack");
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
