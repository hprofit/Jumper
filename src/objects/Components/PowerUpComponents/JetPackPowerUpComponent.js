import PowerUpComponent from './PowerUpComponent';

export function loadJetPackPowerUpImage(game) {
    game.load.image('jetPack', 'assets/Items/PowerUpSprites/jetpack.png');
    game.load.image('flame', 'assets/Particles/flame.png');
}

export default class JetPackPowerUpComponent extends PowerUpComponent {
    constructor(group, player, game) {
        super();
        this.sprite = group.create(player.sprite.x, player.sprite.y, 'jetPack');
        this.sprite.anchor.setTo(.5, .5);
        this.sprite.width = 48;
        this.sprite.height = 48;

        this.flameSpriteLeft = group.create(this.sprite.x - 16, this.sprite.y + 24, 'flame');
        this.flameSpriteLeft.anchor.setTo(.5, 0);
        this.flameSpriteLeft.width = 16;
        this.flameSpriteLeft.height = 32;
        this.flameSpriteLeft.alpha = 0;

        this.flameSpriteRight = group.create(this.sprite.x + 16, this.sprite.y + 24, 'flame');
        this.flameSpriteRight.anchor.setTo(.5, 0);
        this.flameSpriteRight.width = 16;
        this.flameSpriteRight.height = 32;
        this.flameSpriteRight.alpha = 0;

        //this.tweenLeft = game.add.tween(this.flameSpriteLeft.scale).to({y:.5}, 100, null, false, 0, -1, true);
        //this.tweenRight = game.add.tween(this.flameSpriteRight.scale).to({y:.5}, 100, null, false, 0, -1, true);


        this.flightTimer = 0;
        this.flightMax = 1.5;

        this.fireTimer = 0;
    }

    _startFire() {
        this.flameSpriteLeft.alpha = 1;
        this.flameSpriteRight.alpha = 1;
    }

    _stopFire() {
        this.flameSpriteLeft.alpha = 0;
        this.flameSpriteRight.alpha = 0;
    }

    handleHorizontalMovement(cursors, contacts, delta, player) {
        if (cursors.left.isDown) {
            player.goLeft(-200);
        }
        else if (cursors.right.isDown) {
            player.goRight(200);
        }
        else if (!player.jumping) {
            player.stopMoving(delta, 400);
        }
    }

    handleJump(cursors, contacts, delta, player) {
        if (cursors.up.isDown && this.flightTimer < this.flightMax) {
            if (this.flightTimer === 0) {
                this._startFire();
            }
            player.jump(-300);
            this.flightTimer += delta;
            if (this.flightTimer >= this.flightMax) {
                this.flightTimer = this.flightMax;
            }
        }
        if (player.jumping && this.flightTimer < this.flightMax) {
            this.fireTimer += delta;
            this.flameSpriteLeft.height = parseInt((this.fireTimer / .05), 10) % 2 === 0 ? 20 : 32;
            this.flameSpriteRight.height = parseInt((this.fireTimer / .05), 10) % 2 === 0 ? 20 : 32;
        }
        else {
            this._stopFire();
        }

        if (player.sprite.body.touching.down && contacts) {
            this.flightTimer = 0;
            this._stopFire();
        }
    }

    remove() {
        this.sprite.kill();
        this.flameSpriteLeft.kill();
        this.flameSpriteRight.kill();
    }

    update(cursors, contacts, delta, player) {
        this.sprite.x = player.sprite.x;
        this.sprite.y = player.sprite.y;

        this.flameSpriteLeft.x = this.sprite.x - 16;
        this.flameSpriteLeft.y = this.sprite.y + 24;

        this.flameSpriteRight.x = this.sprite.x + 16;
        this.flameSpriteRight.y = this.sprite.y + 24;
    }
}