import DebugService from '../Debug/Debug';
import { DebugGraphicsObjectSquare } from '../Debug/DebugGraphicsObjects.js';
import Item from './Item.js';
import EmitterComponent from '../Components/EmitterComponent';

export const PortalTypes = {
    ORANGE: 'portal_orange',
    YELLOW: 'portal_yellow'
};

export class Portal extends Item {
    constructor(game, type, x, y, up = true) {
        super(game, x, y, type);
        this.type = type;

        game.physics.arcade.enable(this);

        this.width = 64;
        this.height = 16;

        this.otherPortal = null;
        this.direction = up ? -1 : 1;

        this.emitterComponent = new EmitterComponent(game, x + 32, y + 10, 50);
        this.emitterComponent.setWidth(50);
        this.emitterComponent.makeParticlesFromImage(`${this.type}Particle`);
        this.emitterComponent.setSpeed(0, 0, this.direction * 20, this.direction * 50);
        this.emitterComponent.setScaleBoth(.5, .5);
        this.emitterComponent.disableGravity();
        this.emitterComponent.startEmitter(false, 700, 100);

        if (DebugService.isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
    }

    static loadPortalImages(game) {
        game.load.image('portal_orange', 'assets/Items/portal_orange.png');
        game.load.image('portal_yellow', 'assets/Items/portal_yellow.png');

        game.load.image('portal_orangeParticle', 'assets/Particles/portal_orangeParticle.png');
        game.load.image('portal_yellowParticle', 'assets/Particles/portal_yellowParticle.png');
    }

    linkToPortal(otherPortal) {
        this.otherPortal = otherPortal;
    }

    updateItem(deltaTime) {
        if (this.debugGraphics) {
            this.debugGraphics.render(this.body);
        }

        this.emitterComponent.forEachAlive(particle => particle.alpha -= deltaTime * 1.25, null);
    }

    movePlayer(player){
        let newX = this.x + 8 + (player.width / 2);
        let deltaX = player.x - newX;
        player.x = this.x + 8 + (player.width / 2);
        if (this.direction === -1) {
            player.y = this.y - player.height - 5;
        }
        else {
            player.y = this.y + this.height + 5;
        }
        return deltaX;
    }

    touchItem(player) {
        if (this.otherPortal) {
            return this.otherPortal.movePlayer(player);
        }
    }
}
