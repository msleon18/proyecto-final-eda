import { useState, useEffect } from "react";
import {
  obtenerGrafo,
  agregarNodo,
  agregarArista,
  ejecutarBFS,
  ejecutarDFS,
} from "../../services/grafoApi";
function calcularPosiciones(nodos) {
  const centro = 160;
  const radio = 120;
  const posiciones = {};
  nodos.forEach((nodo, indice) => {
    const angulo = (2 * Math.PI * indice) / nodos.length;
    posiciones[nodo] = {
      x: centro + radio * Math.cos(angulo),
      y: centro + radio * Math.sin(angulo),
    };
  });
  return posiciones;
}
function GrafoVisualizer() {
  const [grafo, setGrafo] = useState({ nodos: [], aristas: [] });
  const [nodoInput, setNodoInput] = useState("");
  const [origenInput, setOrigenInput] = useState("");
  const [destinoInput, setDestinoInput] = useState("");
  const [inicioInput, setInicioInput] = useState("");
  const [recorrido, setRecorrido] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    cargarGrafo();
  }, []);
  async function cargarGrafo() {
    try {
      const estado = await obtenerGrafo();
      setGrafo(estado);
    } catch (err) {
      setError("No se pudo conectar con el servidor");
    }
  }
  async function manejarAgregarNodo() {
    if (!nodoInput.trim()) return;
    try {
      const nuevoEstado = await agregarNodo(nodoInput);
      setGrafo(nuevoEstado);
      setNodoInput("");
    } catch (err) {
      setError("Error al agregar el nodo");
    }
  }
  async function manejarAgregarArista() {
    if (!origenInput.trim() || !destinoInput.trim()) return;
    try {
      const nuevoEstado = await agregarArista(origenInput, destinoInput);
      setGrafo(nuevoEstado);
      setOrigenInput("");
      setDestinoInput("");
    } catch (err) {
      setError("Error al agregar la arista");
    }
  }
  async function manejarBFS() {
    if (!inicioInput.trim()) return;
    try {
      const resultado = await ejecutarBFS(inicioInput);
      setRecorrido(resultado);
    } catch (err) {
      setError("Error al ejecutar BFS");
    }
  }
  async function manejarDFS() {
    if (!inicioInput.trim()) return;
    try {
      const resultado = await ejecutarDFS(inicioInput);
      setRecorrido(resultado);
    } catch (err) {
      setError("Error al ejecutar DFS");
    }
  }
  const posiciones = calcularPosiciones(grafo.nodos);
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {" "}
      <h2>Grafo (BFS / DFS)</h2>{" "}
      <div style={{ marginBottom: "0.5rem" }}>
        {" "}
        <input
          type="text"
          value={nodoInput}
          onChange={(e) => setNodoInput(e.target.value)}
          placeholder="Nombre del nodo (ej: A)"
        />{" "}
        <button onClick={manejarAgregarNodo}>Agregar nodo</button>{" "}
      </div>{" "}
      <div style={{ marginBottom: "0.5rem" }}>
        {" "}
        <input
          type="text"
          value={origenInput}
          onChange={(e) => setOrigenInput(e.target.value)}
          placeholder="Origen"
        />{" "}
        <input
          type="text"
          value={destinoInput}
          onChange={(e) => setDestinoInput(e.target.value)}
          placeholder="Destino"
        />{" "}
        <button onClick={manejarAgregarArista}>Conectar</button>{" "}
      </div>{" "}
      <div style={{ marginBottom: "1rem" }}>
        {" "}
        <input
          type="text"
          value={inicioInput}
          onChange={(e) => setInicioInput(e.target.value)}
          placeholder="Nodo inicial"
        />{" "}
        <button onClick={manejarBFS}>Ejecutar BFS</button>{" "}
        <button onClick={manejarDFS}>Ejecutar DFS</button>{" "}
      </div>{" "}
      {recorrido.length > 0 && <p>Recorrido: {recorrido.join(" -> ")}</p>}{" "}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <svg width="320" height="320" style={{ border: "1px solid #ccc" }}>
        {" "}
        {grafo.aristas.map(([origen, destino], indice) => (
          <line
            key={indice}
            x1={posiciones[origen]?.x}
            y1={posiciones[origen]?.y}
            x2={posiciones[destino]?.x}
            y2={posiciones[destino]?.y}
            stroke="#999"
            strokeWidth="2"
          />
        ))}{" "}
        {grafo.nodos.map((nodo) => {
          const indiceEnRecorrido = recorrido.indexOf(nodo);
          const fueVisitado = indiceEnRecorrido !== -1;
          return (
            <g key={nodo}>
              {" "}
              <circle
                cx={posiciones[nodo]?.x}
                cy={posiciones[nodo]?.y}
                r="20"
                fill={fueVisitado ? "#ffd27f" : "#cfe8ff"}
                stroke="#333"
                strokeWidth="2"
              />{" "}
              <text
                x={posiciones[nodo]?.x}
                y={posiciones[nodo]?.y}
                textAnchor="middle"
                dy="5"
              >
                {" "}
                {nodo}{" "}
              </text>{" "}
              {fueVisitado && (
                <text
                  x={posiciones[nodo]?.x}
                  y={posiciones[nodo]?.y - 28}
                  textAnchor="middle"
                  fontSize="12"
                >
                  {" "}
                  {indiceEnRecorrido + 1}{" "}
                </text>
              )}{" "}
            </g>
          );
        })}{" "}
      </svg>{" "}
    </div>
  );
}
export default GrafoVisualizer;
