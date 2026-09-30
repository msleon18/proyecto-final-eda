import { useState, useEffect } from "react";
import {
  obtenerEstado,
  insertarValor,
  extraerMinimo,
} from "../../services/heapApi";
function construirNiveles(items) {
  const niveles = [];
  let inicio = 0;
  let tamanioNivel = 1;
  while (inicio < items.length) {
    niveles.push(items.slice(inicio, inicio + tamanioNivel));
    inicio += tamanioNivel;
    tamanioNivel *= 2;
  }
  return niveles;
}
function HeapVisualizer() {
  const [items, setItems] = useState([]);
  const [valorInput, setValorInput] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    cargarEstado();
  }, []);
  async function cargarEstado() {
    try {
      const estado = await obtenerEstado();
      setItems(estado);
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  }
  async function manejarInsertar() {
    if (!valorInput.trim()) return;
    setCargando(true);
    setError("");
    try {
      const nuevoEstado = await insertarValor(valorInput);
      setItems(nuevoEstado);
      setValorInput("");
    } catch (err) {
      setError("El valor debe ser un numero");
    } finally {
      setCargando(false);
    }
  }
  async function manejarExtraer() {
    setCargando(true);
    setError("");
    try {
      const resultado = await extraerMinimo();
      setItems(resultado.items);
      setMensaje(`Se extrajo el minimo: ${resultado.minimo}`);
    } catch (err) {
      setError("El heap esta vacio");
    } finally {
      setCargando(false);
    }
  }
  const niveles = construirNiveles(items);
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {" "}
      <h2>Heap (Min-Heap)</h2>{" "}
      <div style={{ marginBottom: "1rem" }}>
        {" "}
        <input
          type="text"
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
          placeholder="Numero a insertar"
        />{" "}
        <button onClick={manejarInsertar} disabled={cargando}>
          {" "}
          Insertar{" "}
        </button>{" "}
        <button onClick={manejarExtraer} disabled={cargando}>
          {" "}
          Extraer minimo{" "}
        </button>{" "}
      </div>{" "}
      {mensaje && <p>{mensaje}</p>}{" "}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {" "}
        {items.length === 0 && <p>El heap esta vacio</p>}{" "}
        {niveles.map((nivel, indiceNivel) => (
          <div key={indiceNivel} style={{ display: "flex", gap: "20px" }}>
            {" "}
            {nivel.map((valor, indiceEnNivel) => (
              <div
                key={indiceEnNivel}
                style={{
                  border: "2px solid #333",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: indiceNivel === 0 ? "#ffe0e0" : "#e0e8ff",
                }}
              >
                {" "}
                {valor}{" "}
              </div>
            ))}{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
export default HeapVisualizer;
