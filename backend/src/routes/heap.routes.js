const express = require("express");
const router = express.Router();
const MinHeap = require("../structures/MinHeap");
const {
  guardarOperacion,
  obtenerHistorial,
} = require("../db/operacionesRepository");
const heapActual = new MinHeap();
router.get("/", (req, res) => {
  res.json({ items: heapActual.toArray() });
});
router.post("/insertar", async (req, res) => {
  try {
    const { valor } = req.body;
    if (valor === undefined || valor === "") {
      return res.status(400).json({ error: "Debes enviar un valor" });
    }
    const valorNumerico = Number(valor);
    if (isNaN(valorNumerico)) {
      return res.status(400).json({ error: "El valor debe ser un numero" });
    }
    heapActual.insertar(valorNumerico);
    const estadoActual = heapActual.toArray();
    await guardarOperacion(
      "heap",
      "insertar",
      String(valorNumerico),
      estadoActual,
    );
    res.json({ items: estadoActual });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/extraer-minimo", async (req, res) => {
  try {
    const minimo = heapActual.extraerMinimo();
    const estadoActual = heapActual.toArray();
    await guardarOperacion(
      "heap",
      "extraer-minimo",
      String(minimo),
      estadoActual,
    );
    res.json({ items: estadoActual, minimo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get("/historial", async (req, res) => {
  try {
    const historial = await obtenerHistorial("heap");
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
