export default class EmitterComponent extends Phaser.Particles.Arcade.Emitter {
    constructor(game, x, y, maxParticles, doDamage = false, damageAmount = 0, hitWalls = false) {
        super(game, x, y, maxParticles);
        game.add.existing(this);
        this.bounce.setTo(0.5, 0.5);

        this.maxParticles = maxParticles;
        this.particlesDoDamage = doDamage;
        this.particleDamage = damageAmount;
        this.particlesHitWalls = hitWalls;
    }

    killParticle(particle, other) {
        if (particle.onKill) {
            particle.onKill();
        }
        else {
            particle.kill();
        }
    }

    setWidth (width) {
        this.width = width;
    }

    disableGravity() {
        this.setGravity(0);
    }

    setGravity(gravity) {
        this.gravity.y = gravity;
    }

    moveEmitter(x, y) {
        this.x = x;
        this.y = y;
    }

    setParticleClass(particleClass) {
        this.particleClass = particleClass;
    }

    makeParticlesFromAtlas(atlas, frames = []) {
        super.makeParticles(atlas, frames, this.maxParticles, true);
    }

    makeParticles(particleImage, frames = [0]) {
        super.makeParticles(particleImage, frames, this.maxParticles, true);
    }

    setSpeed(xMin = 0, xMax = 0, yMin = 0, yMax = 0) {
        this.setXSpeed(xMin, xMax);
        this.setYSpeed(yMin, yMax);
    }

    setScaleWithDefaults(xMin = 0, xMax = 0, yMin = 0, yMax = 0) {
        super.setScale(xMin, xMax, yMin, yMax);
    }

    setScaleBoth(min = 0, max = 0) {
        this.setScale(min, max, min, max);
        this.minParticleScale = min;
        this.maxParticleScale = max;
    }

    setRotation(min = 0, max = 0) {
        super.setRotation(min, max);
        this.minRotation = min;
        this.maxRotation = max;
    }

    start(explode = true, lifespan = 0, frequency = 250, quantity = 0, forceQuantity = false) {
        super.start(explode, lifespan, frequency, quantity, forceQuantity);
    }
}