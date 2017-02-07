import { loadHUDImages } from '../objects/Player/HUD';
import { loadPlayerImage } from '../objects/Player/Player';

import { loadSpikeManImage } from '../objects/Enemies/SpikeMan';
import { loadWingManImage } from '../objects/Enemies/WingMan';
import { loadFlyManImage } from '../objects/Enemies/FlyMan';
import { loadSpikeBallImage } from '../objects/Enemies/SpikeBall';
import { loadSpringManImage } from '../objects/Enemies/SpringMan';
import { loadSunImage } from '../objects/Enemies/Sun';
import { loadCloudImage } from '../objects/Enemies/Cloud';

import { loadSkyImages } from '../objects/Environment/Sky';
import { loadSpikeImages } from '../objects/Environment/Spikes';

import { loadCoinImages } from '../objects/Items/Coin';
import { loadPortalImages } from '../objects/Items/Portal';

import { loadAllPlatformImages, loadCakePlatformImages,
    loadGrassPlatformImages, loadSandPlatformImages, loadSnowPlatformImages,
    loadStonePlatformImages, loadWoodPlatformImages } from '../objects/Environment/Platform';

export default function preloadImages(game) {
    loadSpikeManImage(game);
    loadWingManImage(game);
    loadFlyManImage(game);
    loadSpikeBallImage(game);
    loadSpringManImage(game);
    loadSunImage(game);
    loadCloudImage(game);

    loadSkyImages(game);
    loadSpikeImages(game);

    loadCoinImages(game);
    loadPortalImages(game);

    loadHUDImages(game);
    loadPlayerImage(game);

    loadGrassPlatformImages(game);
}
