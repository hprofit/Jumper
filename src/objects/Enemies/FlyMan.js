import Enemy from './Enemy.js';
import MathExtensions from '../../MathExtensions';

export function loadFlyManImage(game) {
    game.load.spritesheet('flyMan', 'assets/Enemies/flyMan.png', 122, 139); // 480 x 159
}

export default class FlyMan extends Enemy {
    constructor(game, x, y, worldX = x, worldY = y, jumpHeight = 500) {
        super(game, x, y, worldX, worldY, 'flyMan');

        this.sprite.height = 64;
        this.sprite.width = 48;
        // this.sprite.body.setSize(this.sprite.body.width - 100, this.sprite.body.height - 20, 50, 20);

        this.sprite.animations.add('hover', [0, 1], 25, true);
        this.sprite.animations.add('stand', [2, 3], 25, true);
        this.sprite.animations.play('stand');
        this.jumpFrame = 4;
        this.fallFrame = 5;

        this.touchDamage = 1;
        this.jumpHeight = jumpHeight;

        this.maxWaitTime = 1;
        this.waitTimer = 0;
        this.hovering = true;
        this.resting = false;
    }

    jump() {
        this.sprite.body.velocity.y = -(this.jumpHeight);
        this.sprite.animations.stop();
        this.sprite.animations.frame = this.jumpFrame;
    }

    handleRest(deltaTime, contact) {
        if (this.waitTimer < this.maxWaitTime) {
            this.waitTimer += deltaTime;
            this.sprite.animations.play('stand');
        }
        else if (this.waitTimer >= this.maxWaitTime && contact) {
            this.jump();
            this.waitTimer = 0;
            this.resting = false;
        }
    }

    handleHover(deltaTime, contact) {
        if (this.waitTimer < this.maxWaitTime) {
            // TODO: hover logic
            this.sprite.body.gravity.y = 0;
            this.sprite.body.velocity.y = 0;
            this.waitTimer += deltaTime;
            this.sprite.animations.play('hover');
        }
        else if (this.waitTimer >= this.maxWaitTime) {
            // TODO: unhover logic
            this.sprite.body.gravity.y = 900;
            this.waitTimer = 0;
            this.hovering = false;
            this.sprite.animations.stop();
            this.sprite.animations.frame = this.fallFrame;
        }
    }

    update(deltaTime, enemiesThatHitPlatforms) {
        super.update();

        let contact = _.indexOf(enemiesThatHitPlatforms, this) !== -1;

        if (this.resting) {
            this.handleRest(deltaTime, contact);
        }
        else if (this.hovering) {
            this.handleHover(deltaTime, contact);
        }
        else if (contact && !this.resting){
            this.resting = true;
            this.hovering = false;
            this.waitTimer = 0;
        }

        if (this.sprite.animations.frame === this.jumpFrame && this.sprite.body.velocity.y > 0) {
            this.waitTimer = 0;
            this.hovering = true;
        }
    }
}
