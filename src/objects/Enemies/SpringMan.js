import Enemy from './Enemy.js';

export default class SpringMan extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'springMan');

        this.height = 48;
        this.width = 32;

        this.touchDamage = 1;

        this.body.bounce.y = 1.0;
        this.body.velocity.x = 200;
    }

    static loadSpringManImage(game) {
        game.load.image('springMan', 'assets/Enemies/springMan.png');
    }

    flipDirection() {
        this.body.velocity.x *= -1;
    }

    /**
     * @param deltaTime
     * @param enemiesThatHitPlatforms
     */
    updateEnemy(deltaTime, enemiesThatHitPlatforms) {
        super.updateEnemy();

        let contact = _.indexOf(enemiesThatHitPlatforms, this) !== -1;

        if (contact || this.body.onFloor() || this.body.touching.down) {
            this.flipDirection();
        }

        if (this.body.onWall() || (
            (this.body.touching.left || this.body.touching.right) &&
            !(this.body.wasTouching.left || this.body.wasTouching.right)) ) {
            this.flipDirection();
        }
    }
}
