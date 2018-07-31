
class ListNode{
    constructor(value){
        this.value = value;
        this._next = null;
    }
}


class LinkedList{
    constructor(){
        this.length = 0;
        this._head = null;
        this._tail = null;
    }

    add(value){
        const node = new ListNode(value);

        if(this._head === null){
            this._head = node;
            this._tail = node;
        }else{
            this._tail._next = node;
            this._tail = node;
        }

        this.length++;
    }

    delete(value){
        let previous = null,
            current = this._head,
            deleted = false;

        while(current !== null){

            if(value === current.value){

                if(previous !== null){
                    previous._next = current._next;

                    if(current._next === null){
                        this._tail = previous;
                    }
                }else{
                    this._head = this._head._next;

                    if(this._head === null){
                        this._tail = null;
                    }
                }

                deleted = true;
                this.length--;

                break;
            }

            previous = current;
            current = current._next;
        }

        return deleted;
    }

    clear(){
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

}
