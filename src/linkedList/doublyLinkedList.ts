import { Nullable } from "../types/nullable";

class ListNode<T> {
  data: T | null;
  prev: Nullable<ListNode<T>>;
  next: Nullable<ListNode<T>>;

  constructor(
    data: T,
    prev: Nullable<ListNode<T>>,
    next: Nullable<ListNode<T>>
  ) {
    this.data = data;
    this.prev = prev;
    this.next = next;
  }

  toString() {
    return this.data.toString();
  }
}

class DoublyLinkedList<T> {
  private inner_size: number = 0;
  private head: Nullable<ListNode<T>> = null;
  private tail: Nullable<ListNode<T>> = null;

  clear(): void {
    let trav: Nullable<ListNode<T>> = this.head;
    while (trav !== null) {
      const next: Nullable<ListNode<T>> = trav.next;
      trav.next = trav.prev = null;
      trav.data = null;
      trav = next;
    }
    this.head = this.tail = trav = null;
    this.inner_size = 0;
  }

  size(): number {
    return this.inner_size;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  add(element: T): void {
    this.addLast(element);
  }

  addLast(element: T): void {
    if (this.isEmpty()) {
      this.head = this.tail = new ListNode<T>(element, null, null);
    } else {
      if (this.tail) {
        this.tail.next = new ListNode<T>(element, this.tail, null);
        this.tail = this.tail?.next;
      } else {
        throw new ReferenceError("The tail is not accessible");
      }
    }
    this.inner_size++;
  }

  addFirst(element: T): void {
    if (this.isEmpty()) {
      this.head = this.tail = new ListNode<T>(element, null, null);
    } else {
      if (this.head) {
        this.head.prev = new ListNode<T>(element, null, this.head);
        this.head = this.head.prev;
      } else {
        throw new ReferenceError("The head is not accessible");
      }
    }
    this.inner_size++;
  }

  addAt(element: T, index: number): void {
    if (index < 0 || index > this.size()) {
      throw new ReferenceError("Illegal Index");
    }

    if (index === 0) {
      this.addFirst(element);
      return;
    }

    if (index === this.size()) {
      this.addLast(element);
      return;
    }

    let temp: ListNode<T> = this.head as ListNode<T>;

    for (let i = 0; i < index - 1; i++) {
      temp = temp.next as ListNode<T>;
    }

    const newNode: ListNode<T> = new ListNode<T>(element, temp, temp.next);
    if (temp.next) {
      temp.next.prev = newNode;
      temp.next = newNode;
    } else {
      throw new Error("No next element error");
    }

    this.inner_size++;
  }

  peakFirst(): T {
    if (this.isEmpty()) {
      throw new ReferenceError("Empty list");
    }
    return this.head?.data as T;
  }

  peakLast(): T {
    if (this.isEmpty()) {
      throw new ReferenceError("Empty list");
    }
    return this.tail?.data as T;
  }

  removeFirst(): T {
    if (this.isEmpty()) {
      throw new ReferenceError("Empty list");
    }

    const data: T = this.head?.data as T;
    this.head = this.head?.next as ListNode<T>;
    this.inner_size--;

    if (this.isEmpty()) {
      this.tail = null;
    } else {
      this.head.prev = null;
    }

    return data;
  }

  removeLast(): T {
    if (this.isEmpty()) {
      throw new ReferenceError("Empty list");
    }

    const data: T = this.tail?.data as T;
    this.tail = this.tail?.prev as ListNode<T>;
    this.inner_size--;

    if (this.isEmpty()) {
      this.head = null;
    } else {
      this.tail.prev = null;
    }

    return data;
  }

  private _remove(node: Nullable<ListNode<T>>): T {
    if (!node) {
      throw new ReferenceError("Node not found");
    }
    if (node.prev === null) {
      return this.removeFirst();
    }
    if (node.next === null) {
      return this.removeLast();
    }

    node.next.prev = node.prev;
    node.prev.next = node.next;

    const data: T = node.data as T;

    node.data = null;
    node = node.prev = node.next = null;

    this.inner_size--;

    return data;
  }

  removeAt(index: number): T {
    if (index < 0 || index >= this.size()) {
      throw new ReferenceError("Illegal Index");
    }

    let i: number;
    let trav: Nullable<ListNode<T>>;

    if (index < this.size() / 2) {
      for (i = 0, trav = this.head; i != index; i++) {
        trav = trav?.next as ListNode<T>;
      }
    } else
      for (i = this.size() - 1, trav = this.tail; i != index; i--) {
        trav = trav?.prev as ListNode<T>;
      }

    return this._remove(trav);
  }

  remove(obj: object): boolean {
    let trav: Nullable<ListNode<T>> = this.head;

    if (obj == null) {
      for (trav = this.head; trav != null; this.trav = trav.next) {
        if (trav.data == null) {
          this._remove(trav);
          return true;
        }
      }
    } else {
      for (trav = this.head; trav != null; trav = trav.next) {
        if (JSON.stringify(obj) === JSON.stringify(trav.data)) {
          this._remove(trav);
          return true;
        }
      }
    }
    return false;
  }

  indexOf(obj: object): number {
    let index: number = 0;
    let trav: Nullable<ListNode<T>> = this.head;

    if (obj == null) {
      for (; trav != null; trav = trav.next, index++) {
        if (trav.data == null) {
          return index;
        }
      }
    } else
      for (; trav != null; trav = trav.next, index++) {
        if (JSON.stringify(obj) === JSON.stringify(trav.data)) {
          return index;
        }
      }

    return -1;
  }

  contains(obj: object): boolean {
    return this.indexOf(obj) != -1;
  }

  toString(): string {
    let result = "[ ";
    let trav: Nullable<ListNode<T>> = this.head;
    while (trav != null) {
      result += trav.data;
      if (trav.next != null) {
        result += ", ";
      }
      trav = trav.next;
    }
    result += " ]";
    return result;
  }
}
