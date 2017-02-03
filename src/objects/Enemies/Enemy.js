export default class Enemy {
    constructor(game, x, y, spriteName) {
        this.sprite = game.add.sprite(x, y, spriteName);
        // Default physics options for Enemy
        game.physics.arcade.enable(this.sprite);
        this.sprite.body.gravity.y = 300;
        this.sprite.body.collideWorldBounds = true;
        this.sprite.anchor.setTo(.5, .5);

        this.touchDamage = 0;
    }

    update() {
    }
}
