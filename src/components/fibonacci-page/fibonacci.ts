export const getFibonacciNumbers = (n: number, memo: number[] = []): number[] => {
    if (memo[n] !== undefined) {
        return memo.slice(0, n + 1);
    }

    const getResult: number[] = [1, 1];
    for (let i = 2; i <= n; i++) {
        getResult.push(getResult[i - 1] + getResult[i - 2]);
    }

    memo[n] = getResult[getResult.length - 1];
    return getResult;
};


// export const getFibonacciNumbers = (n: number): number[] => {
//     const getResult: number[] = [1, 1];
//     for (let i = 2; i <= n; i++ ) {
//         getResult.push(getResult[i - 1] + getResult[i - 2]);
//     }
//     return getResult
// }
// // Пример использования console.time
// console.time('getFibonacciNumbers');
// const result = getFibonacciNumbers(60);
// console.timeEnd('getFibonacciNumbers');
//
// console.log('Result:', result);