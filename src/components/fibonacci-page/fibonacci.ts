// Returns an array of Fibonacci numbers up to the specified index n.
export const getFibonacciNumbers = (n: number): number[] => {
    const getResult: number[] = [1, 1];
    for (let i = 2; i <= n; i++ ) {
        getResult.push(getResult[i - 1] + getResult[i - 2]);
    }
    return getResult
}
