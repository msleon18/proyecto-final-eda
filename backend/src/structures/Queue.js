class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(valor) {
    this.items.push(valor);
    return this.items;
  }
  dequeue() {
    if (this.isEmpty()) {
      throw new Error("La cola esta vacia, no se puede hacer dequeue");
    }
    return this.items.shift();
  }
  peek() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }
  isEmpty() {
    return this.items.length === 0;
  }
  toArray() {
    return [...this.items];
  }
}
module.exports = Queue;
