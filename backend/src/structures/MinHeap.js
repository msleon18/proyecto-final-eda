class MinHeap {
  constructor() {
    this.items = [];
  }
  insertar(valor) {
    this.items.push(valor);
    this._subir(this.items.length - 1);
  }
  _subir(indice) {
    while (indice > 0) {
      const indicePadre = Math.floor((indice - 1) / 2);
      if (this.items[indice] < this.items[indicePadre]) {
        [this.items[indice], this.items[indicePadre]] = [
          this.items[indicePadre],
          this.items[indice],
        ];
        indice = indicePadre;
      } else {
        break;
      }
    }
  }
  extraerMinimo() {
    if (this.isEmpty()) {
      throw new Error("El heap esta vacio, no se puede extraer");
    }
    const minimo = this.items[0];
    const ultimo = this.items.pop();
    if (this.items.length > 0) {
      this.items[0] = ultimo;
      this._bajar(0);
    }
    return minimo;
  }
  _bajar(indice) {
    const n = this.items.length;
    while (true) {
      const izquierda = 2 * indice + 1;
      const derecha = 2 * indice + 2;
      let menor = indice;
      if (izquierda < n && this.items[izquierda] < this.items[menor]) {
        menor = izquierda;
      }
      if (derecha < n && this.items[derecha] < this.items[menor]) {
        menor = derecha;
      }
      if (menor === indice) break;
      [this.items[indice], this.items[menor]] = [
        this.items[menor],
        this.items[indice],
      ];
      indice = menor;
    }
  }
  isEmpty() {
    return this.items.length === 0;
  }
  toArray() {
    return [...this.items];
  }
}
module.exports = MinHeap;
