class MathExtensionsClass {
    constructor() {
    }

    plotOnBell(x, scale) {
        //This is the real workhorse of this algorithm. It returns values along a bell curve from 0 - 1 - 0 with an input of 0 - 1.
        scale = scale || false;
        let stdD = .125;
        let mean = .5;
        if (scale) {
            return 1 / (( 1 / ( stdD * Math.sqrt(2 * Math.PI) ) ) * Math.pow(Math.E, -1 * Math.pow(x - mean, 2) / (2 * Math.pow(stdD, 2))));
        } else {
            return (( 1 / ( stdD * Math.sqrt(2 * Math.PI) ) ) * Math.pow(Math.E, -1 * Math.pow(x - mean, 2) / (2 * Math.pow(stdD, 2)))) * this.plotOnBell(.5, true);
        }
    }
}

const MathExtensions = new MathExtensionsClass();
export default MathExtensions;