import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/queue`;
export async function obtenerEstado() {
  const respuesta = await axios.get(API_URL);
  return respuesta.data.items;
}
export async function encolar(valor) {
  const respuesta = await axios.post(`${API_URL}/enqueue`, { valor });
  return respuesta.data.items;
}
export async function desencolar() {
  const respuesta = await axios.post(`${API_URL}/dequeue`);
  return respuesta.data.items;
}
export async function obtenerHistorial() {
  const respuesta = await axios.get(`${API_URL}/historial`);
  return respuesta.data;
}
