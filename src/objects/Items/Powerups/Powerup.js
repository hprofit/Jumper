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
    constructor(game, type, x, y) {
        super();

        this.type = type;
        this.sprite = game.add.sprite(x, y, this.type);
        game.physics.arcade.enable(this.sprite);
        this.sprite.width = 32;
        this.sprite.height = 32;

        this.tween = game.add.tween(this.sprite).to( { y: y - 10 }, 1000, 'Linear', true, 0, -1, true);
    }

    update() {

    }

    touchItem(player) {
        this.sprite.kill();
    }
}
