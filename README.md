# Challenge 09 - Árbol N-ario (Menú Lateral Dinámico)

Proyecto para el curso de Estructuras de Datos y Algoritmos. Implementación de una estructura de datos de Árbol N-ario aplicada a un menú lateral interactivo con submenús desplegables en React.

## Integrante
- **Maycol Leon** - msleon18

## Descripción
Plataforma interactiva que modela una jerarquía ilimitada de opciones mediante nodos N-arios. Cada nodo administra dinámicamente un arreglo de hijos y un componente recursivo en React se encarga de renderizar los niveles de profundidad y desplegar las opciones.

## Tecnologías usadas
- **Frontend:** React + Vite
- **Iconografía:** Lucide React
- **Lenguaje:** JavaScript (ES6+)

## Estructura del proyecto
- `src/menuTree.js`: Contiene la clase base `MenuNode` y la función `crearArbolMenu` que instancia la jerarquía de navegación.
- `src/components/Sidebar.jsx`: Componente recursivo en React (`MenuItem`) para el despliegue dinámico de los submenús del árbol N-ario.
- `src/App.jsx`: Componente principal que integra el menú lateral y la vista de inspección de propiedades del nodo seleccionado.

## Funcionalidades implementadas
- **Árbol N-ario personalizado:** Estructura donde un nodo raíz puede contener múltiples ramas e hijos de forma escalable.
- **Renderizado recursivo:** Componentes capaces de autoinvocarse para mostrar niveles de submenús.
- **Inspección en tiempo real:** Visualización de las propiedades del nodo seleccionado (título, ruta y cantidad de hijos).

## Cómo correr en local

1. Sitúate en la carpeta del proyecto:
```bash
cd challenge-09-arbol-nario