// Returns an array of Fibonacci numbers up to the specified index n.
export const getFibonacciNumbers = (n: number): number[] => {
    const getResult: number[] = [1, 1];
    for (let i = 2; i <= n; i++ ) {
        getResult.push(getResult[i - 1] + getResult[i - 2]);
    }
    return getResult
}

// The getFibonacciNumbers function takes an integer n as input and returns an array of Fibonacci numbers up to the n-th element, inclusive.
// Here's a detailed breakdown of the code:

// - const getResult: number[] = [1, 1];: Initializes an array getResult with the first two Fibonacci numbers [1, 1].
//   These numbers serve as initial values for subsequent calculations.
// - for (let i = 2; i <= n; i++ ) {: Initiates a loop that iterates from 2 to n, inclusive.
//   At this point, the getResult array already contains two initial elements.
// - getResult.push(getResult[i - 1] + getResult[i - 2]);: In each iteration, a new number is added to the getResult array,
//   which is the sum of the last two numbers (the current and the previous one) in the Fibonacci sequence.
//   This ensures the array expands with new Fibonacci numbers.
// - return getResult;: After completing the loop, the function returns the getResult array,
//   which contains Fibonacci numbers up to the n-th element.