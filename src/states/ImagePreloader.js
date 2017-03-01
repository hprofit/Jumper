import SpikeMan from '../objects/Enemies/SpikeMan';
import WingMan from '../objects/Enemies/WingMan';
import SpikeBall from '../objects/Enemies/SpikeBall';
import Cloud from '../objects/Enemies/Cloud';

import Sky from '../objects/Environment/Sky';

import Player from '../objects/Player/Player';

/**
 * Loads texture atlas under 'bunnyJumpSheet'
 * Loads Enemy images, sky images, and Player images
 * @param game
 */
export default function preloadImages(game) {
    game.load.atlasJSONHash('bunnyJumperSheet', 'assets/BunnyJumper.png', 'assets/BunnyJumper.json');

    SpikeMan.loadSpikeManImage(game);
    WingMan.loadWingManImage(game);
    SpikeBall.loadSpikeBallImage(game);
    Cloud.loadCloudImages(game);

    Sky.loadSkyImages(game);

    Player.loadPlayerImage(game);
}
