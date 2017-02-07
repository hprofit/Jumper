import MathExtensions from '../../MathExtensions';
import Enemy from './Enemy.js';

export function loadSunImage(game) {
    game.load.spritesheet('sun', 'assets/Enemies/sun.png', 148, 148);
}

export default class Sun extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'sun');

        this.sprite.height = 128;
        this.sprite.width = 128;
        //this.sprite.body.setSize(this.sprite.body.width - 40, this.sprite.body.height, 20, 0);

        this.sprite.animations.add('roll', [0, 1], 10, true);
        this.sprite.animations.play('roll');

        this.touchDamage = 5;
        this.speedX = 75;
        this.direction = -1;
        this.sprite.body.velocity.x = -this.speedX;
    }

    flipDirection() {
        this.direction *= -1;
        this.sprite.body.velocity.x = this.speedX * this.direction;
    }

    /**
     * @param deltaTime
     * @param enemiesThatHitPlatforms
     */
    update(deltaTime, enemiesThatHitPlatforms) {
        super.update();

        let contact = _.indexOf(enemiesThatHitPlatforms, this) !== -1;

        if (contact && (this.sprite.body.onFloor() || this.sprite.body.touching.down)) {
            this.sprite.body.velocity.y = -1 * MathExtensions.random(400, 700);
        }

        if (this.sprite.body.onWall() || (
            (this.sprite.body.touching.left || this.sprite.body.touching.right) &&
            !(this.sprite.body.wasTouching.left || this.sprite.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
