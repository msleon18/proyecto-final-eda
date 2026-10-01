const express = require("express");
const router = express.Router();
const Grafo = require("../structures/Grafo");
const {
  guardarOperacion,
  obtenerHistorial,
} = require("../db/operacionesRepository");
const grafoActual = new Grafo();
router.get("/", (req, res) => {
  res.json(grafoActual.toJSON());
});
router.post("/nodo", async (req, res) => {
  try {
    const { nodo } = req.body;
    if (!nodo) {
      return res.status(400).json({ error: "Debes enviar un nombre de nodo" });
    }
    grafoActual.agregarNodo(nodo);
    const estadoActual = grafoActual.toJSON();
    await guardarOperacion("grafo", "agregar-nodo", String(nodo), estadoActual);
    res.json(estadoActual);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/arista", async (req, res) => {
  try {
    const { origen, destino } = req.body;
    if (!origen || !destino) {
      return res.status(400).json({ error: "Debes enviar origen y destino" });
    }
    grafoActual.agregarArista(origen, destino);
    const estadoActual = grafoActual.toJSON();
    await guardarOperacion(
      "grafo",
      "agregar-arista",
      `${origen}-${destino}`,
      estadoActual,
    );
    res.json(estadoActual);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/bfs/:inicio", (req, res) => {
  const recorrido = grafoActual.bfs(req.params.inicio);
  res.json({ recorrido });
});
router.get("/dfs/:inicio", (req, res) => {
  const recorrido = grafoActual.dfs(req.params.inicio);
  res.json({ recorrido });
});
router.get("/historial", async (req, res) => {
  try {
    const historial = await obtenerHistorial("grafo");
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
