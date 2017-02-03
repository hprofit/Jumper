import Enemy from './Enemy.js';

export class SpikeMan extends Enemy {
	constructor(game, x, y) {
    super(game, x, y, 'spikeMan');

    this.sprite.scale.setTo(.4, .4);
    this.sprite.scale.x *= -1;
    // this.sprite.scale.y *= -1;

    this.standFrame = 0;
    this.jumpFrame = 1;
    this.sprite.animations.add('walking', [2, 3], 5, true);

		this.touchDamage = 1;
	}

  update() {
    this.sprite.animations.play('walking');
  }
}

export function loadSpikeManImage(game) {
  game.load.spritesheet('spikeMan', 'assets/Enemies/spikeMan.png', 120, 159); // 480 x 159
}
