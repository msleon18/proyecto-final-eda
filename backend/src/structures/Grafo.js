class Grafo {
  constructor() {
    this.adyacencia = {};
  }
  agregarNodo(nodo) {
    if (!this.adyacencia[nodo]) {
      this.adyacencia[nodo] = [];
    }
  }
  agregarArista(origen, destino) {
    this.agregarNodo(origen);
    this.agregarNodo(destino);
    if (!this.adyacencia[origen].includes(destino)) {
      this.adyacencia[origen].push(destino);
    }
    if (!this.adyacencia[destino].includes(origen)) {
      this.adyacencia[destino].push(origen);
    }
  }
  bfs(inicio) {
    if (!this.adyacencia[inicio]) return [];
    const visitados = new Set([inicio]);
    const cola = [inicio];
    const orden = [];
    while (cola.length > 0) {
      const actual = cola.shift();
      orden.push(actual);
      for (const vecino of this.adyacencia[actual]) {
        if (!visitados.has(vecino)) {
          visitados.add(vecino);
          cola.push(vecino);
        }
      }
    }
    return orden;
  }
  dfs(inicio) {
    if (!this.adyacencia[inicio]) return [];
    const visitados = new Set();
    const orden = [];
    this._dfsRecursivo(inicio, visitados, orden);
    return orden;
  }
  _dfsRecursivo(nodo, visitados, orden) {
    visitados.add(nodo);
    orden.push(nodo);
    for (const vecino of this.adyacencia[nodo]) {
      if (!visitados.has(vecino)) {
        this._dfsRecursivo(vecino, visitados, orden);
      }
    }
  }
  toJSON() {
    const nodos = Object.keys(this.adyacencia);
    const aristasSet = new Set();
    const aristas = [];
    for (const origen of nodos) {
      for (const destino of this.adyacencia[origen]) {
        const clave = [origen, destino].sort().join("-");
        if (!aristasSet.has(clave)) {
          aristasSet.add(clave);
          aristas.push([origen, destino]);
        }
      }
    }
    return { nodos, aristas };
  }
}
module.exports = Grafo;
