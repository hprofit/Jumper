import Sky from '../objects/Environment/Sky';
import Player from '../objects/Player/Player';

export default class BootState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        this.game.load.atlasJSONHash('bunnyJumperSheet', 'assets/BunnyJumper.png', 'assets/BunnyJumper.json');
        Sky.loadSkyImages(this.game);
        Player.loadPlayerImage(this.game);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        this.game.state.start('game');
    }
}