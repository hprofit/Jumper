import Sky from '../objects/Environment/Sky';

import Player from '../objects/Player/Player';

/**
 * Loads texture atlas under 'bunnyJumpSheet'
 * Loads images
 * @param game
 */
export default function preloadImages(game) {
    game.load.atlasJSONHash('bunnyJumperSheet', 'assets/BunnyJumper.png', 'assets/BunnyJumper.json');
    Sky.loadSkyImages(game);
    Player.loadPlayerImage(game);
}
