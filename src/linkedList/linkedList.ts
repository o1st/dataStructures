import { Nullable } from "../types/nullable";

class ListNode<T> {
  value: T;
  next: Nullable<ListNode<T>>;
  constructor(value: T) {
    this.value = value; // value of node
    this.next = null; // pointer to the next list node.
  }
}

class LinkedList<T> {
  private length: number;
  private head: Nullable<ListNode<T>>;
  private tail: Nullable<ListNode<T>>;

  constructor() {
    this.length = 0;
    this.head = null; // pointer to the first list node
    this.tail = null; // pointer to the last lest node
  }

  add(value: T) {
    const node = new ListNode<T>(value);

    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      if (this.tail) {
        this.tail.next = node;
        this.tail = node;
      } else {
        throw new ReferenceError("Cant find the tail next element");
      }
    }

    this.length++;
  }

  delete(value: T) {
    let previous = null,
      current = this.head,
      deleted = false;

    while (current !== null) {
      if (value === current.value) {
        if (previous !== null) {
          previous.next = current.next;

          if (current.next === null) {
            this.tail = previous;
          }
        } else {
          this.head = this.head?.next ?? null;

          if (this.head === null) {
            this.tail = null;
          }
        }

        deleted = true;
        this.length--;

        break;
      }

      previous = current;
      current = current.next;
    }

    return deleted;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
