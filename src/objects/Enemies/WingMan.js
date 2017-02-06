import Enemy from './Enemy.js';
import MathExtensions from '../../MathExtensions';
import EaseInOutComponent from '../EaseInOutComponent';

export function loadWingManImage(game) {
    game.load.spritesheet('wingMan', 'assets/Enemies/wingMan.png', 216, 126); // 480 x 159
}

export default class WingMan extends Enemy {
    constructor(game, x, y, worldX = x, worldY = y, stationary = false, maxYSwing = 50) {
        super(game, x, y, worldX, worldY, 'wingMan');

        this.sprite.height = 48;
        this.sprite.width = 64;
        this.sprite.body.setSize(this.sprite.body.width - 100, this.sprite.body.height - 20, 50, 20);

        this.standFrame = 0;
        this.jumpFrame = 1;
        this.sprite.animations.add('flying', [0, 1, 2, 3, 4, 3, 2, 1], 40, true);
        this.sprite.animations.play('flying');

        this.touchDamage = 1;
        this.speedY = .25;
        this.speedX = stationary ? 0 : 100;
        this.directionX = -1;
        this.directionY = 1;
        this.sprite.body.velocity.x = this.directionX * this.speedX;
        this.sprite.body.gravity.y = 0;

        this.maxYChange = maxYSwing * 2;
        this.startY = y;
        this.curMove = .25;

        this.easeInOutComponent = new EaseInOutComponent(y, maxYSwing * 2, .25)
    }

    flipDirection() {
        this.directionX *= -1;
        this.sprite.body.velocity.x = this.directionX * this.speedX;
    }

    /**
     * Using the bell curve Y coord from curMove, increments curMove by Y * deltaTime * speedY in the direction of travel
     * (positive for down, negative for up)
     * curMove is capped at .25 and .75 respectively to avoid the ~0 values at the edges of the bell curve
     * curMove is then made into a decimal of 0-1 and multiplied by the maxYChange to find the currentPos
     * this currentPos is then subtracted from startY to find the final position on the screen
     * @param deltaTime
     */
    update(deltaTime) {
        super.update();
        //this.curMove += (deltaTime * this.directionY * this.speedY) * MathExtensions.plotOnBell(this.curMove);
        //if (this.curMove >= .75 || this.curMove <= .25) {
        //    this.directionY *= -1;
        //    this.curMove = this.curMove >= .75 ? .75 : .25;
        //}
        //
        //let currentPos = ((this.curMove - .25) * 2) * this.maxYChange;
        //this.sprite.body.y = this.startY - currentPos;

        this.easeInOutComponent.update(deltaTime);
        this.sprite.body.y = this.easeInOutComponent.getCurrentPos();

        if (this.sprite.body.onWall() || (
            (this.sprite.body.touching.left || this.sprite.body.touching.right) &&
            !(this.sprite.body.wasTouching.left || this.sprite.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
