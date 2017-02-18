import DebugService from '../Debug/Debug';
import { DebugGraphicsObjectSquare } from '../Debug/DebugGraphicsObjects.js';
import Item from './Item.js';
import EmitterComponent from '../Components/EmitterComponent';

export const PortalTypes = {
    ORANGE: 'orange',
    YELLOW: 'yellow'
};

export class Portal extends Item {
    constructor(game, type, x, y, up = true) {
        super(game, x, y, 'bunnyJumperSheet', `Items/Portal/${type}.png`);

        game.physics.arcade.enable(this);

        this.width = 64;
        this.height = 16;

        this.otherPortal = null;
        this.direction = up ? -1 : 1;

        this.emitterComponent = new EmitterComponent(game, x + 32, y + 10, 50);
        this.emitterComponent.setWidth(50);
        this.emitterComponent.makeParticlesFromAtlas('bunnyJumperSheet', [`Particles/Portal/${type}.png`]);
        this.emitterComponent.setSpeed(0, 0, this.direction * 20, this.direction * 50);
        this.emitterComponent.setScaleBoth(.5, .5);
        this.emitterComponent.disableGravity();
        this.emitterComponent.start(false, 700, 100);

        if (DebugService.isInDebugMode()) {
            this.debugGraphics = new DebugGraphicsObjectSquare(game);
        }
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
