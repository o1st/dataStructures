import { DoublyLinkedList } from "../linkedList/doublyLinkedList";

class ListStack<T> {
  private list: DoublyLinkedList<T> = new DoublyLinkedList();
  constructor(first: T) {
    this.push(first);
  }

  size(): number {
    return this.list.size();
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  push(element: T): void {
    this.list.addLast(element);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.list.removeLast();
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.list.peekLast();
  }

  search(element: object): number {
    return this.list.indexOf(element);
  }
}
