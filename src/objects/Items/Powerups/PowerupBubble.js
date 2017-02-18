import { PowerUp, POWER_UP_TYPES } from './PowerUp';

export default class PowerUpBubble extends PowerUp {
    constructor(game, x, y) {
        super(game, x, y, POWER_UP_TYPES.BUBBLE);
    }

    touchItem(player, game) {
        player.addBubbleComponent(game);

        super.touchItem(player);
    }
}
