export const wait = (s) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), s * 1000);
    })
}

export const zeroToNArray = (n) => {
    return Array.from(Array(n).keys());
}
