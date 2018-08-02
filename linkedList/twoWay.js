class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

class LinkedList {
  constructor() {
    this.length = 0;
    this._head = null;
    this._tail = null;
  }

  addToHead(value) {
    const node = new ListNode(value);
    const tempNode = this._head;

    this._head = node;
    this._head.next = tempNode;

    if (this.length === 0) {
      this._tail = this._head;
    } else {
      tempNode.previous = node;
    }

    this.length++;
  }

  addToEnd(value) {
    const node = new ListNode(value);

    if (this.length === 0) {
      this._head = node;
    } else {
      this._tail.next = node;
      node.previous = this._tail;
    }

    this._tail = node;

    this.length++;
  }

  delete(value) {
    let current = this._head,
      previous = null,
      deleted = false;

    if (this.length === 0) {
      return deleted;
    }

    while (current.next !== null) {
      if (current.value === value) {
        if (previous !== null) {
          previous.next = current.next;

          if (current.next === null) {
            this._tail = previous;
          } else {
            current.next.previous = previous;
          }

          this.length--;
        } else {
          this._head = this._head.next;

          this.length--;

          if (this.length === 0) {
            this._tail = null;
          } else {
            this._head.previous = null;
          }
        }

        deleted = true;
        break;
      }

      previous = current;
      current = current.next;
    }

    return deleted;
  }

  printAll() {
    let current = this._head,
      previous = null,
      arr = [];

    while (current !== null) {
      arr.push(current.value);

      current = current.next;
      previous = current;
    }

    console.log(arr);
  }

  clear() {
    this.length = 0;
    this._head = null;
    this._tail = null;
  }
}
