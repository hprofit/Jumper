import PowerUpComponent from './PowerUpComponent';

export default class BubblePowerUpComponent extends PowerUpComponent {
    constructor(group, player) {
        super();
        this.sprite = group.create(player.x - 32, player.y - 32, 'bubble');
        this.sprite.width = 64;
        this.sprite.height = 64;
    }

    static loadBubblePowerUpImage(game) {
        game.load.image('bubble', 'assets/Items/PowerUpSprites/bubble.png');
    }

    remove() {
        this.sprite.kill();
    }

    takeHit() {
        this.remove();
    }

    update(cursors, contacts, delta, player) {
        this.sprite.x = player.x - 32;
        this.sprite.y = player.y - 32;
    }
}