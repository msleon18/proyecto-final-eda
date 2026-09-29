import { useState, useEffect } from "react";
import { obtenerEstado, apilar, desapilar } from "../../services/stackApi";
function StackVisualizer() {
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
  async function manejarPush() {
    if (!valorInput.trim()) return;
    setCargando(true);
    setError("");
    try {
      const nuevoEstado = await apilar(valorInput);
      setItems(nuevoEstado);
      setValorInput("");
    } catch (err) {
      setError("Error al apilar el valor");
    } finally {
      setCargando(false);
    }
  }
  async function manejarPop() {
    setCargando(true);
    setError("");
    try {
      const nuevoEstado = await desapilar();
      setItems(nuevoEstado);
    } catch (err) {
      setError("La pila esta vacia");
    } finally {
      setCargando(false);
    }
  }
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {" "}
      <h2>Pila (Stack)</h2>{" "}
      <div style={{ marginBottom: "1rem" }}>
        {" "}
        <input
          type="text"
          value={valorInput}
          onChange={(e) => setValorInput(e.target.value)}
          placeholder="Valor a apilar"
        />{" "}
        <button onClick={manejarPush} disabled={cargando}>
          {" "}
          Push{" "}
        </button>{" "}
        <button onClick={manejarPop} disabled={cargando}>
          {" "}
          Pop{" "}
        </button>{" "}
      </div>{" "}
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          gap: "4px",
          minHeight: "200px",
        }}
      >
        {" "}
        {items.length === 0 && <p>La pila esta vacia</p>}{" "}
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              border: "2px solid #333",
              padding: "10px 30px",
              backgroundColor: "#e0f0ff",
              borderRadius: "4px",
            }}
          >
            {" "}
            {item}{" "}
          </div>
        ))}{" "}
      </div>{" "}
    </div>
  );
}
export default StackVisualizer;
