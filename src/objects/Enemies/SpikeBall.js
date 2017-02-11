import Enemy from './Enemy.js';

export function loadSpikeBallImage(game) {
    game.load.spritesheet('spikeBall', 'assets/Enemies/spikeBall.png', 148, 148);
}

export default class SpikeBall extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'spikeBall');

        this.height = 48;
        this.width = 48;
        this.body.setSize(this.body.width - 40, this.body.height, 20, 0);

        this.animations.add('roll', [0, 1], 25, true);
        this.animations.play('roll');

        this.touchDamage = 2;
        this.direction = 1;

        this.bounceCount = 0;
        this.maxBounce = 4;

        this.body.bounce.y = 1.0;
        this.speedX = 100;
        this.direction = -1;
        this.body.velocity.x = this.direction * this.speedX;
    }

    flipDirection() {
        this.direction *= -1;
        this.body.velocity.x = this.speedX * this.direction;
    }

    /**
     * @param deltaTime
     * @param enemiesThatHitPlatforms
     */
    updateEnemy(deltaTime, enemiesThatHitPlatforms) {
        super.updateEnemy();

        let contact = _.indexOf(enemiesThatHitPlatforms, this) !== -1;

        if (contact || this.body.onFloor() || this.body.touching.down) {
            this.bounceCount++;
            this.body.bounce.y = 1.0;

            if (this.bounceCount === this.maxBounce) {
                this.body.velocity.y = -500;
                this.body.bounce.y = .6;
                this.bounceCount = 0;
            }
        }

        if (this.body.onWall() || (
            (this.body.touching.left || this.body.touching.right) &&
            !(this.body.wasTouching.left || this.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
