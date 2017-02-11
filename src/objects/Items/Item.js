export default class Item extends Phaser.Sprite {
    constructor(game, x, y, key) {
        super(game, x, y, key);
        game.add.existing(this);
    }

    updateItem() {
    }

    touchItem(player, game) {
    }
}
