import GameState from './states/GameState';

class Game extends Phaser.Game {
	constructor() {
		super(800, 600, Phaser.AUTO, 'content', new GameState());
	}
}

new Game();
