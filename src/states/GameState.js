import PhysicsService from './PhysicsService';

import SpikeMan from '../objects/Enemies/SpikeMan';
import WingMan from '../objects/Enemies/WingMan';
import SpikeBall from '../objects/Enemies/SpikeBall';
import Cloud from '../objects/Enemies/Cloud';

import Sky from '../objects/Environment/Sky';

import { Coin, COIN_TYPE } from '../objects/Items/Coin';

import { Platform, PlatformTypes, PlatformSubtypes } from '../objects/Environment/Platform';
import Player from '../objects/Player/Player';

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
            new Platform(this.game, x, y, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, this.group_platforms);
            new Platform(this.game, x, 0, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, this.group_platforms);
        }
        for (let idx = 1; idx < 18; idx++) {
            let y = idx * 32;
            new Platform(this.game, 0, y, PlatformTypes.GRASS, PlatformSubtypes.SMALL, this.group_platforms);
            new Platform(this.game, 6000, y, PlatformTypes.GRASS, PlatformSubtypes.SMALL, this.group_platforms);
        }
        new Platform(this.game, 512, 448, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, this.group_platforms);
        new Platform(this.game, 512, 544, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, this.group_platforms);

        new Platform(this.game, 704, 448, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, this.group_platforms);
        new Platform(this.game, 704, 544, PlatformTypes.GRASS, PlatformSubtypes.NORMAL, this.group_platforms);

        let max = 20;
        for (let idx = 0; idx < max; idx++) {
            this.items.push(new Coin(this.game, 1200 + idx * 35, 200, COIN_TYPE.BRONZE));
            this.items.push(new Coin(this.game, 1200 + idx * 35, 250, COIN_TYPE.SILVER));
            this.items.push(new Coin(this.game, 1200 + idx * 35, 300, COIN_TYPE.GOLD));
            this.items.push(new Coin(this.game, 1200 + idx * 35, 350, COIN_TYPE.SILVER));
            this.items.push(new Coin(this.game, 1200 + idx * 35, 400, COIN_TYPE.BRONZE));
        }

        this.enemies.push(new SpikeMan(this.game, 1000, 100));
        this.enemies.push(new WingMan(this.game, 600, 480));
        this.enemies.push(new WingMan(this.game, 700, 300, true, 100));
        this.enemies.push(new SpikeBall(this.game, 200, this.game.world.height - 100));
        this.enemies.push(new Cloud(this.game, 600, this.game.world.height - 400));

        this.player = new Player(this.game, this.game.scale.width / 2, this.game.world.height - 300);

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
        this.game.paused = false;
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