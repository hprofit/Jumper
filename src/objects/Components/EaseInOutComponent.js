import {plotOnBell} from '../../MathExtensions';

export default class EaseInOutComponent {
    constructor(start, max, speed, direction = 1, clip = .25){
        this._start = start;
        this._max = max;
        this._clipMin = clip;
        this._clipMax = 1 - clip;

        this._speed = speed;
        this._direction = direction;
        this._curMove = clip; // Value between _clipMin and _clipMax


        this._slope = (this._clipMax - this._clipMin);
    }

    /**
     * @param input - Number - Value between _clipMin and _clipMax
     * @returns Number - 0 to 1
     * @private
     */
    _getValueInClipRange(input) {
        return (input - this._clipMin) / this._slope;
    }

    /**
     * Given the time since last call, increments curMove by the
     * (plotted y coord of curMove on a bell curve) * deltaTime * speed in the direction of travel
     * @param deltaTime
     * @private
     */
    _updateCurMove(deltaTime) {
        this._curMove += (deltaTime * this._direction * this._speed) * plotOnBell(this._curMove);
    }

    /**
     * If curMove is greater than the max clip or less than the minimum clip, caps it to max or min respectively and
     * flips the direction
     * @private
     */
    _clipCurMove() {
        if (this._curMove >= this._clipMax || this._curMove <= this._clipMin) {
            this._direction *= -1;
            this._curMove = this._curMove >= this._clipMax ? this._clipMax : this._clipMin;
        }
    }

    /**
     * Sets start to a new value
     * @param newStart
     */
    updateStart (newStart) {
        this._start = newStart;
    }

    /**
     * Resets curMove to the minimum clip
     */
    reset () {
        this._curMove = this._clipMin;
    }

    /**
     * Using the bell curve Y coord from curMove, increments curMove by Y * deltaTime * speed in the direction of travel
     * (positive for down, negative for up)
     * curMove is capped at .25 and .75 respectively to avoid the ~0 values at the edges of the bell curve
     * curMove is then made into a decimal of 0-1 and multiplied by the maxYChange to find the currentPos
     * this currentPos is then subtracted from startY to find the final position on the screen
     * @param deltaTime
     */
    update (deltaTime) {
        this._updateCurMove(deltaTime);
        this._clipCurMove();
    }

    /**
     * Maps the curMove value (clipMin to clipMax) to 0-1, finds the amount of max to subtract, returns the start value
     * minus the amount of max found
     * @returns {number}
     */
    getCurrentPos() {
        let currentPos = this._getValueInClipRange(this._curMove) * this._max;
        return this._start - currentPos;
    }
}