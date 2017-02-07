export default class Item {
    constructor() {
    }

    updateLocation(deltaMove) {
        if (this.sprite) {
            this.sprite.x -= deltaMove.x;
            this.sprite.y -= deltaMove.y;
        }
    }

    update() {
    }

    touchItem(player) {
    }
}
