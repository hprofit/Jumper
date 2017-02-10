import PowerUpComponent from './PowerUpComponent';

export function loadBubblePowerUpImage(game) {
    game.load.image('bubble', 'assets/Items/PowerUpSprites/bubble.png');
}

export default class BubblePowerUpComponent extends PowerUpComponent {
    constructor(group, player) {
        super();
        this.sprite = group.create(player.sprite.x - 32, player.sprite.y - 32, 'bubble');
        this.sprite.width = 64;
        this.sprite.height = 64;
    }

    remove() {
        this.sprite.kill();
    }

    takeHit() {
        this.remove();
    }

    update(cursors, contacts, delta, player) {
        this.sprite.x = player.sprite.x - 32;
        this.sprite.y = player.sprite.y - 32;
    }
}