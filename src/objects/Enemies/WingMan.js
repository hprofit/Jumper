import Enemy from './Enemy.js';
import EaseInOutComponent from '../Components/EaseInOutComponent';

export default class WingMan extends Enemy {
    constructor(game, x, y, stationary = false, maxYSwing = 50) {
        super(game, x, y, 'wingMan');

        this.height = 48;
        this.width = 64;
        this.body.setSize(this.body.width - 100, this.body.height - 20, 50, 20);

        this.standFrame = 0;
        this.jumpFrame = 1;
        this.animations.add('flying', [0, 1, 2, 3, 4, 3, 2, 1], 40, true);
        this.animations.play('flying');

        this.touchDamage = 1;
        this.speedX = stationary ? 0 : 100;
        this.directionX = -1;
        this.body.velocity.x = this.directionX * this.speedX;
        this.body.gravity.y = 0;

        this.easeInOutComponent = new EaseInOutComponent(y, maxYSwing * 2, .25)
    }

    static loadWingManImage(game) {
        game.load.spritesheet('wingMan', 'assets/Enemies/wingMan.png', 216, 126); // 480 x 159
    }

    flipDirection() {
        this.directionX *= -1;
        this.body.velocity.x = this.directionX * this.speedX;
    }

    updateEnemy(deltaTime) {
        super.updateEnemy();

        this.easeInOutComponent.update(deltaTime);
        this.body.y = this.easeInOutComponent.getCurrentPos();

        if (this.body.onWall() || (
            (this.body.touching.left || this.body.touching.right) &&
            !(this.body.wasTouching.left || this.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
