import { PowerUp, PowerUpTypes } from './PowerUp';

export default class PowerUpJetPack extends PowerUp {
    constructor(game, x, y) {
        super(game, x, y, PowerUpTypes.JET_PACK);
    }

    touchItem(player, game) {
        player.addJetPackComponent(game);

        super.touchItem(player);
    }
}
