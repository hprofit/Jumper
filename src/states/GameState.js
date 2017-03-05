import Sky from '../objects/Environment/Sky';

import { Platform, PlatformTypes, PlatformSubtypes } from '../objects/Environment/Platform';
import Player from '../objects/Player/Player';

export default class GameState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.sky = null;
        this.group_platforms = null;
        this.player = null;

        this.game.world.resize(6016, this.game.world.height);
    }

    create() {
        this.sky = new Sky(this.game);

        this.group_platforms = this.game.add.group();
        this.group_platforms.physicsBodyType = Phaser.Physics.ARCADE;
        this.group_platforms.enableBody = true;
        for (let idx = 0; idx < 100; idx++) {
            let x = 128 * idx;
            new Platform(this.game, x, 576, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, this.group_platforms);
            new Platform(this.game, x, 0,   PlatformTypes.GRASS, PlatformSubtypes.NORMAL, this.group_platforms);
        }

        this.player = new Player(this.game, this.game.scale.width / 2, this.game.world.height - 300);

        this.game.camera.follow(this.player);
    }

    update() {
        let hitPlatforms = this.physics.arcade.collide(this.player, this.group_platforms);

        let cursors = this.input.keyboard.createCursorKeys();
        this.player.updatePlayer(cursors, hitPlatforms);

        this.sky.update(this.player.getVelocity(), this.time.physicsElapsed);
    }
}