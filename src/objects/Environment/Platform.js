const PlatformBase = 'Environment/Platform/';

export const PlatformTypes = {
    CAKE: `${PlatformBase}Cake/`,
    GRASS: `${PlatformBase}Grass/`,
    SAND: `${PlatformBase}Sand/`,
    SNOW: `${PlatformBase}Snow/`,
    STONE: `${PlatformBase}Stone/`,
    WOOD: `${PlatformBase}Wood/`
};

export const PlatformSubtypes = {
    NORMAL: 'large.png',
    BROKEN: 'large_broken.png',
    SMALL: 'small.png',
    SMALL_BROKEN: 'small_broken.png'
};

export class Platform extends Phaser.Sprite {
    constructor(game, x, y, type, subType, owningGroup = null) {
        super(game, x, y, 'bunnyJumperSheet', type + subType);

        if (!owningGroup) {
            game.add.existing(this);
        }
        else {
            owningGroup.add(this);
        }

        if (subType === PlatformSubtypes.NORMAL || subType === PlatformSubtypes.BROKEN) {
            this.height = 32;
            this.width = 128;
        }
        else if (subType === PlatformSubtypes.SMALL || subType === PlatformSubtypes.SMALL_BROKEN) {
            this.height = 32;
            this.width = 64;
        }
        this.body.immovable = true;
    }
}