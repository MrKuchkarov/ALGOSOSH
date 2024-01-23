// A universal function for swapping elements at two indices in an array
export const swap = <T>(arr: Array<T>, firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};