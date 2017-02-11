import { PowerUp, PowerUpTypes } from './PowerUp';

export default class PowerUpLife extends PowerUp {
    constructor(game, x, y) {
        super(game, PowerUpTypes.BUNNY, x, y);
    }

    update() {
        super.update();
    }

    touchItem(player, game) {
        player.addLife();

        super.touchItem(player);
    }
}
