import isInDebugMode from '../Debug/Debug';
import { DebugGraphicsObjectCircle } from '../Debug/DebugGraphicsObjects.js';
import Item from './Item.js';

export const COIN_TYPE = {
    BRONZE: 'bronze',
    SILVER: 'silver',
    GOLD: 'gold'
};

export class Coin extends Item {
    constructor(game, x, y, coinType = COIN_TYPE.BRONZE) {
        super(game, x, y, coinType);
        this.coinType = coinType;

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

    static loadCoinImages(game) {
        game.load.spritesheet(COIN_TYPE.BRONZE, 'assets/Items/bronze.png', 84, 84);
        game.load.spritesheet(COIN_TYPE.SILVER, 'assets/Items/silver.png', 84, 84);
        game.load.spritesheet(COIN_TYPE.GOLD, 'assets/Items/gold.png', 84, 84);
    }

    updateItem() {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.body);
        }
    }

    touchItem(player) {
        player.addCoin(this.coinType);
        this.kill();
    }
}
