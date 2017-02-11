import { PowerUp, PowerUpTypes } from './PowerUp';

export default class PowerUpLife extends PowerUp {
    constructor(game, x, y) {
        super(game, x, y, PowerUpTypes.BUNNY);
    }

    touchItem(player, game) {
        player.addLife();

        super.touchItem(player);
    }
}
