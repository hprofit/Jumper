let debugMode = undefined;

export default class DebugService {
    static turnDebugModeOn() {
        debugMode = Symbol.for('debugMode');
    }

    static turnDebugModeOff() {
        debugMode = undefined;
    }

    static isInDebugMode() {
        try {
            return Symbol.keyFor(debugMode) ? true : false;
        }
        catch (e) {
            return false;
        }
    }
}