let debugMode = undefined;

export function turnDebugModeOn() {
    debugMode = Symbol.for('debugMode');
}

export function turnDebugModeOff() {
    debugMode = undefined;
}

export default function isInDebugMode() {
    try {
        return Symbol.keyFor(debugMode) ? true : false;
    }
    catch (e) {
        return false;
    }
}