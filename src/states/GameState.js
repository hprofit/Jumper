import preloadImages from './ImagePreloader.js';
import PhysicsService from './PhysicsService.js';
import { SpikeMan } from '../objects/Enemies/SpikeMan.js';
import { Sky } from '../objects/Sky.js';
import { Coin } from '../objects/Items/Coin.js';
import { Platform, PlatformTypes } from '../objects/Environment/Platform.js';
import { Player } from '../objects/Player/Player.js';
import MapParser from '../MapParser.js';

class GameState extends Phaser.State {
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
		for (let idx = 0; idx < 10; idx++) {
			new Platform(this.game, 152 * idx, this.game.world.height - (94 * .4) * (idx + 1), 'Grass', PlatformTypes.NORMAL, this.group_platforms);
		}

		for (let idx = 0; idx < 5; idx++) {
			this.items.push(new Coin(this.game, 200 + idx * 35, 400, 'bronze'));
			this.items.push(new Coin(this.game, 200 + idx * 35, 350, 'silver'));
			this.items.push(new Coin(this.game, 200 + idx * 35, 300, 'gold'));
		}

		this.enemies.push(new SpikeMan(this.game, this.game.world.width - 70, 300));

		this.player = new Player(this.game, 50, this.game.world.height - 100);
  }

	getDeltaTime() {
		let elapsedTime = this.game.time.totalElapsedSeconds();
		let deltaTime = elapsedTime - this.previousTime;
		this.previousTime = elapsedTime;
		return deltaTime;
	}

  update() {
		let deltaTime = this.getDeltaTime();

		for (let enemy of this.enemies) {
			enemy.update();
		}
		for (let item of this.items) {
			item.update();
		}

		this.PhysicsService.collideArrayAndGroup(this.game, this.enemies, this.group_platforms);
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

		this.sky.update();
  }
}

export default GameState;
