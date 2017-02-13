export const PlatformTypes = {
    CAKE: 'cake',
    GRASS: 'grass',
    SAND: 'sand',
    SNOW: 'snow',
    STONE: 'stone',
    WOOD: 'wood'
};

export const PlatformSubtypes = {
    NORMAL: 'g_',
    BROKEN: 'gb_',
    SMALL: 'gs_',
    SMALL_BROKEN: 'gsb_'
};

export class Platform {
    constructor(game, type, subType, x, y, owningGroup = null) {

        this.type = type;
        this.subType = subType;

        if (!owningGroup) {
            this.sprite = game.add.sprite(x, y, subType + type);
        }
        else {
            this.sprite = owningGroup.create(x, y, subType + type);
        }
        game.physics.arcade.enable(this.sprite);

        if (subType === PlatformSubtypes.NORMAL || subType === PlatformSubtypes.BROKEN) {
            this.sprite.height = 32;
            this.sprite.width = 128;
        }
        if (subType === PlatformSubtypes.SMALL || subType === PlatformSubtypes.SMALL_BROKEN) {
            this.sprite.height = 32;
            this.sprite.width = 64;
        }
        this.sprite.body.immovable = true;
    }

    update() {
    }

    static loadPlatformImages(game, type) {
        game.load.spritesheet(`g_${type}`, `assets/Environment/ground_${type}.png`, 380, 94); // 152w x 38h
        game.load.spritesheet(`gb_${type}`, `assets/Environment/ground_${type}_broken.png`, 380, 94);
        game.load.spritesheet(`gs_${type}`, `assets/Environment/ground_${type}_small.png`, 201, 100);
        game.load.spritesheet(`gsb_${type}`, `assets/Environment/ground_${type}_small_broken.png`, 201, 100);
    }

    static loadCakePlatformImages(game) {
        this.loadPlatformImages(game, 'cake');
    }

    static loadGrassPlatformImages(game) {
        this.loadPlatformImages(game, 'grass');
    }

    static loadSandPlatformImages(game) {
        this.loadPlatformImages(game, 'sand');
    }

    static loadSnowPlatformImages(game) {
        this.loadPlatformImages(game, 'snow');
    }

    static loadStonePlatformImages(game) {
        this.loadPlatformImages(game, 'stone');
    }

    static loadWoodPlatformImages(game) {
        this.loadPlatformImages(game, 'wood');
    }

    static loadAllPlatformImages(game) {
        this.loadCakePlatformImages(game);
        this.loadGrassPlatformImages(game);
        this.loadSandPlatformImages(game);
        this.loadSnowPlatformImages(game);
        this.loadStonePlatformImages(game);
        this.loadWoodPlatformImages(game);
    }
}