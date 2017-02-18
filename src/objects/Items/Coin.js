import DebugService from '../Debug/Debug';
import { DebugGraphicsObjectCircle } from '../Debug/DebugGraphicsObjects.js';
import Item from './Item.js';

export const COIN_TYPE = {
    BRONZE: 'bronze',
    SILVER: 'silver',
    GOLD: 'gold'
};

let COIN_IMAGE_URL = {
    BRONZE: 'Items/Coins/bronze_',
    SILVER: 'Items/Coins/silver_',
    GOLD: 'Items/Coins/gold_'
};

let COIN_FRAME_RATE = 10;
export class Coin extends Item {
    constructor(game, x, y, coinType = COIN_TYPE.BRONZE) {
        let coinURL = COIN_IMAGE_URL[coinType.toUpperCase()];
        super(game, x, y, 'bunnyJumperSheet', `${coinURL}0.png`);
        this.coinType = coinType;

        game.physics.arcade.enable(this);

        this.anchor.setTo(.5, .5);
        this.width = 32;
        this.height = 32;
        this.body.setCircle(16, 42, 42);

        this.forwardFrames = Phaser.Animation.generateFrameNames(`${coinURL}`, 0, 3, '.png');
        this.backwardFrames = Phaser.Animation.generateFrameNames(`${coinURL}`, 1, 2, '.png');
        this.backwardFrames.reverse();

        this.spinForward = this.animations.add('spinForward', this.forwardFrames);
        this.spinForward.onComplete.add(this._playBackward, this);

        this.spinReverse = this.animations.add('spinReverse', this.backwardFrames);
        this.spinReverse.onComplete.add(this._playForward, this);

        this.spinForward.play(COIN_FRAME_RATE);

        if (DebugService.isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectCircle(game);
        }
    }

    _playBackward() {
        this.scale.x *= -1;
        this.spinReverse.play(COIN_FRAME_RATE);
    }

    _playForward() {
        this.scale.x *= -1;
        this.spinForward.play(COIN_FRAME_RATE);
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
