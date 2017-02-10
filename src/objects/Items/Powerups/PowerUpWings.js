import { PowerUp, PowerUpTypes } from './PowerUp';

export default class PowerUpWings extends PowerUp {
    constructor(game, x, y) {
        super(game, PowerUpTypes.WINGS, x, y);
    }

    update() {
        super.update();
    }

    touchItem(player, game) {
        player.addWingComponent(game);

        super.touchItem(player);
    }
}
