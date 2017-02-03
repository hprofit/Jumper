export class Platform {
    constructor(game, x, y, type, subType, owningGroup = null, hovers = false) {
        if (!owningGroup) {
            this.sprite = game.add.sprite(x, y, subType + type.toLowerCase());
        }
        else {
            this.sprite = owningGroup.create(x, y, subType + type.toLowerCase());
        }
        this.sprite.scale.setTo(.4, .4);
        this.sprite.body.immovable = true;
        this.hovers = hovers;
    }

    update() {
    }
}

export const PlatformTypes = {
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
