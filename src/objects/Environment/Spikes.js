const SPIKE_VALUES = {
    SPIKE_DOWN: {
        filePath: 'Environment/Spikes/spike.png',
        direction: 'DOWN',
        width: 24
    },
    SPIKE_UP: {
        filePath: 'Environment/Spikes/spike.png',
        direction: 'UP',
        width: 24
    },
    SPIKES_DOWN: {
        filePath: 'Environment/Spikes/spikes.png',
        direction: 'DOWN',
        width: 72
    },
    SPIKES_UP: {
        filePath: 'Environment/Spikes/spikes.png',
        direction: 'UP',
        width: 72
    }
};

export const SPIKE_TYPES = {
    SPIKE_DOWN: 'SPIKE_DOWN',
    SPIKE_UP: 'SPIKE_UP',
    SPIKES_DOWN: 'SPIKES_DOWN',
    SPIKES_UP: 'SPIKES_UP'
};

export class Spikes extends Phaser.Sprite {
    constructor(game, x, y, type, owningGroup = null) {
        if (!SPIKE_VALUES[type]) {
            throw Error('Spikes: type must be of type SPIKE_TYPES');
        }

        super(game, x, y, 'bunnyJumperSheet', SPIKE_VALUES[type].filePath);

        if (!owningGroup) {
            game.add.existing(this);
        }
        else {
            owningGroup.add(this);
        }
        game.physics.arcade.enable(this);
        this.anchor.setTo(.5, 1);
        this.height = 48;
        this.width = SPIKE_VALUES[type].width;
        if (SPIKE_VALUES[type].direction === 'DOWN') {
            this.angle = 180;
        }

        this.body.immovable = true;
    }

    update() {
    }
}