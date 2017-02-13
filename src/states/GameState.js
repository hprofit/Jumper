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

import { Coin, COIN_TYPE } from '../objects/Items/Coin';
import { Portal, PortalTypes } from '../objects/Items/Portal';
import PowerUpBubble from '../objects/Items/Powerups/PowerUpBubble';
import PowerUpJetPack from '../objects/Items/Powerups/PowerUpJetPack';
import PowerUpWings from '../objects/Items/Powerups/PowerUpWings';
import PowerUpLife from '../objects/Items/Powerups/PowerUpLife';

import { Platform, PlatformTypes, PlatformSubtypes } from '../objects/Environment/Platform';
import Player from '../objects/Player/Player';
import MathExtensions from '../MathExtensions';

import PauseMenu from '../menus/PauseMenu';
import OptionsMenu from '../menus/OptionsMenu';

export default class GameState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.sky = null;
        this.group_platforms = null;
        this.items = [];
        this.enemies = [];
        this.group_hazards = null;
        this.player = null;

        this.previousTime = 0;

        this.game.world.resize(6016, this.game.world.height);

        this.currentMenu = null;
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
            new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.SMALL, 6000, y, this.group_platforms);
        }
        new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, 512, 448, this.group_platforms);
        new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, 512, 544, this.group_platforms);

        new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, 704, 448, this.group_platforms);
        new Platform(this.game, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, 704, 544, this.group_platforms);

        this.group_hazards = this.game.add.group();
        this.group_hazards.enableBody = true;
        new Spikes(this.game, SpikeTypes.SPIKE_UP, 100, this.game.world.height - 80, this.group_hazards);
        new Spikes(this.game, SpikeTypes.SPIKE_DOWN, 200, 32, this.group_hazards);
        new Spikes(this.game, SpikeTypes.SPIKES_UP, 200, this.game.world.height - 80, this.group_hazards);
        new Spikes(this.game, SpikeTypes.SPIKES_DOWN, 300, 32, this.group_hazards);

        let max = 20;
        for (let idx = 0; idx < max; idx++) {
            let tmp = MathExtensions.plotOnBell(idx / max) * -100;
            this.items.push(new Coin(this.game, 1200 + idx * 35, 200 + tmp, COIN_TYPE.BRONZE));
            this.items.push(new Coin(this.game, 1200 + idx * 35, 250 + tmp, COIN_TYPE.SILVER));
            this.items.push(new Coin(this.game, 1200 + idx * 35, 300 + tmp, COIN_TYPE.GOLD));
            this.items.push(new Coin(this.game, 1200 + idx * 35, 350 + tmp, COIN_TYPE.SILVER));
            this.items.push(new Coin(this.game, 1200 + idx * 35, 400 + tmp, COIN_TYPE.BRONZE));
        }

        this.items.push(new PowerUpBubble(this.game, 512, 416));
        this.items.push(new PowerUpJetPack(this.game, 548, 416));
        this.items.push(new PowerUpWings(this.game, 584, 416));
        this.items.push(new PowerUpLife(this.game, 620, 416));

        let p1 = new Portal(this.game, PortalTypes.ORANGE, 640, this.game.world.height - 64);
        let p2 = new Portal(this.game, PortalTypes.ORANGE, 640, 32, false);
        p1.linkToPortal(p2);
        p2.linkToPortal(p1);
        this.items.push(p1);
        this.items.push(p2);

        //this.enemies.push(new SpikeMan(this.game, 1000, 100));
        //this.enemies.push(new WingMan(this.game, 600, 480));
        //this.enemies.push(new WingMan(this.game, 700, 300, true, 100));
        //this.enemies.push(new FlyMan(this.game, 100, this.game.world.height - 150));
        //this.enemies.push(new SpikeBall(this.game, 200, this.game.world.height - 100));
        //this.enemies.push(new SpringMan(this.game, 600, this.game.world.height - 150));
        //this.enemies.push(new Sun(this.game, 600, this.game.world.height - 400));
        //this.enemies.push(new Cloud(this.game, 600, this.game.world.height - 400));

        this.player = new Player(this.game, this.game.scale.width / 2, this.game.world.height - 100);

        this.game.camera.follow(this.player);
    }

    killCurrentMenu() {
        if (this.currentMenu) {
            this.currentMenu.kill();
        }
    }

    resumeGame() {
        this.killCurrentMenu();
        this.game.paused = false;
    }

    exitGame() {
        this.game.state.start('main');
    }

    launchPauseMenu() {
        this.game.paused = true;
        this.killCurrentMenu();
        this.currentMenu = new PauseMenu(this.game);
        this.currentMenu.resume.add(this.resumeGame, this);
        this.currentMenu.options.add(this.launchOptions, this);
        this.currentMenu.exit.add(this.exitGame, this);
    }

    launchOptions() {
        this.killCurrentMenu();
        this.currentMenu = new OptionsMenu(this.game);
        this.currentMenu.back.add(this.launchPauseMenu, this);
    }

    getDeltaTime() {
        let elapsedTime = this.game.time.totalElapsedSeconds();
        let deltaTime = elapsedTime - this.previousTime;
        this.previousTime = elapsedTime;
        return deltaTime;
    }

    update() {
        if (this.input.keyboard.isDown(Phaser.KeyCode.SPACEBAR)) {
            this.launchPauseMenu();
        }

        let deltaTime = this.getDeltaTime();

        let enemiesThatHitPlatforms = PhysicsService.collideSpriteArrayAndGroup(this.game, this.enemies, this.group_platforms);
        for (let enemy of this.enemies) {
            enemy.updateEnemy(deltaTime, enemiesThatHitPlatforms);
            if (enemy.emitterComponent && enemy.emitterComponent.particlesHitWalls) {
                PhysicsService.collideGroups(this.game, enemy.emitterComponent, this.group_platforms, enemy.emitterComponent.killParticle, enemy.emitterComponent.tryThis, enemy.emitterComponent);
            }
        }
        for (let item of this.items) {
            item.updateItem(deltaTime);
        }

        let hitPlatforms = PhysicsService.collideGroups(this.game, this.player, this.group_platforms);
        let hitHazards = PhysicsService.collideGroups(this.game, this.player, this.group_hazards);

        if (hitHazards && this.player.canBeHurt()) {
            this.player.hazardHurtPlayer(2);
        }

        // Only take damage from the first enemy
        let hitEnemies = PhysicsService.overlapSpriteArrayAndSprite(this.game, this.enemies, this.player, null, this.player.canBeHurt, this.player);
        if (hitEnemies[0]) {
            this.player.touchHurtPlayer(hitEnemies[0]);
        }
        else {
            for (let enemy of this.enemies) {
                if (enemy.emitterComponent && enemy.emitterComponent.particlesDoDamage &&
                    PhysicsService.overlapGroups(this.game, enemy.emitterComponent, this.player, null, this.player.canBeHurt, this.player)) {
                    this.player.hazardHurtPlayer(enemy.emitterComponent.particleDamage);
                    break;
                }
            }
        }

        let hitItems = PhysicsService.overlapSpriteArrayAndSprite(this.game, this.items, this.player);
        for (let item of hitItems) {
            item.touchItem(this.player, this.game);
        }

        let cursors = this.game.input.keyboard.createCursorKeys();
        this.player.updatePlayer(cursors, hitPlatforms, deltaTime);

        this.sky.update(this.player.isMoving(), this.player.getVelocity(), deltaTime);
    }
}