// A function that returns a Promise to introduce a delay in asynchronous operations
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));