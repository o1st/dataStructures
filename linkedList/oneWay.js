class ListNode {
  constructor(value) {
    this.value = value; // value of the list node
    this.next = null; // pointer to the next list node.
  }
}

class LinkedList {
  constructor() {
    this.length = 0;
    this._head = null; // pointer to the first list node
    this._tail = null; // pointer to the last lest node
  }

  add(value) {
    const node = new ListNode(value);

    if (this._head === null) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      this._tail = node;
    }

    this.length++;
  }

  delete(value) {
    let previous = null,
      current = this._head,
      deleted = false;

    while (current !== null) {
      if (value === current.value) {
        if (previous !== null) {
          previous.next = current.next;

          if (current.next === null) {
            this._tail = previous;
          }
        } else {
          this._head = this._head.next;

          if (this._head === null) {
            this._tail = null;
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
    this._head = null;
    this._tail = null;
    this.length = 0;
  }
}
