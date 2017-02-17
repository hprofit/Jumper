import Enemy from './Enemy.js';

export default class SpikeMan extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'bunnyJumperSheet');

        this.height = 64;
        this.width = 48;
        this.scale.x *= -1;
        this.body.setSize(this.body.width - 40, this.body.height - 20, 20, 20);

        this.standFrame = 'Enemies/SpikeMan/stand.png';
        this.jumpFrame = 'Enemies/SpikeMan/jump.png';

        this.animations.add('walking', ['Enemies/SpikeMan/walk_00.png', 'Enemies/SpikeMan/walk_01.png'], 5, true);
        this.frameName = this.standFrame;

        this.touchDamage = 1;
        this.moveSpeed = 75;
        this.direction = -1;
        this.body.velocity.x = this.direction * this.moveSpeed;
    }

    //static loadSpikeManImage(game) {
    //    game.load.atlasJSONHash('spikeMan', 'assets/Enemies/spikeManSheet.png', 'assets/Enemies/spikeManAtlas.json');
    //}

    flipDirection() {
        this.direction *= -1;
        this.body.velocity.x = this.direction * this.moveSpeed;
        this.scale.x *= -1;
    }

    updateEnemy() {
        super.updateEnemy();
        this.animations.play('walking');

        if (this.body.onWall() || (
            (this.body.touching.left || this.body.touching.right) && !(this.body.wasTouching.left || this.body.wasTouching.right))) {
            this.flipDirection();
        }
    }
}
