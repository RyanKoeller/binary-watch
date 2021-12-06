import clock, { TickEvent } from "clock";
import document from "document";
import * as util from "../common/utils";

// Update the clock every second
clock.granularity = "seconds";

const secondBitsTensPlaceIds: string[] = [
    "secondsTensPlacePowerTwo",
    "secondsTensPlacePowerOne",
    "secondsTensPlacePowerZero"
];

const secondBitsOnesPlaceIds: string[] = [
    "secondsOnesPlacePowerThree",
    "secondsOnesPlacePowerTwo",
    "secondsOnesPlacePowerOne",
    "secondsOnesPlacePowerZero"
];

const minuteBitsTensPlaceIds: string[] = [
    "minutesTensPlacePowerTwo",
    "minutesTensPlacePowerOne",
    "minutesTensPlacePowerZero"
];

const minuteBitsOnesPlaceIds: string[] = [
    "minutesOnesPlacePowerThree",
    "minutesOnesPlacePowerTwo",
    "minutesOnesPlacePowerOne",
    "minutesOnesPlacePowerZero"
];

const hourBitsTensPlaceIds: string[] = [
    "hoursTensPlacePowerOne",
    "hoursTensPlacePowerZero"
];

const hourBitsOnesPlaceIds: string[] = [
    "hoursOnesPlacePowerThree",
    "hoursOnesPlacePowerTwo",
    "hoursOnesPlacePowerOne",
    "hoursOnesPlacePowerZero"
];

// Update the bit elements every tick with the current time
clock.ontick = (evt: TickEvent): void => {
    const now: Date = evt.date;
    const h: number = now.getHours();
    const m: number = now.getMinutes();
    const s: number = now.getSeconds();

    updateClock(h, m, s);
}

/**
 * Splits the hours, minutes, and seconds into different trigger events
 * @param hours current hours of the day
 * @param minutes current minutes of the hour
 * @param seconds current seconds of the minute
 */
function updateClock(hours: number, minutes: number, seconds: number): void {
    triggerClockLights(seconds, secondBitsOnesPlaceIds, secondBitsTensPlaceIds);
    triggerClockLights(minutes, minuteBitsOnesPlaceIds, minuteBitsTensPlaceIds);
    triggerClockLights(hours, hourBitsOnesPlaceIds, hourBitsTensPlaceIds);
}

/**
 * Converts numbers to binary strings and changes elements to "on" or "off"
 * @param num current number to calculate binary bits
 * @param bitOnesIds Ids of the ones place elements
 * @param bitTensIds Ids of the tens place elements
 */
function triggerClockLights(num: number, bitOnesIds: string[], bitTensIds: string[]): void {
    // pad, separate, and pad the digits again
    // example: 7 -> 07 -> 0 7 -> 0 111 -> 00 0111
    const padNum: string = util.zeroPad(num.toString());
    const onesDigit: string = padNum[1];
    const tensDigit: string = padNum[0];
    const onesDigitBinary: string = (+onesDigit).toString(2);
    const tensDigitBinary: string = (+tensDigit).toString(2);
    const padOnesDigitBinary: string = util.zeroPadBinary(onesDigitBinary, bitOnesIds.length);
    const padTensDigitBinary: string = util.zeroPadBinary(tensDigitBinary, bitTensIds.length);

    // change the class of the bit elements to "on" or "off"
    changeBitsOnOrOff(padOnesDigitBinary, bitOnesIds);
    changeBitsOnOrOff(padTensDigitBinary, bitTensIds);
}

/**
 * Changes elements to "on" or "off"
 * Helper of @function triggerClockLights
 * @param bits String representation of a binary number
 * @param bitIds Ids of the circle elements to turn "on" or "off"
 */
function changeBitsOnOrOff(bits: string, bitIds: string[]) {
    for (let i = 0; i < bitIds.length; i++) {
        const element: Element = document.getElementById(bitIds[i]);
        element.class = bits[i] === "1" ? "on" : "off";
    }
}
