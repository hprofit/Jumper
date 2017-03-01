import DebugService from '../Debug/Debug';
import { DebugGraphicsObjectSquare } from '../Debug/DebugGraphicsObjects.js';

export default class Player extends Phaser.Sprite {
    constructor(game, x, y, lives = 3) {
        super(game, x, y, 'player_purple');
        game.add.existing(this);

        game.physics.enable(this);
        this.body.gravity.y = 900;
        this.anchor.setTo(.5, .5);
        this.height = 64;
        this.width = 48;
        this.body.setSize(this.body.width - 30, this.body.height - 70, 15, 70);

        this.hurtFrame = 5;
        this.jumpFrame = 4;
        this.animations.add('stand', [0, 1], 5, true);
        this.animations.add('walk', [2, 3], 10, true);

        this.leftDir = this.scale.x * -1;
        this.rightDir = this.scale.x;

        this.health = 10;
        this.maxHurtTimer = .5;
        this.invincibleTimer = 1.5;
        this.hurtTimer = 0;
        this.moveEnabled = true;
        this.isHurt = false;


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

    /**
     * If the player is hurt and the hurtTimer has not yet reached invincibleTimer,
     * increment hurtTimer
     *
     * If hurtTimer reaches invincibleTimer, player is no longer hurt
     * else if hurtTimer has not reached maxHurtTimer, player is still hurt and cannot move yet
     * else if hurtTimer reaches maxHurtTimer, player can move and the hurt animation should stop
     *
     * Finally, if we have reached this far, _handleInput
     * @param cursors
     * @param contacts
     * @param delta
     */
    updatePlayer(cursors, contacts, delta) {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.body);
        }

        if (this.isHurt && this.hurtTimer < this.invincibleTimer) {
            this.hurtTimer += delta;
            // Toggle alpha to display "hurt status"
            this.alpha = parseInt((this.hurtTimer / .1), 10) % 2 === 0 ? 0.25 : 1;

            if (this.hurtTimer >= this.invincibleTimer) {
                this.isHurt = false;
                this.alpha = 1;
            }
            else if (!this.moveEnabled && this.hurtTimer < this.maxHurtTimer) {
                return;
            }
            else if (!this.moveEnabled) {
                this.moveEnabled = true;
                this.body.velocity.x = 0;
                this.body.bounce.y = 0;
            }
        }
        this._handleInput(cursors, contacts, delta);
    }

    _updateHealth(changeInHealth) {
        this.health += changeInHealth;
        if (this.health <= 0) {
            this.health = 0;
            console.log("Dead");
        }
        this.health = this.health > 10 ? 10 : this.health;
        this.HUD.updateHealth(this.health);
    }

    _hurtPlayer(damage) {
        this.hurtTimer = 0;
        this.isHurt = true;
        this.moveEnabled = false;

        this.animations.stop();
        this.frame = this.hurtFrame;

        this._updateHealth(-damage);
    }

    _powerUpTakeHit() {
        this.powerUpComponent.takeHit();
        this.powerUpComponent = null;

        this.hurtTimer = 0;
        this.isHurt = true;
        this.moveEnabled = true;
    }

    hazardHurtPlayer(damage) {
        if (this.powerUpComponent && this.powerUpComponent.takeHit) {
            this._powerUpTakeHit();
        }
        else {
            this.body.velocity.y = -250;
            this.body.bounce.y = 0.3;
            this._hurtPlayer(damage);
        }
    }

    touchHurtPlayer(enemy) {
        if (enemy.doesDamage) {
            if (this.powerUpComponent && this.powerUpComponent.takeHit) {
                this._powerUpTakeHit();
            }
            else {
                let direction = this.body.x - enemy.body.x; // negative is left
                this.body.velocity.x = 150 * (direction / Math.abs(direction));

                this.body.velocity.y = -150;
                this.body.bounce.y = 0.2;
                this._hurtPlayer(enemy.touchDamage);
            }
        }
    }

    canBeHurt() {
        return !this.isHurt;
    }

    jump(velocity = -500) {
        this.body.velocity.y = velocity;
        this.animations.stop();
        this.frame = this.jumpFrame;
        this.jumping = true;
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

    _handleInput(cursors, contacts, delta) {
        this.body.velocity.x = 0;

        if (this.body.touching.down && this.jumping) {
            this.jumping = false;
            this.animations.play('stand');
        }

        if (cursors.left.isDown) {
            this.goLeft();
        }
        else if (cursors.right.isDown) {
            this.goRight();
        }
        else if (!this.jumping) {
            this.animations.play('stand');
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && this.body.touching.down && contacts) {
            this.body.velocity.y = -500;
            this.animations.stop();
            this.frame = this.jumpFrame;
            this.jumping = true;
        }

        if (this.body.touching.right || this.body.touching.left) {
            this.body.velocity.x = 0;
        }
    }
}
