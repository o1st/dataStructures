class DynamicArray<T> {
    private arr: T[];
    private length: number = 0;
    private capacity: number = 0;

    constructor(capacity: number = 16){
        if(capacity < 0){
            throw new RangeError("Illegal Capacity: " + capacity);
        }

        this.capacity = capacity;
        this.arr = new Array<T>(capacity);
    }

    size(): number {
        return this.length;
    }

    isEmpty(): boolean {
        return this.size() === 0;
    }

    get(index: number): T {
        if(index >= this.length || index < 0){
            throw new ReferenceError('Illegal index:' + index);
        }
        return this.arr[index];
    }

    set(index: number, element: T): void {
        if(index >= this.length || index < 0){
            throw new ReferenceError('Illegal index:' + index);
        }
        this.arr[index] = element;
    }

    clear(): void {
        // for(let i = 0; i < this.length; i++){
        //     this.arr[i] = null;
        // }
        this.arr = new Array<T>(0);
        this.length = 0;
    }

    add(element: T): void {
        if(this.length + 1 >= this.capacity ){
            if(this.capacity === 0){
                this.capacity = 1;
            } else {
                this.capacity *=2;
                const newArr = new Array<T>(this.capacity);

                for(let i = 0; i < this.length; i++){
                    newArr[i] = this.arr[i];
                }
                this.arr = newArr;
            }
        }

        this.arr[this.length++] = element;
    }

    removeAt(rmIndex: number): T {
        if(rmIndex >= this.length || rmIndex < 0){
            throw new ReferenceError('Illegal index:' + rmIndex);
        }

        const element = this.arr[rmIndex];
        const newArr = new Array<T>(this.length -1);

        for(let i = 0, j = 0; i < this.length; i++, j++){
            if(rmIndex === i){
                j--;
            } else {
                newArr[j] = this.arr[i];
            }
        }
        this.arr = newArr;
        this.capacity = --this.length;

        return element;
    }

    remove(obj: T): boolean {
        const index = this.indexOf(obj);
        if(index === -1){
            return false;
        }
        this.removeAt(index);
        return true;
    }

    indexOf(obj: T): number {
        for(let i = 0; i < this.length; i++){
            if(obj === null){
                if(this.arr[i] === null){
                    return i;
                }
            } else if(JSON.stringify(obj) === JSON.stringify(this.arr[i])){ // for simple compare
                return i;
            }
        }
    }

    contains(obj: T): boolean {
        return this.indexOf(obj) !== -1;
    }

    toString(): string {
        if(this.length === 0){
            return '[]';
        } else {
            let result = '[';
            for(let i = 0; i < this.length; i++){
                if(i === this.length -1) {
                    result += this.arr[i]
                } else {
                    result += this.arr[i] + ", ";
                }
            }
            return result+= ']';
        }
    }
}

const dynamicArray = new DynamicArray<string>(20);

dynamicArray.size();