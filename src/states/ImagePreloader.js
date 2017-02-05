import { loadHUDImages } from '../objects/Player/HUD.js';
import { loadPlayerImage } from '../objects/Player/Player.js';
import { loadSpikeManImage } from '../objects/Enemies/SpikeMan.js';
import { loadWingManImage } from '../objects/Enemies/WingMan.js';
import { loadSkyImages } from '../objects/Environment/Sky.js';
import { loadCoinImages } from '../objects/Items/Coin.js';
import { loadAllPlatformImages, loadCakePlatformImages,
    loadGrassPlatformImages, loadSandPlatformImages, loadSnowPlatformImages,
    loadStonePlatformImages, loadWoodPlatformImages } from '../objects/Environment/Platform.js';

export default function preloadImages(game) {
    loadSpikeManImage(game);
    loadWingManImage(game);
    loadSkyImages(game);
    loadCoinImages(game);
    loadHUDImages(game);
    loadPlayerImage(game);

    loadGrassPlatformImages(game);
}
