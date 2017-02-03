import Item from './Item.js';

export class Coin extends Item {
	constructor(game, x, y, type) {
    super();
		this.type = type.toLowerCase();
    this.sprite = game.add.sprite(x, y, this.type);

		game.physics.arcade.enable(this.sprite);
    this.sprite.scale.setTo(.4, .4);
    this.sprite.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
    this.sprite.animations.play('spin');

    // this.sprite.anchor.setTo(.5, .5);
    // this.sprite.scale.x *= -1;
	}

  update() {
  }

	touchItem(player) {
		player.addCoin(this.type);
		this.sprite.kill();
	}
}

export function loadCoinImages(game) {
  game.load.spritesheet('bronze', 'assets/Items/bronze.png', 84, 84);
  game.load.spritesheet('silver', 'assets/Items/silver.png', 84, 84);
  game.load.spritesheet('gold', 'assets/Items/gold.png', 84, 84);
}
