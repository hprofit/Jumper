export default class Item extends Phaser.Sprite {
    constructor(game, x, y, key, defaultFrame) {
        super(game, x, y, key, defaultFrame);
        game.add.existing(this);
    }

    updateItem() {
    }

    touchItem(player, game) {
    }
}
