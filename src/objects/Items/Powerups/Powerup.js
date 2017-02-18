import Item from './../Item';

export const POWER_UP_TYPES = {
    BUBBLE: 'Items/PowerUpIcons/bubble.png',
    BUNNY: 'Items/PowerUpIcons/bunny.png',
    JET_PACK: 'Items/PowerUpIcons/jetpack.png',
    WINGS: 'Items/PowerUpIcons/wings.png'
};

export class PowerUp extends Item {
    constructor(game, x, y, type) {
        super(game, x, y, 'bunnyJumperSheet', type);
        game.physics.arcade.enable(this);
        this.width = 32;
        this.height = 32;

        this.tween = game.add.tween(this).to( { y: y - 10 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
    }

    touchItem(player) {
        this.kill();
    }
}
