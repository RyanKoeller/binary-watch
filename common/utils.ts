/**
 * Add zero in front of numbers < 10
 * @param num Decimal number to pad
 * @returns Padded decial number
 */
export function zeroPad(num) {
    if (num < 10) {
      num = "0" + num;
    }
    return num;
}

/**
 * Pads binary numbers to a desired length
 * @param num The binary number as a string
 * @param size Number of digits the number should display
 * @returns The binary with desired length
 */
export function padBinary(num: string, size: number): string {
    while (num.length < size) {
        num = "0" + num;
    }
    return num;
}
