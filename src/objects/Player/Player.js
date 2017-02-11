import isInDebugMode from '../Debug';
import HUD from './HUD.js'
import { DebugGraphicsObjectSquare } from '../DebugGraphicsObjects.js';
import BubblePowerUpComponent from '../Components/PowerUpComponents/BubblePowerUpComponent';
import JetPackPowerUpComponent from '../Components/PowerUpComponents/JetPackPowerUpComponent';
import WingPowerUpComponent from '../Components/PowerUpComponents/WingPowerUpComponent';

export function loadPlayerImage(game) {
    game.load.spritesheet('player_purple', 'assets/Player/player_purple.png', 150, 207);
    game.load.spritesheet('player_brown', 'assets/Player/player_brown.png', 150, 207);
}

export default class Player {
    constructor(game, x, y, lives = 3) {
        this.group_powerUpBack = game.add.group();
        //this.sprite = game.add.sprite(x, y, 'player_brown');
        this.sprite = game.add.sprite(x, y, 'player_purple');
        this.group_powerUpFront = game.add.group();

        game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = 900;
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
        return this.sprite.body.deltaX() !== 0;
    }

    getDeltaMovement() {
        return this.sprite.body.deltaX();
    }

    getVelocity() {
        return this.sprite.body.velocity.x;
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
    update(cursors, contacts, delta) {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.sprite.body);
        }

        if (this.powerUpComponent) {
            this.powerUpComponent.update(cursors, contacts, delta, this);
        }

        if (this.isHurt && this.hurtTimer < this.invincibleTimer) {
            this.hurtTimer += delta;
            // Toggle alpha to display "hurt status"
            this.sprite.alpha = parseInt((this.hurtTimer / .1), 10) % 2 === 0 ? 0.25 : 1;

            if (this.hurtTimer >= this.invincibleTimer) {
                this.isHurt = false;
                this.sprite.alpha = 1;
            }
            else if (!this.moveEnabled && this.hurtTimer < this.maxHurtTimer) {
                return;
            }
            else if (!this.moveEnabled) {
                this.moveEnabled = true;
                this.sprite.body.velocity.x = 0;
                this.sprite.body.bounce.y = 0;
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

        this.sprite.animations.stop();
        this.sprite.frame = this.hurtFrame;

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
            this.sprite.body.velocity.y = -250;
            this.sprite.body.bounce.y = 0.3;
            this._hurtPlayer(damage);
        }
    }

    touchHurtPlayer(enemy) {
        if (enemy.doesDamage) {
            if (this.powerUpComponent && this.powerUpComponent.takeHit) {
                this._powerUpTakeHit();
            }
            else {
                let direction = this.sprite.body.x - enemy.sprite.body.x; // negative is left
                this.sprite.body.velocity.x = 150 * (direction / Math.abs(direction));

                this.sprite.body.velocity.y = -150;
                this.sprite.body.bounce.y = 0.2;
                this._hurtPlayer(enemy.touchDamage);
            }
        }
    }

    canBeHurt() {
        return !this.isHurt;
    }
    
    jump(velocity = -500) {
        this.sprite.body.velocity.y = velocity;
        this.sprite.animations.stop();
        this.sprite.frame = this.jumpFrame;
        this.jumping = true;
    }
    
    goLeft(velocity = -150) {
        this.sprite.body.velocity.x = velocity;
        if (!this.jumping) {
            this.sprite.animations.play('walk');
        }
        this.sprite.scale.x = this.left;
    }

    goRight(velocity = 150) {
        this.sprite.body.velocity.x = velocity;
        if (!this.jumping) {
            this.sprite.animations.play('walk');
        }
        this.sprite.scale.x = this.right;
    }

    stopMoving(delta, slowRate = 500) {
        if (this.sprite.body.velocity.x !== 0) {
            let dir = this.sprite.body.velocity.x > 0 ? -1 : 1;
            let decrementAmount = delta * slowRate * dir;
            let newX = this.sprite.body.velocity.x + decrementAmount;

            if ((dir === -1 && newX <= 2) ||
                (dir === 1 && newX >= -2)) {
                //  Stand still
                this.sprite.animations.stop();
                this.sprite.animations.play('stand');
                this.sprite.body.velocity.x = 0;
            }
            else {
                this.sprite.body.velocity.x += decrementAmount;
            }
        }
        else {
            //  Stand still
            this.sprite.animations.play('stand');
            this.sprite.body.velocity.x = 0;
        }
    }

    _handleInput(cursors, contacts, delta) {
        if (this.sprite.body.touching.down && this.jumping) {
            this.jumping = false;
            this.sprite.animations.play('stand');
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
        else if (cursors.up.isDown && this.sprite.body.touching.down && contacts) {
            this.sprite.body.velocity.y = -500;
            this.sprite.animations.stop();
            this.sprite.frame = this.jumpFrame;
            this.jumping = true;
        }

        if (this.sprite.body.touching.right || this.sprite.body.touching.left) {
            this.sprite.body.velocity.x = 0;
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
