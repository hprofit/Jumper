import DebugService from '../Debug/Debug';
import { DebugGraphicsObjectSquare } from '../Debug/DebugGraphicsObjects.js';

export default class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player_purple');
        game.add.existing(this);

        game.physics.enable(this);
        this.body.gravity.y = 900;
        this.anchor.setTo(.5, .5);
        this.height = 64;
        this.width = 48;
        this.body.setSize(this.body.width - 30, this.body.height - 70, 15, 70);

        this.jumpFrame = 4;
        this.animations.add('stand', [0, 1], 5, true);
        this.animations.add('walk', [2, 3], 10, true);

        this.leftDir = this.scale.x * -1;
        this.rightDir = this.scale.x;

        if (DebugService.isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
    }

    static loadPlayerImage(game) {
        game.load.spritesheet('player_purple', 'assets/Player/player_purple.png', 150, 207);
    }

    isMoving() {
        return this.body.deltaX() !== 0;
    }

    getVelocity() {
        return this.body.velocity.x;
    }

    updatePlayer(cursors, contacts) {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.body);
        }
        this._handleInput(cursors, contacts);
    }

    _jump(velocity = -500) {
        this.body.velocity.y = velocity;
        this.animations.stop();
        this.frame = this.jumpFrame;
        this.jumping = true;
    }

    _walk(velocity) {
        this.body.velocity.x = velocity;
        if (!this.jumping) {
            this.animations.play('walk');
        }
    }

    _goLeft(velocity = -150) {
        this._walk(velocity);
        this.scale.x = this.leftDir;
    }

    _goRight(velocity = 150) {
        this._walk(velocity);
        this.scale.x = this.rightDir;
    }

    _handleInput(cursors, contacts) {
        this.body.velocity.x = 0;

        // If the player was jumping but has now landed, reset jumping and play the stand animation
        if (this.body.touching.down && this.jumping) {
            this.jumping = false;
            this.animations.play('stand');
        }

        if (cursors.left.isDown) {
            this._goLeft();
        }
        else if (cursors.right.isDown) {
            this._goRight();
        }
        else if (!this.jumping) {
            this.animations.play('stand');
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && this.body.touching.down && contacts) {
            this._jump();
        }

        // If the player's touching a wall, 0 out the velocity
        if (this.body.touching.right || this.body.touching.left) {
            this.body.velocity.x = 0;
        }
    }
}
