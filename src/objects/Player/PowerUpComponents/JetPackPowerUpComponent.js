import PowerUpComponent from './PowerUpComponent';

export function loadJetPackPowerUpImage(game) {
    game.load.image('jetPack', 'assets/Items/PowerUpSprites/jetpack.png');
}

export default class JetPackPowerUpComponent extends PowerUpComponent {
    constructor(group, player) {
        super();
        this.sprite = group.create(player.sprite.x - 24, player.sprite.y - 24, 'jetPack');
        this.sprite.width = 48;
        this.sprite.height = 48;
    }

    remove() {
        this.sprite.kill();
    }

    update(cursors, contacts, delta, player) {
        this.sprite.x = player.sprite.x - 24;
        this.sprite.y = player.sprite.y - 24;
    }
}