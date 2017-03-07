import Sky from '../objects/Environment/Sky';
import Player from '../objects/Player/Player';

export default class GameState extends Phaser.State {
    constructor() {
        super();
        this.player = null;
        this.background = null;
    }

    create() {
        this.background = new Sky(this.game);
        this.player = new Player(this.game, 100, 100);
    }

    update() {
        let cursors = this.input.keyboard.createCursorKeys();
        this.player.updatePlayer(cursors, null);
    }
}