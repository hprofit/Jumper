import isInDebugMode from '../Debug';
import HUD from './HUD.js'
import { DebugGraphicsObjectSquare } from '../DebugGraphicsObjects.js';

export function loadPlayerImage(game) {
    game.load.spritesheet('player_purple', 'assets/Player/player_purple.png', 150, 207);
    game.load.spritesheet('player_brown', 'assets/Player/player_brown.png', 150, 207);
}

export default class Player {
    constructor(game, x, y, worldX = x, worldY = y) {
        this.sprite = game.add.sprite(x, y, 'player_brown');
        this.worldX = worldX;
        this.worldY = worldY;
        // TODO: DELETE
        //this.worldXText = game.add.text(470, 16, `WX: ${this.worldX}`, {fontSize: '20px'});
        //this.worldYText = game.add.text(470, 40, `WY: ${this.worldY}`, {fontSize: '20px'});

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
        this.hurtTimer = 0;
        this.maxHurtTimer = .5;
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

    update(cursors, contacts, delta) {
        if (this.hurtTimer > 0) {
            this.hurtTimer -= delta;
        }
        if (this.hurtTimer <= 0 && contacts && this.isHurt) {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
            this.sprite.body.bounce.y = 0;
            this.isHurt = false;
        }

        if (!this.isHurt) {
            this.handleInput(cursors, contacts);
        }

        if (this.debugGraphics) {
            this.debugGraphics.render(this.sprite.body);
        }

        this.worldX += this.sprite.body.deltaX();
        this.worldY += this.sprite.body.deltaY();

        // TODO: DELETE
        //this.worldXText.text = `WX: ${this.worldX}`;
        //this.worldYText.text = `WY: ${this.worldY}`;
    }

    // player, enemy
    hurtPlayer(first, second) {
        let direction = first.x - second.x; // negative is left
        this.sprite.body.velocity.x = 150 * (direction / Math.abs(direction));

        this.sprite.body.velocity.y = -150;
        this.sprite.body.bounce.y = 0.2;
        this.hurtTimer = this.maxHurtTimer;
        this.isHurt = true;

        this.sprite.animations.stop();
        this.sprite.frame = this.hurtFrame;

        this.HUD.updateHealth(this.health);
    }

    canBeHurt() {
        return this.hurtTimer <= 0;
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
            // this.sprite.animations.stop();
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

    doDamage(damage) {
        this.health -= damage;

        if (this.health <= 0) {
            this.health = 0;
            console.log("Dead");
        }
    }
}
