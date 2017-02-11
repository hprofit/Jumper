import { PowerUp, PowerUpTypes } from './PowerUp';

export default class PowerUpWings extends PowerUp {
    constructor(game, x, y) {
        super(game, x, y, PowerUpTypes.WINGS);
    }

    touchItem(player, game) {
        player.addWingComponent(game);

        super.touchItem(player);
    }
}
