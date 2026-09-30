import axios from "axios";
const API_URL = "http://localhost:3000/api/heap";
export async function obtenerEstado() {
  const respuesta = await axios.get(API_URL);
  return respuesta.data.items;
}
export async function insertarValor(valor) {
  const respuesta = await axios.post(`${API_URL}/insertar`, { valor });
  return respuesta.data.items;
}
export async function extraerMinimo() {
  const respuesta = await axios.post(`${API_URL}/extraer-minimo`);
  return respuesta.data;
}
