import { turnDebugModeOn, turnDebugModeOff } from './objects/Debug.js';
import GameState from './states/GameState';

turnDebugModeOff();
// turnDebugModeOn();

class Game extends Phaser.Game {
    constructor() {
        super(800, 608, Phaser.AUTO, 'content', new GameState());
    }
}

new Game();
