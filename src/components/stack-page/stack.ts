type TStack<T> = {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    getItem: () => T[];
    clear: () => void;
}

export class Stack<T> implements TStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    }

    pop = (): void => {
        this.container.pop();
    }

    peak = () => this.container[this.container.length - 1];

    clear = () => this.container = [];

    getSize = () => this.container.length;

    getItem = (): T[] => this.container;
}

