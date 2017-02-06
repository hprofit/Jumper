class MathExtensionsClass {
    constructor() {
    }

    // x should be 0-1
    plotOnBell(x, stdD = .2, mean = .5) {
      let sqrtTwoPi = Math.sqrt(2 * Math.PI * Math.pow(stdD, 2));
      let denominator = Math.E * (1 / sqrtTwoPi);
      let pow = -(Math.pow(x - mean, 2) / (2 * Math.pow(stdD, 2)));
      return Math.pow(denominator, pow);
    }

    random (min, max) {
        return Math.random() * (max - min) + min;
    }
}

const MathExtensions = new MathExtensionsClass();
export default MathExtensions;
