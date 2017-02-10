import { PowerUp, PowerUpTypes } from './PowerUp';

export default class PowerUpBubble extends PowerUp {
    constructor(game, x, y) {
        super(game, PowerUpTypes.BUBBLE, x, y);
    }

    update() {
        super.update();
    }

    touchItem(player, game) {
        player.addBubbleComponent(game);

        super.touchItem(player);
    }
}
