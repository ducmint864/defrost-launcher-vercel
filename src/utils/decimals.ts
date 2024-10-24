export function countDecimals(num: number) {
    let numberStr = num.toString();

    if (numberStr.includes('.')) {
        let [_, decimalPart] = numberStr.split('.');
        decimalPart = decimalPart.replace(/0+$/, '');

        return decimalPart.length;
    }

    return 0;
}

export function convertNumToOnChainFormat(
    num: number,
    onchainDecimals: number,
    toString: boolean = true,
): bigint | string {
    const scale = countDecimals(num);

    if (scale > onchainDecimals) {
        console.warn(`scale of ${scale} is > than on-chain decimals of ${onchainDecimals}, you would lose the precision of number during conversion`);
    }

    // scale number to integer value
    num = num * (10 ** scale);

    onchainDecimals = Math.max(0, onchainDecimals - scale);

    const result = BigInt(num) * BigInt(10 ** onchainDecimals);
    return toString ? result.toString() : result;
}

// Test cases
// console.log(countDecimals(123.4567));    // Output: 4
// console.log(countDecimals(123));         // Output: 0
// console.log(countDecimals(123.0));       // Output: 0
// console.log(countDecimals(123.45000));   // Output: 2
// console.log(countDecimals(123.4500007)); // Output: 7

// console.log(convertNumToOnChainFormat(0.005, 4));
// console.log(convertNumToOnChainFormat(10, 18));
// console.log(convertNumToOnChainFormat(0.0069, 18));
// console.log(convertNumToOnChainFormat(0.5 / 100, 4));