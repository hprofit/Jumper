import MathExtensions from '../../MathExtensions';
import Enemy from './Enemy.js';

export function loadSunImage(game) {
    game.load.spritesheet('sun', 'assets/Enemies/sun.png', 148, 148);
}

export default class Sun extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'sun');

        this.height = 128;
        this.width = 128;
        //this.body.setSize(this.body.width - 40, this.body.height, 20, 0);

        this.animations.add('roll', [0, 1], 10, true);
        this.animations.play('roll');

        this.touchDamage = 5;
        this.speedX = 75;
        this.direction = -1;
        this.body.velocity.x = -this.speedX;
    }

    flipDirection() {
        this.direction *= -1;
        this.body.velocity.x = this.speedX * this.direction;
    }

    /**
     * @param deltaTime
     * @param enemiesThatHitPlatforms
     */
    updateEnemy(deltaTime, enemiesThatHitPlatforms) {
        super.updateEnemy();

        let contact = _.indexOf(enemiesThatHitPlatforms, this) !== -1;

        if (contact && (this.body.onFloor() || this.body.touching.down)) {
            this.body.velocity.y = -1 * MathExtensions.random(400, 700);
        }

        if (this.body.onWall() || (
            (this.body.touching.left || this.body.touching.right) &&
            !(this.body.wasTouching.left || this.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
