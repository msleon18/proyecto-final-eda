class NodoArbol {
  constructor(valor) {
    this.valor = valor;
    this.izquierda = null;
    this.derecha = null;
  }
}
class ArbolBinarioBusqueda {
  constructor() {
    this.raiz = null;
  }
  insertar(valor) {
    const nuevoNodo = new NodoArbol(valor);
    if (this.raiz === null) {
      this.raiz = nuevoNodo;
      return;
    }
    this._insertarRecursivo(this.raiz, nuevoNodo);
  }
  _insertarRecursivo(nodoActual, nuevoNodo) {
    if (nuevoNodo.valor < nodoActual.valor) {
      if (nodoActual.izquierda === null) {
        nodoActual.izquierda = nuevoNodo;
      } else {
        this._insertarRecursivo(nodoActual.izquierda, nuevoNodo);
      }
    } else {
      if (nodoActual.derecha === null) {
        nodoActual.derecha = nuevoNodo;
      } else {
        this._insertarRecursivo(nodoActual.derecha, nuevoNodo);
      }
    }
  }
  buscar(valor) {
    return this._buscarRecursivo(this.raiz, valor);
  }
  _buscarRecursivo(nodo, valor) {
    if (nodo === null) return false;
    if (valor === nodo.valor) return true;
    if (valor < nodo.valor) return this._buscarRecursivo(nodo.izquierda, valor);
    return this._buscarRecursivo(nodo.derecha, valor);
  }
  toJSON() {
    return this._nodoAJSON(this.raiz);
  }
  _nodoAJSON(nodo) {
    if (nodo === null) return null;
    return {
      valor: nodo.valor,
      izquierda: this._nodoAJSON(nodo.izquierda),
      derecha: this._nodoAJSON(nodo.derecha),
    };
  }
}
module.exports = ArbolBinarioBusqueda;
