import { PowerUp, PowerUpTypes } from './PowerUp';

export default class PowerUpJetPack extends PowerUp {
    constructor(game, x, y) {
        super(game, PowerUpTypes.JET_PACK, x, y);
    }

    update() {
        super.update();
    }

    touchItem(player, game) {
        player.addJetPackComponent(game);

        super.touchItem(player);
    }
}
