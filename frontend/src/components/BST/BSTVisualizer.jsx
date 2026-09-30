import { useState, useEffect } from "react";
import {
  obtenerArbol,
  insertarValor,
  buscarValor,
} from "../../services/bstApi";
function NodoVisual({ nodo }) {
  if (!nodo) return null;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {" "}
      <div
        style={{
          border: "2px solid #333",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e8ffe0",
        }}
      >
        {" "}
        {nodo.valor}{" "}
      </div>{" "}
      {(nodo.izquierda || nodo.derecha) && (
        <div style={{ display: "flex", gap: "30px", marginTop: "10px" }}>
          {" "}
          <NodoVisual nodo={nodo.izquierda} />{" "}
          <NodoVisual nodo={nodo.derecha} />{" "}
        </div>
      )}{" "}
    </div>
  );
}
function BSTVisualizer() {
  const [arbol, setArbol] = useState(null);
  const [valorInput, setValorInput] = useState("");
  const [valorBusqueda, setValorBusqueda] = useState("");
  const [resultadoBusqueda, setResultadoBusqueda] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    cargarArbol();
  }, []);
  async function cargarArbol() {
    try {
      const estado = await obtenerArbol();
      setArbol(estado);
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
      setArbol(nuevoEstado);
      setValorInput("");
    } catch (err) {
      setError("El valor debe ser un numero");
    } finally {
      setCargando(false);
    }
  }
  async function manejarBuscar() {
    if (!valorBusqueda.trim()) return;
    try {
      const encontrado = await buscarValor(valorBusqueda);
      setResultadoBusqueda(
        encontrado
          ? `El valor ${valorBusqueda} SI esta en el arbol`
          : `El valor ${valorBusqueda} NO esta en el arbol`,
      );
    } catch (err) {
      setResultadoBusqueda("Error al buscar");
    }
  }
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {" "}
      <h2>Arbol Binario de Busqueda (BST)</h2>{" "}
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
      </div>{" "}
      <div style={{ marginBottom: "1rem" }}>
        {" "}
        <input
          type="text"
          value={valorBusqueda}
          onChange={(e) => setValorBusqueda(e.target.value)}
          placeholder="Numero a buscar"
        />{" "}
        <button onClick={manejarBuscar}>Buscar</button>{" "}
      </div>{" "}
      {resultadoBusqueda && <p>{resultadoBusqueda}</p>}{" "}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "150px",
        }}
      >
        {" "}
        {!arbol && <p>El arbol esta vacio</p>} <NodoVisual nodo={arbol} />{" "}
      </div>{" "}
    </div>
  );
}
export default BSTVisualizer;
