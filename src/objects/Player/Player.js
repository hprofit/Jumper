export default class Player extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'player_purple');
    }

    static loadPlayerImage(game) {
        game.load.spritesheet('player_purple', 'assets/Player/player_purple.png', 150, 207);
    }

    updatePlayer(cursors, contacts) {
        this._handleInput(cursors, contacts);
    }

    _handleInput(cursors, contacts) {
    }
}
