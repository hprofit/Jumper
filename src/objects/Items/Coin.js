import isInDebugMode from '../Debug';
import { DebugGraphicsObjectCircle } from '../DebugGraphicsObjects.js';
import Item from './Item.js';

export class Coin extends Item {
    constructor(game, type, x, y, worldX = x, worldY = y) {
        super(worldX, worldY);
        this.type = type.toLowerCase();
        this.sprite = game.add.sprite(x, y, this.type);

        game.physics.arcade.enable(this.sprite);

        this.sprite.anchor.setTo(.5, .5);
        this.sprite.width = 32;
        this.sprite.height = 32;
        this.sprite.body.setCircle(16, 42, 42);

        this.sprite.animations.add('spin', [0, 1, 2, 3, 4, 5], 10, true);
        this.sprite.animations.play('spin');

        if (isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectCircle(game);
        }
    }

    update() {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.sprite.body);
        }
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
