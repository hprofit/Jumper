import Enemy from './Enemy.js';

export class SpikeMan extends Enemy {
    constructor(game, x, y) {
        super(game, x, y, 'spikeMan');

        //this.sprite.scale.setTo(.4, .4);
        this.sprite.height = 64;
        this.sprite.width = 48;
        this.sprite.scale.x *= -1;
        // this.sprite.scale.y *= -1;

        this.standFrame = 0;
        this.jumpFrame = 1;
        this.sprite.animations.add('walking', [2, 3], 5, true);
        this.sprite.frame = this.standFrame;

        this.touchDamage = 1;

        // Debug
        this.graphics1 = game.add.graphics(0, 0);
        this.graphics2 = game.add.graphics(0, 0);
        this.graphics3 = game.add.graphics(0, 0);
        this.graphics4 = game.add.graphics(0, 0);

        console.log(this.sprite.height);
        this.sprite.body.setSize(30, this.sprite.height, 0, 0);
    }

    update() {
        //this.sprite.animations.play('walking');

        // Debug
        this.graphics1.reset(this.sprite.body.x, this.sprite.body.y);
        this.graphics1.beginFill(0xFFFFFF, 1);
        this.graphics1.drawCircle(0, 0, 5);
        this.graphics1.endFill();

        this.graphics2.reset(this.sprite.body.x + this.sprite.body.width, this.sprite.body.y);
        this.graphics2.beginFill(0x0000FF, 1);
        this.graphics2.drawCircle(0, 0, 5);
        this.graphics2.endFill();

        this.graphics3.reset(this.sprite.body.x, this.sprite.body.y + this.sprite.body.height);
        this.graphics3.beginFill(0xFF0000, 1);
        this.graphics3.drawCircle(0, 0, 5);
        this.graphics3.endFill();

        this.graphics4.reset(this.sprite.body.x + this.sprite.body.width, this.sprite.body.y + this.sprite.body.height);
        this.graphics4.beginFill(0xFF00FF, 1);
        this.graphics4.drawCircle(0, 0, 5);
        this.graphics4.endFill();

        //console.log(this.sprite.body);
    }

    wander() {

    }
}

export function loadSpikeManImage(game) {
    game.load.spritesheet('spikeMan', 'assets/Enemies/spikeMan.png', 120, 159); // 480 x 159
}
