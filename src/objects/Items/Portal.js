import isInDebugMode from '../Debug';
import { DebugGraphicsObjectSquare } from '../DebugGraphicsObjects.js';
import Item from './Item.js';

export function loadPortalImages(game) {
    game.load.image('portal_orange', 'assets/Items/portal_orange.png');
    game.load.image('portal_yellow', 'assets/Items/portal_yellow.png');

    game.load.image('portal_orangeParticle', 'assets/Particles/portal_orangeParticle.png');
    game.load.image('portal_yellowParticle', 'assets/Particles/portal_yellowParticle.png');
}

export const PortalTypes = {
    ORANGE: 'portal_orange',
    YELLOW: 'portal_yellow'
};

export class Portal extends Item {
    constructor(game, type, x, y, up = true) {
        super();
        this.type = type.toLowerCase();
        this.sprite = game.add.sprite(x, y, this.type);

        game.physics.arcade.enable(this.sprite);

        this.sprite.width = 64;
        this.sprite.height = 16;

        this.otherPortal = null;
        this.direction = up ? -1 : 1;


        //	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
        this.emitter = game.add.emitter(x + 32, y + 10, 50);
        //this.emitter.autoScale = true;
        this.emitter.width = 50;

        this.emitter.makeParticles(`${this.type}Particle`);

        this.emitter.minParticleSpeed.set(0, 2);
        this.emitter.maxParticleSpeed.set(0, 10);

        //this.emitter.setRotation(0, 0);
        //this.emitter.setAlpha(0.3, 0.8);
        this.emitter.setScale(.5, .5, .5, .5);
        this.emitter.minParticleScale = .5;
        this.emitter.maxParticleScale = .5;
        this.emitter.gravity = 200 * this.direction;

        this.emitter.start(false, 700, 100);

        if (isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
    }

    updateLocation(deltaMove) {
        super.updateLocation(deltaMove);
        this.emitter.x -= deltaMove.x;
        this.emitter.y -= deltaMove.y;

        this.emitter.forEachAlive(function(particle){
            particle.x -= deltaMove.x;
            particle.y -= deltaMove.y;
        }, null)
    }

    linkToPortal(otherPortal) {
        this.otherPortal = otherPortal;
    }

    update(deltaTime) {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.sprite.body);
        }

        this.emitter.forEachAlive(function(particle){
            particle.alpha -= deltaTime * 1.25;
        }, null)
    }

    movePlayer(player){
        let newX = this.sprite.x + 8 + (player.sprite.width / 2);
        let deltaX = player.sprite.x - newX;
        player.sprite.x = this.sprite.x + 8 + (player.sprite.width / 2);
        if (this.direction === -1) {
            player.sprite.y = this.sprite.y - player.sprite.height - 5;
        }
        else {
            player.sprite.y = this.sprite.y + this.sprite.height + 5;
        }
        return deltaX;
    }

    touchItem(player) {
        if (this.otherPortal) {
            return this.otherPortal.movePlayer(player);
        }
    }
}
