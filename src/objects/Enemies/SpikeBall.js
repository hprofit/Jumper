import Enemy from './Enemy.js';

export function loadSpikeBallImage(game) {
    game.load.spritesheet('spikeBall', 'assets/Enemies/spikeBall.png', 148, 148);
}

export default class SpikeBall extends Enemy {
    constructor(game, x, y, worldX = x, worldY = y) {
        super(game, x, y, worldX, worldY, 'spikeBall');

        this.sprite.height = 48;
        this.sprite.width = 48;
        this.sprite.body.setSize(this.sprite.body.width - 40, this.sprite.body.height, 20, 0);

        this.sprite.animations.add('roll', [0, 1], 25, true);
        this.sprite.animations.play('roll');

        this.touchDamage = 2;
        this.direction = 1;

        this.bounceCount = 0;
        this.maxBounce = 4;

        this.sprite.body.bounce.y = 1.0;
        this.speedX = 100;
        this.direction = -1;
        this.sprite.body.velocity.x = -this.speedX;
    }

    flipDirection() {
        this.direction *= -1;
        this.sprite.body.velocity.x = this.speedX * this.direction;
    }

    /**
     * @param deltaTime
     * @param enemiesThatHitPlatforms
     */
    update(deltaTime, enemiesThatHitPlatforms) {
        super.update();

        let contact = _.indexOf(enemiesThatHitPlatforms, this) !== -1;

        if (contact || this.sprite.body.onFloor() || this.sprite.body.touching.down) {
            this.bounceCount++;
            this.sprite.body.bounce.y = 1.0;

            if (this.bounceCount === this.maxBounce) {
                this.sprite.body.velocity.y = -500;
                this.sprite.body.bounce.y = .6;
                this.bounceCount = 0;
            }
        }

        if (this.sprite.body.onWall() || (
            (this.sprite.body.touching.left || this.sprite.body.touching.right) &&
            !(this.sprite.body.wasTouching.left || this.sprite.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
