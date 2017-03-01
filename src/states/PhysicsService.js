export default class PhysicsService {
    constructor() {
    }

    static collideGroups(game, groupA, groupB, collideCallback, processCallback, callbackContext) {
        return game.physics.arcade.collide(groupA, groupB, collideCallback, processCallback, callbackContext);
    }

    static overlapGroups(game, groupA, groupB, onOverlapCallback = null, processCallback = null, callbackContext = null) {
        return game.physics.arcade.overlap(groupA, groupB, onOverlapCallback, processCallback, callbackContext);
    }

    static overlapSpriteArrayAndSprite(game, spriteArray, sprite, onOverlapCallback, processCallback, callbackContext) {
        let hits = [];
        for (let spriteItem of spriteArray) {
            if (game.physics.arcade.overlap(sprite, spriteItem, onOverlapCallback, processCallback, callbackContext)) {
                hits.push(spriteItem);
            }
        }
        return hits;
    }

    static collideSpriteArrayAndGroup(game, spriteArray, group) {
        let hitEntities = [];
        for (let sprite of spriteArray) {
            if (this.collideGroups(game, sprite, group)) {
                hitEntities.push(sprite);
            }
        }
        return hitEntities;
    }
}
