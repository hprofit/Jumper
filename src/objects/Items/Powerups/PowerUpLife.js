import { PowerUp, POWER_UP_TYPES } from './PowerUp';

export default class PowerUpLife extends PowerUp {
    constructor(game, x, y) {
        super(game, x, y, POWER_UP_TYPES.BUNNY);
    }

    touchItem(player, game) {
        player.addLife();

        super.touchItem(player);
    }
}
