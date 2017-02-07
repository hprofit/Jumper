import Enemy from './Enemy.js';
import EaseInOutComponent from '../EaseInOutComponent';

export function loadCloudImage(game) {
    game.load.image('cloud', 'assets/Enemies/cloud.png');
}

export default class Cloud extends Enemy {
    constructor(game, x, y, maxYSwing = 25) {
        super(game, x, y, 'cloud');

        this.sprite.height = 48;
        this.sprite.width = 96;

        this.doesDamage = false;
        this.speedX = 50;
        this.directionX = -1;
        this.sprite.body.velocity.x = this.directionX * this.speedX;
        this.sprite.body.gravity.y = 0;

        this.easeInOutComponent = new EaseInOutComponent(y, maxYSwing * 2, 1)
    }

    flipDirection() {
        this.directionX *= -1;
        this.sprite.body.velocity.x = this.directionX * this.speedX;
        this.sprite.scale.x *= -1;
    }

    update(deltaTime) {
        super.update();

        this.easeInOutComponent.update(deltaTime);
        this.sprite.body.y = this.easeInOutComponent.getCurrentPos();

        if (this.sprite.body.onWall() || (
            (this.sprite.body.touching.left || this.sprite.body.touching.right) &&
            !(this.sprite.body.wasTouching.left || this.sprite.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
