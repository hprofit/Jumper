import isInDebugMode from '../Debug';
import HUD from './HUD.js'
import { DebugGraphicsObjectSquare } from '../DebugGraphicsObjects.js';

export function loadPlayerImage(game) {
    game.load.spritesheet('player_purple', 'assets/Player/player_purple.png', 150, 207);
    game.load.spritesheet('player_brown', 'assets/Player/player_brown.png', 150, 207);
}

export default class Player {
    constructor(game, x, y) {
        //this.sprite = game.add.sprite(x, y, 'player_brown');
        this.sprite = game.add.sprite(x, y, 'player_purple');

        game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = 900;
        //this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor.setTo(.5, .5);
        this.sprite.height = 64;
        this.sprite.width = 48;
        this.sprite.body.setSize(this.sprite.body.width - 30, this.sprite.body.height - 70, 15, 70);

        this.hurtFrame = 5;
        this.jumpFrame = 4;
        this.sprite.animations.add('stand', [0, 1], 5, true);
        this.sprite.animations.add('walk', [2, 3], 10, true);

        this.left = this.sprite.scale.x * -1;
        this.right = this.sprite.scale.x;

        this.health = 10;
        this.maxHurtTimer = .5;
        this.invincibleTimer = 1;
        this.hurtTimer = 0;
        this.moveEnabled = true;
        this.isHurt = false;

        this.coins = {
            bronze: 0,
            silver: 0,
            gold: 0
        };

        this.HUD = new HUD(game);
        this.HUD.updateHealth(this.health);
        this.HUD.updateLife(3);

        if (isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
    }

    isMoving() {
        return this.sprite.body.velocity.x !== 0;
    }

    getDeltaMovement() {
        return this.sprite.body.deltaX();
    }

    /**
     * If the player is hurt and the hurtTimer has not yet reached invincibleTimer,
     * increment hurtTimer
     *
     * If hurtTimer reaches invincibleTimer, player is no longer hurt
     * else if hurtTimer has not reached maxHurtTimer, player is still hurt and cannot move yet
     * else if hurtTimer reaches maxHurtTimer, player can move and the hurt animation should stop
     *
     * Finally, if we have reached this far, handleInput
     * @param cursors
     * @param contacts
     * @param delta
     */
    update(cursors, contacts, delta) {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.sprite.body);
        }

        if (this.isHurt && this.hurtTimer < this.invincibleTimer) {
            this.hurtTimer += delta;

            if (this.hurtTimer >= this.invincibleTimer) {
                this.isHurt = false;
            }
            else if (this.hurtTimer < this.maxHurtTimer) {
                return;
            }
            else if (!this.moveEnabled) {
                this.moveEnabled = true;
                this.sprite.body.velocity.x = 0;
                this.sprite.body.bounce.y = 0;
            }
        }
        this.handleInput(cursors, contacts);
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

        this.sprite.animations.stop();
        this.sprite.frame = this.hurtFrame;

        this._updateHealth(-damage);
    }

    hazardHurtPlayer(damage) {
        this.sprite.body.velocity.y = -250;
        this.sprite.body.bounce.y = 0.3;
        this._hurtPlayer(damage);
    }

    touchHurtPlayer(enemy) {
        if (enemy.doesDamage) {
            let direction = this.sprite.body.x - enemy.sprite.body.x; // negative is left
            this.sprite.body.velocity.x = 150 * (direction / Math.abs(direction));

            this.sprite.body.velocity.y = -150;
            this.sprite.body.bounce.y = 0.2;
            this._hurtPlayer(enemy.touchDamage);
        }
    }

    canBeHurt() {
        return !this.isHurt;
    }

    handleInput(cursors, contacts) {
        if (this.sprite.body.touching.down) {
            this.jumping = false;
        }
        //  Reset the players velocity (movement)
        this.sprite.body.velocity.x = 0;

        if (cursors.left.isDown) {
            //  Move to the left
            this.sprite.body.velocity.x = -150;
            if (!this.jumping) {
                this.sprite.animations.play('walk');
            }
            this.sprite.scale.x = this.left;
        }
        else if (cursors.right.isDown) {
            //  Move to the right
            this.sprite.body.velocity.x = 150;
            if (!this.jumping) {
                this.sprite.animations.play('walk');
            }
            this.sprite.scale.x = this.right;
        }
        else if (!this.jumping) {
            //  Stand still
            this.sprite.animations.play('stand');
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && this.sprite.body.touching.down && contacts) {
            this.sprite.body.velocity.y = -500;
            this.sprite.animations.stop();
            this.sprite.frame = this.jumpFrame;
            this.jumping = true;
        }
    }

    addCoin(type) {
        this.coins[type]++;
        this.HUD.updateCoinAmount(type, this.coins[type]);
    }
}
