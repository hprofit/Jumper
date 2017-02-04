import Enemy from './Enemy.js';

export class SpikeMan extends Enemy {
    constructor(game, x, y, worldX = x, worldY = y) {
        super(game, x, y, worldX, worldY, 'spikeMan');

        this.sprite.height = 64;
        this.sprite.width = 48;
        this.sprite.scale.x *= -1;
        this.sprite.body.setSize(this.sprite.body.width - 40, this.sprite.body.height - 20, 20, 20);

        this.standFrame = 0;
        this.jumpFrame = 1;
        this.sprite.animations.add('walking', [2, 3], 5, true);
        this.sprite.frame = this.standFrame;

        this.touchDamage = 1;
        this.moveSpeed = 75;
        this.direction = -1;
        this.sprite.body.velocity.x = this.direction * this.moveSpeed;
    }

    flipDirection() {
        this.direction *= -1;
        this.sprite.body.velocity.x = this.direction * this.moveSpeed;
        this.sprite.scale.x *= -1;
    }

    update(enemiesThatHitPlatforms) {
        super.update();
        this.sprite.animations.play('walking');

        if (this.sprite.body.onWall() || (
            (this.sprite.body.touching.left || this.sprite.body.touching.right) &&
            !(this.sprite.body.wasTouching.left || this.sprite.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}

export function loadSpikeManImage(game) {
    game.load.spritesheet('spikeMan', 'assets/Enemies/spikeMan.png', 120, 159); // 480 x 159
}
