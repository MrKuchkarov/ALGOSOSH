export const getFibonacciNumbers = (n: number, memoizedResults: number[] = []): number[] => {
    if (!Number.isInteger(n) || n <= 0) {
        throw new Error("n должно быть положительным целым числом");
    }
    if (memoizedResults[n] !== undefined) {
        return memoizedResults.slice(0, n + 1);
    }

    const fibonacciSequence: number[] = [1, 1];
    for (let i = 2; i <= n; i++) {
        fibonacciSequence.push(fibonacciSequence[i - 1] + fibonacciSequence[i - 2]);
    }

    memoizedResults[n] = fibonacciSequence[fibonacciSequence.length - 1];
    return fibonacciSequence;
};



