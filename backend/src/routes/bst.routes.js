const express = require("express");
const router = express.Router();
const ArbolBinarioBusqueda = require("../structures/ArbolBinarioBusqueda");
const {
  guardarOperacion,
  obtenerHistorial,
} = require("../db/operacionesRepository");
const arbolActual = new ArbolBinarioBusqueda();
router.get("/", (req, res) => {
  res.json({ arbol: arbolActual.toJSON() });
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
    arbolActual.insertar(valorNumerico);
    const estadoActual = arbolActual.toJSON();
    await guardarOperacion(
      "bst",
      "insertar",
      String(valorNumerico),
      estadoActual,
    );
    res.json({ arbol: estadoActual });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/buscar/:valor", (req, res) => {
  const valorNumerico = Number(req.params.valor);
  const encontrado = arbolActual.buscar(valorNumerico);
  res.json({ encontrado });
});
router.get("/historial", async (req, res) => {
  try {
    const historial = await obtenerHistorial("bst");
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
