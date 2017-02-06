import MathExtensions from '../MathExtensions';

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
        let output = (input - this._clipMin) / this._slope;
        return output;
    }

    _updateCurMove(deltaTime) {
        this._curMove += (deltaTime * this._direction * this._speed) * MathExtensions.plotOnBell(this._curMove);
    }

    _clipCurMove() {
        if (this._curMove >= this._clipMax || this._curMove <= this._clipMin) {
            this._direction *= -1;
            this._curMove = this._curMove >= this._clipMax ? this._clipMax : this._clipMin;
        }
    }

    update (deltaTime) {
        this._updateCurMove(deltaTime);
        this._clipCurMove();
    }

    getCurrentPos() {
        //let currentPos = ((this.curMove - this.clipMin) * 2) * this.max;
        //this.sprite.body.y = this.start - currentPos;
        let currentPos = this._getValueInClipRange(this._curMove) * this._max;
        return this._start - currentPos;
    }
}