import preloadImages from './ImagePreloader.js';
import PhysicsService from './PhysicsService.js';
import SpikeMan from '../objects/Enemies/SpikeMan.js';
import WingMan from '../objects/Enemies/WingMan.js';
import Sky from '../objects/Environment/Sky.js';
import Coin from '../objects/Items/Coin.js';
import { Platform, PlatformTypes, PlatformSubtypes } from '../objects/Environment/Platform.js';
import Player from '../objects/Player/Player.js';
import MathExtensions from '../MathExtensions';

export default class GameState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        preloadImages(this.game);
        this.PhysicsService = new PhysicsService();

        this.sky = null;
        this.group_platforms = null;
        this.items = [];
        this.enemies = [];
        this.player = null;

        this.previousTime = 0;
    }

    create() {
        this.sky = new Sky(this.game);

        this.group_platforms = this.game.add.group();
        this.group_platforms.enableBody = true;
        for (let idx = 0; idx < 100; idx++) {
            let x = 128 * idx, y = 576;
            new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, x, y, x, y, this.group_platforms);
        }
        for (let idx = 0; idx < 18; idx++) {
            let y = idx * 32;
            new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.SMALL, -32, y, -32, y, this.group_platforms);
        }

        // let max = 20;
        // for (let idx = 0; idx < max; idx++) {
        //     let tmp = MathExtensions.plotOnBell(idx / max) * -100;
        //     this.items.push(new Coin(this.game, 'bronze', 300 + idx * 35, 200 + tmp));
        //     this.items.push(new Coin(this.game, 'silver', 300 + idx * 35, 150 + tmp));
        //     this.items.push(new Coin(this.game, 'gold', 300 + idx * 35, 100 + tmp));
        // }

        // this.enemies.push(new SpikeMan(this.game, 1000, 100));
        // this.enemies.push(new WingMan(this.game, 600, 480));
        this.enemies.push(new WingMan(this.game, 700, 480, 700, 480, true));

        this.player = new Player(this.game, this.game.scale.width / 2, this.game.world.height - 300);
    }

    getDeltaTime() {
        let elapsedTime = this.game.time.totalElapsedSeconds();
        let deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;
        return deltaTime;
    }

    updateWorldMovement(playerIsMoving, deltaMove) {
        if (playerIsMoving && deltaMove !== 0) {
            this.sky.update(deltaMove > 0 ? 'right' : 'left');
            this.group_platforms.x -= deltaMove;
            for (let enemy of this.enemies) {
                enemy.sprite.x -= deltaMove;
            }
            for (let item of this.items) {
                item.sprite.x -= deltaMove;
            }
            this.player.sprite.x -= deltaMove; // Cancel out player movement
        }
        else {
            this.sky.update('none');
        }
    }

    update() {
        let deltaTime = this.getDeltaTime();

        let enemiesThatHitPlatforms = this.PhysicsService.collideArrayAndGroup(this.game, this.enemies, this.group_platforms);
        for (let enemy of this.enemies) {
            enemy.update(deltaTime);
        }
        for (let item of this.items) {
            item.update();
        }

        let hitPlatforms = this.PhysicsService.collideGroups(this.game, this.player.sprite, this.group_platforms);

        let hitEnemies = this.PhysicsService.overlapArrayAndEntity(this.game, this.enemies, this.player, this.player.hurtPlayer, this.player.canBeHurt, this.player);
        for (let enemy of hitEnemies) {
            this.player.doDamage(enemy.touchDamage);
        }

        let hitItems = this.PhysicsService.overlapArrayAndEntity(this.game, this.items, this.player);
        for (let item of hitItems) {
            item.touchItem(this.player);
        }

        let cursors = this.game.input.keyboard.createCursorKeys();
        this.player.update(cursors, hitPlatforms, deltaTime);

        this.updateWorldMovement(this.player.isMoving(), this.player.getDeltaMovement());
    }
}
