import { DoublyLinkedList } from "../linkedList/doublyLinkedList";

class ListQueue<T> {
  private list: DoublyLinkedList<T> = new DoublyLinkedList();
  constructor(firstElement: T) {
    this.offer(firstElement);
  }

  size(): number {
    return this.list.size();
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }

    return this.list.peekFirst();
  }

  poll(): T {
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    }
    return this.list.removeFirst();
  }

  offer(element: T): void {
    this.list.addLast(element);
  }
}
