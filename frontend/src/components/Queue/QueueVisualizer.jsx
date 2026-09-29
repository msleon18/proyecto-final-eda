import { useState, useEffect } from "react";
import { obtenerEstado, encolar, desencolar } from "../../services/queueApi";
function QueueVisualizer() {
  const [items, setItems] = useState([]);
  const [valorInput, setValorInput] = useState("");
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
  async function manejarEnqueue() {
    if (!valorInput.trim()) return;
    setCargando(true);
    setError("");
    try {
      const nuevoEstado = await encolar(valorInput);
      setItems(nuevoEstado);
      setValorInput("");
    } catch (err) {
      setError("Error al encolar el valor");
    } finally {
      setCargando(false);
    }
  }
  async function manejarDequeue() {
    setCargando(true);
    setError("");
    try {
      const nuevoEstado = await desencolar();
      setItems(nuevoEstado);
    } catch (err) {
      setError("La cola esta vacia");
    } finally {
      setCargando(false);
    }
  }
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {" "}
      <h2>Cola (Queue)</h2>{" "}
      <div style={{ marginBottom: "1rem" }}>
        {" "}
        <input
          type="text"
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
          placeholder="Valor a encolar"
        />{" "}
        <button onClick={manejarEnqueue} disabled={cargando}>
          {" "}
          Enqueue{" "}
        </button>{" "}
        <button onClick={manejarDequeue} disabled={cargando}>
          {" "}
          Dequeue{" "}
        </button>{" "}
      </div>{" "}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          minHeight: "80px",
        }}
      >
        {" "}
        {items.length === 0 && <p>La cola esta vacia</p>}{" "}
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              border: "2px solid #333",
              padding: "10px 20px",
              backgroundColor: "#fff0e0",
              borderRadius: "4px",
            }}
          >
            {" "}
            {item}{" "}
          </div>
        ))}{" "}
      </div>{" "}
      {items.length > 0 && (
        <p style={{ fontSize: "0.8rem", color: "#666" }}>
          {" "}
          Entra por la derecha, sale por la izquierda{" "}
        </p>
      )}{" "}
    </div>
  );
}
export default QueueVisualizer;
