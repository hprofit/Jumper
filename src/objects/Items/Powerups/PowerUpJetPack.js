import { PowerUp, POWER_UP_TYPES } from './PowerUp';

export default class PowerUpJetPack extends PowerUp {
    constructor(game, x, y) {
        super(game, x, y, POWER_UP_TYPES.JET_PACK);
    }

    touchItem(player, game) {
        player.addJetPackComponent(game);

        super.touchItem(player);
    }
}
