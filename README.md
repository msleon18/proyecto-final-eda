# Visualizador Interactivo de Estructuras de Datos

Proyecto final de Estructuras de Datos y Algoritmos 2.1. Plataforma visual para explorar operaciones sobre 5 estructuras de datos, con persistencia en base de datos y manejo de transacciones.

**Integrante:** Maycol Leon (msleon18)

## Ejercicios del curso (una rama por ejercicio)

Este repositorio reúne los ejercicios del curso. Cada ejercicio está en su propia rama.

| Ejercicio | Rama |
|---|---|
| Reto 3: Listas (app React con listas enlazadas) | [reto-03](https://github.com/msleon18/proyecto-final-eda/tree/reto-03) |
| Desafío: Pilas de libros | [pilas-libros](https://github.com/msleon18/proyecto-final-eda/tree/pilas-libros) |
| Desafío: Cola del cajero | [cola-cajero](https://github.com/msleon18/proyecto-final-eda/tree/cola-cajero) |
| Reto 8: Árbol binario | [challenge-08](https://github.com/msleon18/proyecto-final-eda/tree/challenge-08) |
| Reto 9: Árbol n-ario | [challenge-09](https://github.com/msleon18/proyecto-final-eda/tree/challenge-09) |
| Reto 10: Grafos | [challenge-10](https://github.com/msleon18/proyecto-final-eda/tree/challenge-10) |
| Reto 11: Trie + Heap (buscador inteligente) | [challenge-11](https://github.com/msleon18/proyecto-final-eda/tree/challenge-11) |
| Proyecto final | [proyecto-final](https://github.com/msleon18/proyecto-final-eda/tree/proyecto-final) (también en `main`) |

## Estructuras implementadas

| Estructura | Carpeta backend | Carpeta frontend |
|---|---|---|
| Pila (Stack) | `backend/src/structures/Stack.js` | `frontend/src/components/Stack` |
| Cola (Queue) | `backend/src/structures/Queue.js` | `frontend/src/components/Queue` |
| Árbol Binario de Búsqueda (BST) | `backend/src/structures/ArbolBinarioBusqueda.js` | `frontend/src/components/BST` |
| Heap (Min-Heap) | `backend/src/structures/MinHeap.js` | `frontend/src/components/Heap` |
| Grafo (BFS/DFS) | `backend/src/structures/Grafo.js` | `frontend/src/components/Grafo` |

## Tecnologías

- Frontend: React + Vite
- Backend: Node.js + Express
- Base de datos: PostgreSQL (Supabase)

## Despliegue

- Frontend: https://iridescent-treacle-8d3e02.netlify.app
- Backend: https://proyecto-final-eda.onrender.com

Nota: el backend está en el plan gratuito de Render, por lo que puede tardar hasta 50 segundos en responder la primera petición después de un período de inactividad.

## Documento final

Ver carpeta `docs/`.

## Cómo correr en local

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```