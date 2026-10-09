// Clase que representa cada nodo dentro del Árbol N-ario del menú
export class MenuNode {
  constructor(titulo, icono = null, ruta = '#') {
    this.titulo = titulo;         // Nombre de la opción del menú
    this.icono = icono;           // Icono representativo
    this.ruta = ruta;             // Enlace o identificador de la vista
    this.hijos = [];              // Lista dinámica de nodos hijos (N-ario)
  }

  // Método para agregar un submenú o nodo hijo
  agregarHijo(nodoHijo) {
    this.hijos.push(nodoHijo);
    return nodoHijo;
  }
}

// Función encargada de construir y retornar la raíz del Árbol N-ario
export function crearArbolMenu() {
  const raiz = new MenuNode('Menú Principal', 'Home');

  // Ramificación 1: Estructuras de Datos
  const estructuras = new MenuNode('Estructuras de Datos', 'Database', '/estructuras');
  estructuras.agregarHijo(new MenuNode('Listas Enlazadas', 'List', '/estructuras/listas'));
  estructuras.agregarHijo(new MenuNode('Pilas y Colas', 'Layers', '/estructuras/pilas-colas'));
  estructuras.agregarHijo(new MenuNode('Árboles Binarios (BST)', 'GitBranch', '/estructuras/bst'));
  estructuras.agregarHijo(new MenuNode('Árboles N-arios', 'Network', '/estructuras/n-ario'));

  // Ramificación 2: Algoritmos
  const algoritmos = new MenuNode('Algoritmos', 'Cpu', '/algoritmos');
  const ordenamiento = new MenuNode('Ordenamiento', 'ArrowUpDown', '/algoritmos/ordenamiento');
  ordenamiento.agregarHijo(new MenuNode('Bubble Sort', 'Play', '/algoritmos/bubble'));
  ordenamiento.agregarHijo(new MenuNode('Quick Sort', 'Play', '/algoritmos/quick'));
  algoritmos.agregarHijo(ordenamiento);

  // Ramificación 3: Configuración y Ayuda
  const config = new MenuNode('Configuración', 'Settings', '/config');
  config.agregarHijo(new MenuNode('Perfil', 'User', '/config/perfil'));
  config.agregarHijo(new MenuNode('Preferencias', 'Sliders', '/config/preferencias'));

  // Adjuntamos las ramas principales a la raíz
  raiz.agregarHijo(estructuras);
  raiz.agregarHijo(algoritmos);
  raiz.agregarHijo(config);

  return raiz;
}