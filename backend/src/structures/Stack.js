class Stack {
  constructor() {
    this.items = [];
  }
  push(valor) {
    this.items.push(valor);
    return this.items;
  }
  pop() {
    if (this.isEmpty()) {
      throw new Error("La pila esta vacia, no se puede hacer pop");
    }
    return this.items.pop();
  }
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.items.length - 1];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  toArray() { return [...this.items]; } reset() { this.items = []; }
}
module.exports = Stack;
