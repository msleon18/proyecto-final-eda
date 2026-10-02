import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}/stack`;
export async function obtenerEstado() {
  const respuesta = await axios.get(API_URL);
  return respuesta.data.items;
}
export async function apilar(valor) {
  const respuesta = await axios.post(`${API_URL}/push`, { valor });
  return respuesta.data.items;
}
export async function desapilar() {
  const respuesta = await axios.post(`${API_URL}/pop`);
  return respuesta.data.items;
}
export async function obtenerHistorial() {
  const respuesta = await axios.get(`${API_URL}/historial`);
  return respuesta.data;
}
