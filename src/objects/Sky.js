export class Sky {
	constructor(game) {
    this['bg_1'] = game.add.sprite(0, 0, 'bg_1');
    this['bg_2'] = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_2');
    this['bg_3'] = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_3');
    this['bg_4'] = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_4');

    let dimensionSize = 2048,
        width = game.world.width / dimensionSize,
        height = game.world.height / dimensionSize;
    this['bg_1'].scale.setTo(width, height);
    this['bg_2'].tileScale.setTo(width, height);
    this['bg_3'].tileScale.setTo(width, height);
    this['bg_4'].tileScale.setTo(width, height);

		this.bg2_rate = .2;
		this.bg3_rate = .8;
		this.bg4_rate = 1.5;

		this.directions = {
			left: 1,
			right: -1,
			none: 0
		}
	}

  update(direction = 'none') {
		this['bg_2'].tilePosition.x += this.bg2_rate * this.directions[direction];
		this['bg_3'].tilePosition.x += this.bg3_rate * this.directions[direction];
		this['bg_4'].tilePosition.x += this.bg4_rate * this.directions[direction];
  }
}

export function loadSkyImages(game) {
  game.load.image('bg_1', 'assets/Background/bg_layer1.png');
  game.load.image('bg_2', 'assets/Background/bg_layer2.png');
  game.load.image('bg_3', 'assets/Background/bg_layer3.png');
  game.load.image('bg_4', 'assets/Background/bg_layer4.png');
}
