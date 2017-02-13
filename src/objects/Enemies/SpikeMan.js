import Enemy from './Enemy.js';

export default class SpikeMan extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'spikeMan');

        this.height = 64;
        this.width = 48;
        this.scale.x *= -1;
        this.body.setSize(this.body.width - 40, this.body.height - 20, 20, 20);

        this.standFrame = 0;
        this.jumpFrame = 1;
        this.animations.add('walking', [2, 3], 5, true);
        this.frame = this.standFrame;

        this.touchDamage = 1;
        this.moveSpeed = 75;
        this.direction = -1;
        this.body.velocity.x = this.direction * this.moveSpeed;
    }

    static loadSpikeManImage(game) {
        game.load.spritesheet('spikeMan', 'assets/Enemies/spikeMan.png', 120, 159); // 480 x 159
    }

    flipDirection() {
        this.direction *= -1;
        this.body.velocity.x = this.direction * this.moveSpeed;
        this.scale.x *= -1;
    }

    updateEnemy() {
        super.updateEnemy();
        this.animations.play('walking');

        if (this.body.onWall() || (
            (this.body.touching.left || this.body.touching.right) &&
            !(this.body.wasTouching.left || this.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
