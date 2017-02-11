import Enemy from './Enemy.js';
import EaseInOutComponent from '../Components/EaseInOutComponent';
import EmitterComponent from '../Components/EmitterComponent';

export function loadCloudImage(game) {
    game.load.image('cloud', 'assets/Enemies/cloud.png');

    game.load.spritesheet('lightning_particle', 'assets/Particles/lightning_particle.png', 55, 114);
}

class Lightning extends Phaser.Particle {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        this.sprite = game.add.sprite(x, y, key);
        this.animations.add('flash', [0, 1], 50, true);
    }

    onEmit() {
        this.animations.play('flash');
    }
}

class LightningLarge extends Lightning {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);
        this.emitterComponent = new EmitterComponent(game, x, y, 10);
        this.emitterComponent.setParticleClass(Lightning);
        this.emitterComponent.makeParticlesFromImage('lightning_particle', [0, 1]);
        this.emitterComponent.setSpeed(-250, 250, -250, 250);
        this.emitterComponent.setScaleBoth(.125, .125);
    }

    onKill() {
        this.emitterComponent.moveEmitter(this.x + this.width / 2, this.y + this.height / 2);
        this.emitterComponent.startEmitter(true, 200, null, 10);
        this.kill();
    }
}

export default class Cloud extends Enemy {
    constructor(game, x, y, maxYSwing = 25) {
        super(game, x, y, 'cloud');

        this.height = 48;
        this.width = 96;

        this.doesDamage = false;
        this.speedX = 50;
        this.directionX = -1;
        this.body.velocity.x = this.directionX * this.speedX;
        this.body.gravity.y = 0;

        this.easeInOutComponent = new EaseInOutComponent(y, maxYSwing * 2, 1);

        this.emitterComponent = new EmitterComponent(game, x + 48, y + 24, 10, true, 2, true);

        this.emitterComponent.setParticleClass(LightningLarge);
        this.emitterComponent.makeParticlesFromImage('lightning_particle', [0, 1]);
        this.emitterComponent.setSpeed(0, 0, 500, 500);
        this.emitterComponent.setScaleBoth(.5, .5);
        this.emitterComponent.setRotationWithDefaults();
        this.emitterComponent.startEmitter(false, 0, 1500);
    }

    flipDirection() {
        this.directionX *= -1;
        this.body.velocity.x = this.directionX * this.speedX;
        this.scale.x *= -1;
    }

    updateEnemy(deltaTime) {
        super.updateEnemy();
        this.emitterComponent.moveEmitter(this.x, this.y);

        this.easeInOutComponent.update(deltaTime);
        this.body.y = this.easeInOutComponent.getCurrentPos();

        if (this.body.onWall() || (
            (this.body.touching.left || this.body.touching.right) && !(this.body.wasTouching.left || this.body.wasTouching.right))) {
            this.flipDirection();
        }
    }
}
