export default class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player_purple');
        game.physics.arcade.enable(this);
        //this.body.gravity.y = 900;
        game.add.existing(this);

        this.animations.add('idle', [0, 1], 5, true);
        this.animations.add('walk', [2, 3], 10, true);
        this.animations.play('idle');

        this.anchor.setTo(.5, .5);

        this.leftDir = this.scale.x * -1;
        this.rightDir = this.scale.x;
    }

    static loadPlayerImage(game) {
        game.load.spritesheet('player_purple', 'assets/Player/player_purple.png', 150, 207);
    }

    goLeft(velocity = -150) {
        this.body.velocity.x = velocity;
        if (!this.jumping) {
            this.animations.play('walk');
        }
        this.scale.x = this.leftDir;
    }

    goRight(velocity = 150) {
        this.body.velocity.x = velocity;
        if (!this.jumping) {
            this.animations.play('walk');
        }
        this.scale.x = this.rightDir;
    }

    updatePlayer(cursors, contacts) {
        this.body.velocity.x = 0;
        if (cursors.left.isDown) {
            this.goLeft();
        }
        else if (cursors.right.isDown) {
            this.goRight();
        }
        else {
            this.animations.play('idle');
        }
    }
}
