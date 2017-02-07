import isInDebugMode from '../Debug';
import { DebugGraphicsObjectSquare } from '../DebugGraphicsObjects.js';

export default class Enemy {
    constructor(game, x, y, spriteName) {
        this.sprite = game.add.sprite(x, y, spriteName);

        // Default physics options for Enemy
        game.physics.arcade.enable(this.sprite);

        this.sprite.body.gravity.y = 900;
        //this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor.setTo(.5, .5);

        this.touchDamage = 0;
        this.doesDamage = true;

        if (isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
    }

    update() {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.sprite.body);
        }
    }
}
