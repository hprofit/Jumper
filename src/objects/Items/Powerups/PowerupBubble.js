import { PowerUp, PowerUpTypes } from './PowerUp';

export default class PowerUpBubble extends PowerUp {
    constructor(game, x, y) {
        super(game, x, y, PowerUpTypes.BUBBLE);
    }

    touchItem(player, game) {
        player.addBubbleComponent(game);

        super.touchItem(player);
    }
}
