import preloadImages from './ImagePreloader';
import PhysicsService from './PhysicsService';

import SpikeMan from '../objects/Enemies/SpikeMan';
import WingMan from '../objects/Enemies/WingMan';
import FlyMan from '../objects/Enemies/FlyMan';
import SpikeBall from '../objects/Enemies/SpikeBall';
import SpringMan from '../objects/Enemies/SpringMan';
import Sun from '../objects/Enemies/Sun';
import Cloud from '../objects/Enemies/Cloud';

import { Spikes, SpikeTypes } from '../objects/Environment/Spikes';
import Sky from '../objects/Environment/Sky';

import Coin from '../objects/Items/Coin';
import { Portal, PortalTypes } from '../objects/Items/Portal';

import { Platform, PlatformTypes, PlatformSubtypes } from '../objects/Environment/Platform';
import Player from '../objects/Player/Player';
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
        this.group_hazards = null;
        this.player = null;

        this.previousTime = 0;
    }

    create() {
        this.sky = new Sky(this.game);

        this.group_platforms = this.game.add.group();
        this.group_platforms.enableBody = true;
        for (let idx = 0; idx < 100; idx++) {
            let x = 128 * idx, y = 576;
            new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, x, y, this.group_platforms);
            new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, x, 0, this.group_platforms);
        }
        for (let idx = 1; idx < 18; idx++) {
            let y = idx * 32;
            new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.SMALL, 0, y, this.group_platforms);
        }

        this.group_hazards = this.game.add.group();
        this.group_hazards.enableBody = true;
        new Spikes(this.game, SpikeTypes.SPIKE_UP, 100, this.game.world.height - 80, this.group_hazards);
        new Spikes(this.game, SpikeTypes.SPIKE_DOWN, 200, 32, this.group_hazards);
        new Spikes(this.game, SpikeTypes.SPIKES_UP, 200, this.game.world.height - 80, this.group_hazards);
        new Spikes(this.game, SpikeTypes.SPIKES_DOWN, 300, 32, this.group_hazards);

         let max = 20;
         for (let idx = 0; idx < max; idx++) {
             let tmp = MathExtensions.plotOnBell(idx / max) * -100;
             this.items.push(new Coin(this.game, 'bronze', 300 + idx * 35, 200 + tmp));
             this.items.push(new Coin(this.game, 'silver', 300 + idx * 35, 250 + tmp));
             this.items.push(new Coin(this.game, 'gold', 300 + idx * 35, 300 + tmp));
             this.items.push(new Coin(this.game, 'silver', 300 + idx * 35, 350 + tmp));
             this.items.push(new Coin(this.game, 'bronze', 300 + idx * 35, 400 + tmp));
         }

        // TODO: EXPERIMENTAL
        //let p1 = new Portal(this.game, PortalTypes.ORANGE, 600, this.game.world.height - 64);
        //let p2 = new Portal(this.game, PortalTypes.ORANGE, 600, 32, false);
        //p1.linkToPortal(p2);
        //p2.linkToPortal(p1);
        //this.items.push(p1);
        //this.items.push(p2);

        //this.enemies.push(new SpikeMan(this.game, 1000, 100));
        //this.enemies.push(new WingMan(this.game, 600, 480));
        //this.enemies.push(new WingMan(this.game, 700, 300, true, 100));
        //this.enemies.push(new FlyMan(this.game, 100, this.game.world.height - 150));
        //this.enemies.push(new SpikeBall(this.game, 200, this.game.world.height - 100));
        //this.enemies.push(new SpringMan(this.game, 600, this.game.world.height - 150));
        //this.enemies.push(new Sun(this.game, 600, this.game.world.height - 400));
        //this.enemies.push(new Cloud(this.game, 600, this.game.world.height - 400));

        this.player = new Player(this.game, this.game.scale.width / 2, this.game.world.height - 100);
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
            this.group_hazards.x -= deltaMove;
            for (let enemy of this.enemies) {
                enemy.sprite.x -= deltaMove;
            }
            for (let item of this.items) {
                item.updateLocation({x: deltaMove, y: 0});
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
            enemy.update(deltaTime, enemiesThatHitPlatforms);
        }
        for (let item of this.items) {
            item.update(deltaTime);
        }

        let hitPlatforms = this.PhysicsService.collideGroups(this.game, this.player.sprite, this.group_platforms);
        let hitHazards = this.PhysicsService.collideGroups(this.game, this.player.sprite, this.group_hazards);

        if (hitHazards && this.player.canBeHurt()) {
            this.player.hazardHurtPlayer(2)
        }

        // Only take damage from the first enemy
        let hitEnemies = this.PhysicsService.overlapArrayAndEntity(this.game, this.enemies, this.player, null, this.player.canBeHurt, this.player);
        if (hitEnemies[0]) {
            this.player.touchHurtPlayer(hitEnemies[0]);
        }

        let hitItems = this.PhysicsService.overlapArrayAndEntity(this.game, this.items, this.player);
        for (let item of hitItems) {
            item.touchItem(this.player);
            // TODO: EXPERIMENTAL
            //let delta = item.touchItem(this.player);
            //if (delta) {
            //    this.updateWorldMovement(true, delta);
            //    this.player.sprite.x = this.game.world.width / 2;
            //}
        }

        let cursors = this.game.input.keyboard.createCursorKeys();
        this.player.update(cursors, hitPlatforms, deltaTime);

        this.updateWorldMovement(this.player.isMoving(), this.player.getDeltaMovement());
    }
}
