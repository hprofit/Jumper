import { PowerUp, POWER_UP_TYPES } from './PowerUp';

export default class PowerUpWings extends PowerUp {
    constructor(game, x, y) {
        super(game, x, y, POWER_UP_TYPES.WINGS);
    }

    touchItem(player, game) {
        player.addWingComponent(game);

        super.touchItem(player);
    }
}
