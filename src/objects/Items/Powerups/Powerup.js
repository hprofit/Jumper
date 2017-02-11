import Item from './../Item';

export const PowerUpTypes = {
    BUBBLE: 'powerUpBubble',
    BUNNY: 'powerUpBunny',
    JET_PACK: 'powerUpJetPack',
    WINGS: 'powerUpWings'
};

export function loadPowerUpImages(game) {
    game.load.spritesheet('powerUpBubble', 'assets/Items/PowerUpIcons/powerup_bubble.png', 71, 70);
    game.load.spritesheet('powerUpBunny', 'assets/Items/PowerUpIcons/powerup_bunny.png', 71, 70);
    game.load.spritesheet('powerUpJetPack', 'assets/Items/PowerUpIcons/powerup_jetpack.png', 71, 70);
    game.load.spritesheet('powerUpWings', 'assets/Items/PowerUpIcons/powerup_wings.png', 71, 70);
}

export class PowerUp extends Item {
    constructor(game, x, y, type) {
        super(game, x, y, type);

        this.type = type;
        game.physics.arcade.enable(this);
        this.width = 32;
        this.height = 32;

        this.tween = game.add.tween(this).to( { y: y - 10 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
    }

    touchItem(player) {
        this.kill();
    }
}
