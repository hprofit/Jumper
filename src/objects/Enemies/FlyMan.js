import Enemy from './Enemy.js';
import MathExtensions from '../../MathExtensions';

export function loadWingManImage(game) {
    game.load.spritesheet('flyMan', 'assets/Enemies/flyMan.png', 122, 139); // 480 x 159
}

export default class FlyMan extends Enemy {
    constructor(game, x, y, worldX = x, worldY = y, jumpHeight = 50) {
        super(game, x, y, worldX, worldY, 'flyMan');

        this.sprite.height = 48;
        this.sprite.width = 64;
        // this.sprite.body.setSize(this.sprite.body.width - 100, this.sprite.body.height - 20, 50, 20);

        this.standFrame = 0;
        this.jumpFrame = 1;
        this.sprite.animations.add('fly', [0, 1], 25, true);
        this.sprite.animations.add('stand', [2, 3], 15, true);
        this.sprite.animations.add('jump', [4, 5], 25, true);
        this.sprite.animations.play('stand');

        this.touchDamage = 1;
        this.jumpHeight = jumpHeight;
        // this.sprite.body.gravity.y = 0;
    }

    update(deltaTime) {
        super.update();
        // let diffY = this.sprite.body.y - this.minY;
        // if (diffY < 0 || diffY > this.maxYChange) {
        //   this.directionY *= -1;
        //   diffY = diffY < 0 ? 0 : this.maxYChange;
        // }
        // let input = (diffY / this.maxYChange) * .5 + .25;
        // let velocity = MathExtensions.plotOnBell(input) * this.directionY * this.speedY;
        // this.sprite.body.y += velocity;// * deltaTime;

        // this.sprite.body.velocity.y = -500;
        // this.sprite.animations.stop();
    }
}
