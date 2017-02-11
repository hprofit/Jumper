import isInDebugMode from '../Debug/Debug';
import { DebugGraphicsObjectCircle } from '../Debug/DebugGraphicsObjects.js';
import Item from './Item.js';

export function loadCoinImages(game) {
    game.load.spritesheet('bronze', 'assets/Items/bronze.png', 84, 84);
    game.load.spritesheet('silver', 'assets/Items/silver.png', 84, 84);
    game.load.spritesheet('gold', 'assets/Items/gold.png', 84, 84);
}

export default class Coin extends Item {
    constructor(game, type, x, y) {
        type = type.toLowerCase();
        super(game, x, y, type);
        this.type = type;

        game.physics.arcade.enable(this);

        this.anchor.setTo(.5, .5);
        this.width = 32;
        this.height = 32;
        this.body.setCircle(16, 42, 42);

        this.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
        this.animations.play('spin');

        if (isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectCircle(game);
        }
    }

    updateItem() {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.body);
        }
    }

    touchItem(player) {
        player.addCoin(this.type);
        this.kill();
    }
}
