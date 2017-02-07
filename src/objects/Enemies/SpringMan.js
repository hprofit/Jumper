import Enemy from './Enemy.js';

export function loadSpringManImage(game) {
    game.load.image('springMan', 'assets/Enemies/springMan.png');
}

export default class SpringMan extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'springMan');

        this.sprite.height = 48;
        this.sprite.width = 32;

        this.touchDamage = 1;

        this.sprite.body.bounce.y = 1.0;
        this.sprite.body.velocity.x = 200;
    }

    flipDirection() {
        this.sprite.body.velocity.x *= -1;
    }

    /**
     * @param deltaTime
     * @param enemiesThatHitPlatforms
     */
    update(deltaTime, enemiesThatHitPlatforms) {
        super.update();

        let contact = _.indexOf(enemiesThatHitPlatforms, this) !== -1;

        if (contact || this.sprite.body.onFloor() || this.sprite.body.touching.down) {
            this.flipDirection();
        }

        if (this.sprite.body.onWall() || (
            (this.sprite.body.touching.left || this.sprite.body.touching.right) &&
            !(this.sprite.body.wasTouching.left || this.sprite.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
