import SpikeMan from '../objects/Enemies/SpikeMan';
import WingMan from '../objects/Enemies/WingMan';
import FlyMan from '../objects/Enemies/FlyMan';
import SpikeBall from '../objects/Enemies/SpikeBall';
import SpringMan from '../objects/Enemies/SpringMan';
import Sun from '../objects/Enemies/Sun';
import Cloud from '../objects/Enemies/Cloud';

import Sky from '../objects/Environment/Sky';

import Player from '../objects/Player/Player';

export default class BootState extends Phaser.State {
    constructor() {
        super();
    }

    /**
     * Loads texture atlas under 'bunnyJumpSheet'
     * Loads Enemy images, sky images, and Player images
     */
    preload() {
        this.game.load.atlasJSONHash('bunnyJumperSheet', 'assets/BunnyJumper.png', 'assets/BunnyJumper.json');

        SpikeMan.loadSpikeManImage(this.game);
        WingMan.loadWingManImage(this.game);
        FlyMan.loadFlyManImage(this.game);
        SpikeBall.loadSpikeBallImage(this.game);
        SpringMan.loadSpringManImage(this.game);
        Sun.loadSunImage(this.game);
        Cloud.loadCloudImages(this.game);

        Sky.loadSkyImages(this.game);

        Player.loadPlayerImage(this.game);
        Player.loadSounds(this.game);
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        this.game.state.start('main');
    }
}