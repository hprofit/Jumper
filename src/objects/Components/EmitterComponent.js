export default class EmitterComponent {
    constructor(game, x, y, maxParticles, doDamage = false, damageAmount = 0, hitWalls = false) {
        this.emitter = game.add.emitter(x, y, maxParticles);
        this.emitter.bounce.setTo(0.5, 0.5);

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
        this.emitter.width = width;
    }

    setGravity(gravity) {
        this.emitter.gravity = gravity;
    }

    moveEmitter(x, y) {
        this.emitter.x = x;
        this.emitter.y = y;
    }

    setParticleClass(particleClass) {
        this.emitter.particleClass = particleClass;
    }

    makeParticles(particleImage, frames) {
        this.emitter.makeParticles(particleImage, frames, this.maxParticles, true);
    }

    setSpeed(xMin = 0, xMax = 0, yMin = 0, yMax = 0) {
        this.emitter.setXSpeed(xMin, xMax);
        this.emitter.setYSpeed(yMin, yMax);
    }

    setScale(xMin = 0, xMax = 0, yMin = 0, yMax = 0) {
        this.emitter.setScale(xMin, xMax, yMin, yMax);
    }

    setScaleBoth(min, max) {
        this.setScale(min, max, min, max);
        this.emitter.minParticleScale = min;
        this.emitter.maxParticleScale = max;
    }

    setRotation(min, max) {
        this.emitter.setRotation(min, max);
        this.emitter.minRotation = min;
        this.emitter.maxRotation = max;
    }

    start(explode = true, lifespan = 0, frequency = 250, quantity = 0, forceQuantity = false) {
        this.emitter.start(explode, lifespan, frequency, quantity, forceQuantity);
    }
}