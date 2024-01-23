import {ElementStates} from "../../../types/element-states";

export class LinkedListNode<T> {
    value: T
    next: LinkedListNode<T> | null

    constructor(value: T, next?: LinkedListNode<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}
type TLinkedList<T> = {
    prepend: (element: T) => void;
    append: (element: T) => void;
    insertByIndex: (element: T, position: number) => void;
    removeByIndex: (index: number) => void;
    shift: () => T | null;
    pop: () => T | null;
    isEmpty: () => boolean;
    print: () => void;
    getSize: () => number;
    getArrayWithState: () => { item: T; state: ElementStates }[];
};

export class LinkedList<T> implements TLinkedList<T> {
    private head: LinkedListNode<T> | null;
    private tail: LinkedListNode<T> | null;
    private size: number;
    private initialArray(items: T[]) {
        items.forEach(item => this.append(item));
    }

    constructor(items: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;

        if (items?.length) {
            this.initialArray(items);
        }
    };

    isEmpty = () => this.size === 0;

    insertByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            throw new Error("Enter a valid index");
        } else {
            if (index === 0) {
                this.prepend(element);
            } else {
                const node = new LinkedListNode(element);
                let curr = this.head;

                for (let i = 0; i < index - 1 && curr; i++) {
                    curr = curr.next;
                }
                if (curr) {
                    node.next = curr.next;
                    curr.next = node;
                } else {
                    throw new Error("The index is out of range");
                }

            }
            this.size++;
        }
    };

    removeByIndex(index: number) {
        if (index < 0 || index >= this.size) {
            throw new Error("Enter a valid index");
        }

        let currentNode = this.head;
        if (index === 0 && currentNode) {
            this.head = currentNode.next;
        } else {
            let prevNode = null;
            let currentIndex = 0;

            while (currentIndex < index && currentNode) {
                prevNode = currentNode;
                currentNode = currentNode.next;
                currentIndex++;
            }

            if (prevNode && currentNode) {
                prevNode.next = currentNode.next;
            }
        }
        this.size--;
    };

    shift() {
        if (!this.head) {
            throw new Error("List is empty");
        }

        const head = this.head;
        this.head = head.next;
        this.size--;

        return head.value;
    };

    pop() {
        if (this.size === 0) {
            throw new Error("List is empty");
        }

        let current = this.head;
        let prev: LinkedListNode<T> | null = null;

        while (current!.next) {
            prev = current;
            current = current!.next;
        }

        if (prev) {
            prev.next = null;
        } else {
            this.head = null;
        }

        this.size--;

        return current!.value;
    };

    prepend(element: T): void {
        const node = new LinkedListNode(element);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.size++;
    };

    append(element: T) {
        const node = new LinkedListNode(element);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            this.size++;
            return this;
        }
        this.tail.next = node;
        this.tail = node;
        this.size++;
    };

    getSize = () => this.size;

    getArrayWithState() {
        const result: { item: T; state: ElementStates }[] = [];
        let current = this.head;

        while (current) {
            result.push({
                item: current.value,
                state: ElementStates.Default,
            });

            current = current.next;
        }

        return result;
    };
    print () {
        let curr = this.head;
        let res = "";
        while (curr) {
            res += `${curr.value} `;
            curr = curr.next;
        }
        console.log(res);
    };
}

