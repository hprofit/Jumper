import HUD from '../objects/Player/HUD';
import Player from '../objects/Player/Player';

import SpikeMan from '../objects/Enemies/SpikeMan';
import WingMan from '../objects/Enemies/WingMan';
import FlyMan from '../objects/Enemies/FlyMan';
import SpikeBall from '../objects/Enemies/SpikeBall';
import SpringMan from '../objects/Enemies/SpringMan';
import Sun from '../objects/Enemies/Sun';
import Cloud from '../objects/Enemies/Cloud';

import Sky from '../objects/Environment/Sky';
import {Spikes} from '../objects/Environment/Spikes';

import {Coin} from '../objects/Items/Coin';
import {Portal} from '../objects/Items/Portal';
import {PowerUp} from '../objects/Items/Powerups/PowerUp';
import BubblePowerUpComponent from '../objects/Components/PowerUpComponents/BubblePowerUpComponent';
import JetPackPowerUpComponent from '../objects/Components/PowerUpComponents/JetPackPowerUpComponent';
import WingPowerUpComponent from '../objects/Components/PowerUpComponents/WingPowerUpComponent';

import {Platform} from '../objects/Environment/Platform';

import MenuBase from '../menus/MenuBase';

export default function preloadImages(game) {
    game.load.atlasJSONHash('bunnyJumperSheet', 'assets/BunnyJumper.png', 'assets/BunnyJumper.json');

    //SpikeMan.loadSpikeManImage(game);
    //WingMan.loadWingManImage(game);
    //FlyMan.loadFlyManImage(game);
    //SpikeBall.loadSpikeBallImage(game);
    //SpringMan.loadSpringManImage(game);
    //Sun.loadSunImage(game);
    //Cloud.loadCloudImages(game);
    //
    Sky.loadSkyImages(game);
    //Spikes.loadSpikeImages(game);
    //
    //Coin.loadCoinImages(game);
    //Portal.loadPortalImages(game);
    //PowerUp.loadPowerUpImages(game);
    //BubblePowerUpComponent.loadBubblePowerUpImage(game);
    //JetPackPowerUpComponent.loadJetPackPowerUpImage(game);
    //WingPowerUpComponent.loadWingPowerUpImage(game);
    //
    //HUD.loadHUDImages(game);
    //Player.loadPlayerImage(game);
    //
    //// TODO: Replace this
    //Platform.loadGrassPlatformImages(game);
    //
    //MenuBase.loadMenuImages(game);
}
