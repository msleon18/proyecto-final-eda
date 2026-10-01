import axios from "axios";
const API_URL = "http://localhost:3000/api/grafo";
export async function obtenerGrafo() {
  const respuesta = await axios.get(API_URL);
  return respuesta.data;
}
export async function agregarNodo(nodo) {
  const respuesta = await axios.post(`${API_URL}/nodo`, { nodo });
  return respuesta.data;
}
export async function agregarArista(origen, destino) {
  const respuesta = await axios.post(`${API_URL}/arista`, { origen, destino });
  return respuesta.data;
}
export async function ejecutarBFS(inicio) {
  const respuesta = await axios.get(`${API_URL}/bfs/${inicio}`);
  return respuesta.data.recorrido;
}
export async function ejecutarDFS(inicio) {
  const respuesta = await axios.get(`${API_URL}/dfs/${inicio}`);
  return respuesta.data.recorrido;
}
