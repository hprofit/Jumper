import isInDebugMode from '../Debug/Debug';
import HUD from './HUD.js'
import { DebugGraphicsObjectSquare } from '../Debug/DebugGraphicsObjects.js';
import BubblePowerUpComponent from '../Components/PowerUpComponents/BubblePowerUpComponent';
import JetPackPowerUpComponent from '../Components/PowerUpComponents/JetPackPowerUpComponent';
import WingPowerUpComponent from '../Components/PowerUpComponents/WingPowerUpComponent';

export function loadPlayerImage(game) {
    game.load.spritesheet('player_purple', 'assets/Player/player_purple.png', 150, 207);
    game.load.spritesheet('player_brown', 'assets/Player/player_brown.png', 150, 207);
}

export default class Player extends Phaser.Sprite {
    constructor(game, x, y, lives = 3) {
        super(game, x, y, 'player_purple');
        this.group_powerUpBack = game.add.group();
        game.add.existing(this);
        this.group_powerUpFront = game.add.group();

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

        this.coins = {
            bronze: 0,
            silver: 0,
            gold: 0
        };

        this.lives = lives;

        this.HUD = new HUD(game);
        this.HUD.updateHealth(this.health);
        this.HUD.updateLife(this.lives);

        this.powerUpComponent = null;

        if (isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
    }

    isMoving() {
        return this.body.deltaX() !== 0;
    }

    getDeltaMovement() {
        return this.body.deltaX();
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

        if (this.powerUpComponent) {
            this.powerUpComponent.update(cursors, contacts, delta, this);
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

    stopMoving(delta, slowRate = 500) {
        if (this.body.velocity.x !== 0) {
            let dir = this.body.velocity.x > 0 ? -1 : 1;
            let decrementAmount = delta * slowRate * dir;
            let newX = this.body.velocity.x + decrementAmount;

            if ((dir === -1 && newX <= 2) ||
                (dir === 1 && newX >= -2)) {
                //  Stand still
                this.animations.stop();
                this.animations.play('stand');
                this.body.velocity.x = 0;
            }
            else {
                this.body.velocity.x += decrementAmount;
            }
        }
        else {
            //  Stand still
            this.animations.play('stand');
            this.body.velocity.x = 0;
        }
    }

    _handleInput(cursors, contacts, delta) {
        if (this.body.touching.down && this.jumping) {
            this.jumping = false;
            this.animations.play('stand');
        }

        if (this.powerUpComponent &&  this.powerUpComponent.handleHorizontalMovement) {
            this.powerUpComponent.handleHorizontalMovement(cursors, contacts, delta, this);
        }
        else {
            if (cursors.left.isDown) {
                this.goLeft();
            }
            else if (cursors.right.isDown) {
                this.goRight();
            }
            else if (!this.jumping) {
                this.stopMoving(delta);
            }
        }


        if (this.powerUpComponent && this.powerUpComponent.handleJump) {
            this.powerUpComponent.handleJump(cursors, contacts, delta, this);
        }
        //  Allow the player to jump if they are touching the ground.
        else if (cursors.up.isDown && this.body.touching.down && contacts) {
            this.body.velocity.y = -500;
            this.animations.stop();
            this.frame = this.jumpFrame;
            this.jumping = true;
        }

        if (this.body.touching.right || this.body.touching.left) {
            this.body.velocity.x = 0;
        }
    }

    addCoin(type) {
        this.coins[type]++;
        this.HUD.updateCoinAmount(type, this.coins[type]);
    }

    addLife() {
        this.lives++;
        this.HUD.updateLife(this.lives);
    }

    removeLife() {
        this.lives--;
        this.HUD.updateLife(this.lives);
    }

    _removePowerUpComponent() {
        if (this.powerUpComponent) {
            this.powerUpComponent.remove();
        }
    }

    addBubbleComponent() {
        this._removePowerUpComponent();
        this.powerUpComponent = new BubblePowerUpComponent(this.group_powerUpFront, this);
    }

    addJetPackComponent(game) {
        this._removePowerUpComponent();
        this.powerUpComponent = new JetPackPowerUpComponent(this.group_powerUpBack, this, game);
    }

    addWingComponent(game) {
        this._removePowerUpComponent();
        this.powerUpComponent = new WingPowerUpComponent(this.group_powerUpBack, this, game);
    }
}
