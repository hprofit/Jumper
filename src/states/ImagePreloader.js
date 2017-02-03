import { loadHUDImages } from '../objects/Player/HUD.js';
import { loadPlayerImage } from '../objects/Player/Player.js';
import { loadSpikeManImage } from '../objects/Enemies/SpikeMan.js';
import { loadSkyImages } from '../objects/Sky.js';
import { loadCoinImages } from '../objects/Items/Coin.js';
import { loadAllPlatformImages, loadCakePlatformImages,
  loadGrassPlatformImages, loadSandPlatformImages, loadSnowPlatformImages,
  loadStonePlatformImages, loadWoodPlatformImages } from '../objects/Environment/Platform.js';

export default function preloadImages(game) {
  loadSpikeManImage(game);
  loadSkyImages(game);
  loadCoinImages(game);
  loadHUDImages(game);
  loadPlayerImage(game);

  loadGrassPlatformImages(game);
}
