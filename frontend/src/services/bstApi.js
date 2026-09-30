import axios from "axios";
const API_URL = "http://localhost:3000/api/bst";
export async function obtenerArbol() {
  const respuesta = await axios.get(API_URL);
  return respuesta.data.arbol;
}
export async function insertarValor(valor) {
  const respuesta = await axios.post(`${API_URL}/insertar`, { valor });
  return respuesta.data.arbol;
}
export async function buscarValor(valor) {
  const respuesta = await axios.get(`${API_URL}/buscar/${valor}`);
  return respuesta.data.encontrado;
}
