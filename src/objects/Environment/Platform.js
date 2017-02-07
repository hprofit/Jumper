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
}

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

function loadPlatformImages(game, type) {
    game.load.spritesheet(`g_${type}`, `assets/Environment/ground_${type}.png`, 380, 94); // 152w x 38h
    game.load.spritesheet(`gb_${type}`, `assets/Environment/ground_${type}_broken.png`, 380, 94);
    game.load.spritesheet(`gs_${type}`, `assets/Environment/ground_${type}_small.png`, 201, 100);
    game.load.spritesheet(`gsb_${type}`, `assets/Environment/ground_${type}_small_broken.png`, 201, 100);
}

export function loadCakePlatformImages(game) {
    loadPlatformImages(game, 'cake');
}

export function loadGrassPlatformImages(game) {
    loadPlatformImages(game, 'grass');
}

export function loadSandPlatformImages(game) {
    loadPlatformImages(game, 'sand');
}

export function loadSnowPlatformImages(game) {
    loadPlatformImages(game, 'snow');
}

export function loadStonePlatformImages(game) {
    loadPlatformImages(game, 'stone');
}

export function loadWoodPlatformImages(game) {
    loadPlatformImages(game, 'wood');
}

export function loadAllPlatformImages(game) {
    loadCakePlatformImages(game);
    loadGrassPlatformImages(game);
    loadSandPlatformImages(game);
    loadSnowPlatformImages(game);
    loadStonePlatformImages(game);
    loadWoodPlatformImages(game);
}
