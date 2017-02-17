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
        game.physics.arcade.enable(this);

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

    //static loadPlatformImages(game, type) {
    //    game.load.spritesheet(`g_${type}`, `assets/Environment/ground_${type}.png`, 380, 94); // 152w x 38h
    //    game.load.spritesheet(`gb_${type}`, `assets/Environment/ground_${type}_broken.png`, 380, 94);
    //    game.load.spritesheet(`gs_${type}`, `assets/Environment/ground_${type}_small.png`, 201, 100);
    //    game.load.spritesheet(`gsb_${type}`, `assets/Environment/ground_${type}_small_broken.png`, 201, 100);
    //}
    //
    //static loadCakePlatformImages(game) {
    //    this.loadPlatformImages(game, 'cake');
    //}
    //
    //static loadGrassPlatformImages(game) {
    //    this.loadPlatformImages(game, 'grass');
    //}
    //
    //static loadSandPlatformImages(game) {
    //    this.loadPlatformImages(game, 'sand');
    //}
    //
    //static loadSnowPlatformImages(game) {
    //    this.loadPlatformImages(game, 'snow');
    //}
    //
    //static loadStonePlatformImages(game) {
    //    this.loadPlatformImages(game, 'stone');
    //}
    //
    //static loadWoodPlatformImages(game) {
    //    this.loadPlatformImages(game, 'wood');
    //}
    //
    //static loadAllPlatformImages(game) {
    //    this.loadCakePlatformImages(game);
    //    this.loadGrassPlatformImages(game);
    //    this.loadSandPlatformImages(game);
    //    this.loadSnowPlatformImages(game);
    //    this.loadStonePlatformImages(game);
    //    this.loadWoodPlatformImages(game);
    //}
}