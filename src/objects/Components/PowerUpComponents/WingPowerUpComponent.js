import PowerUpComponent from './PowerUpComponent';

export default class WingPowerPowerUpComponent extends PowerUpComponent {
    constructor(group, player, game) {
        super();
        this.spriteLeft = group.create(player.x - 10, player.y, 'leftWing');
        this.spriteLeft.anchor.setTo(1, .5);
        this.spriteLeft.width = 32;
        this.spriteLeft.height = 32;

        this.spriteRight = group.create(player.x + 10, player.y, 'rightWing');
        this.spriteRight.anchor.setTo(0, .5);
        this.spriteRight.width = 32;
        this.spriteRight.height = 32;

        this.tweenLeft = game.add.tween(this.spriteLeft).to({angle: 45}, 300, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);
        this.tweenRight = game.add.tween(this.spriteRight).to({angle: -45}, 300, Phaser.Easing.Quadratic.InOut, false, 0, -1, true);

        this.pressed = false;
        this.delayTimer = 0;
        this.delayMax = .25;

        this.flyJumps = 0;
        this.maxFlyJumps = 3;
        this.flying = false;
    }

    static loadWingPowerUpImage(game) {
        game.load.image('leftWing', 'assets/Items/PowerUpSprites/wing_left.png');
        game.load.image('rightWing', 'assets/Items/PowerUpSprites/wing_right.png');
    }

    _flapWings() {
        this.spriteLeft.angle = -30;
        this.spriteRight.angle = 30;

        this.tweenLeft.isPaused ? this.tweenLeft.resume() : this.tweenLeft.start();
        this.tweenRight.isPaused ? this.tweenRight.resume() : this.tweenRight.start();
    }

    _stopFlapWings() {
        this.tweenLeft.pause();
        this.tweenRight.pause();

        this.spriteLeft.angle = 0;
        this.spriteRight.angle = 0;
    }

    handleJump(cursors, contacts, delta, player) {
        if (cursors.up.isDown && !this.pressed && this.delayTimer === 0 && this.flyJumps <= this.maxFlyJumps) {
            player.jump(-700);

            this._flapWings();
            this.pressed = true;
            this.delayTimer = 0;
            this.flying = true;
            this.flyJumps++;
        }
        // When the player releases the up key, reset pressed
        if (cursors.up.isUp && this.flying) {
            this.pressed = false;
        }

        // If we're in the air and the player has pressed the button and delay timer is still less than the max delay
        // increment the delay timer
        // If the delay has reached the max, cap it
        if (this.flying && this.delayTimer <= this.delayMax) {
            this.delayTimer += delta;
            if (this.delayTimer >= this.delayMax) {
                this.delayTimer = this.delayMax;
            }
        }

        // When the up key is no longer pressed and the timer has maxed out, reset delay
        if (this.delayTimer === this.delayMax && !this.pressed) {
            this.delayTimer = 0;
        }

        // If the player stopped jumping for any reason, reset the delay and stop flapping wings
        if (!player.jumping && this.flying) {
            this._stopFlapWings();
            this.delayTimer = 0;
            this.flying = false;
            this.flyJumps = 0;
        }
    }

    remove() {
        this.spriteLeft.kill();
        this.spriteRight.kill();
    }

    update(cursors, contacts, delta, player) {
        this.spriteLeft.x = player.x - 10;
        this.spriteLeft.y = player.y;

        this.spriteRight.x = player.x + 10;
        this.spriteRight.y = player.y;
    }
}