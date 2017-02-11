import Enemy from './Enemy.js';
import EaseInOutComponent from '../Components/EaseInOutComponent';

export function loadWingManImage(game) {
    game.load.spritesheet('wingMan', 'assets/Enemies/wingMan.png', 216, 126); // 480 x 159
}

export default class WingMan extends Enemy {
    constructor(game, x, y, stationary = false, maxYSwing = 50) {
        super(game, x, y, 'wingMan');

        this.sprite.height = 48;
        this.sprite.width = 64;
        this.sprite.body.setSize(this.sprite.body.width - 100, this.sprite.body.height - 20, 50, 20);

        this.standFrame = 0;
        this.jumpFrame = 1;
        this.sprite.animations.add('flying', [0, 1, 2, 3, 4, 3, 2, 1], 40, true);
        this.sprite.animations.play('flying');

        this.touchDamage = 1;
        this.speedX = stationary ? 0 : 100;
        this.directionX = -1;
        this.sprite.body.velocity.x = this.directionX * this.speedX;
        this.sprite.body.gravity.y = 0;

        this.easeInOutComponent = new EaseInOutComponent(y, maxYSwing * 2, .25)
    }

    flipDirection() {
        this.directionX *= -1;
        this.sprite.body.velocity.x = this.directionX * this.speedX;
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
