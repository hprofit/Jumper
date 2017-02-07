export class Spikes {
    constructor(game, type, x, y, owningGroup = null) {
        this.type = type;

        if (!owningGroup) {
            this.sprite = game.add.sprite(x, y, type);
        }
        else {
            this.sprite = owningGroup.create(x, y, type);
        }

        this.sprite.height = 48;
        this[`_${type}Size`]();
        this.sprite.body.immovable = true;
    }

    _spikeDownSize(){
        this.sprite.width = 24;
    }

    _spikeUpSize(){
        this.sprite.width = 24;
    }

    _spikesDownSize(){
        this.sprite.width = 72;
    }

    _spikesUpSize(){
        this.sprite.width = 72;
    }

    update() {
    }
}

export const SpikeTypes = {
    SPIKE_DOWN: 'spikeDown',
    SPIKE_UP: 'spikeUp',
    SPIKES_DOWN: 'spikesDown',
    SPIKES_UP: 'spikesUp'
};

export function loadSpikeImages(game) {
    game.load.image('spikeDown', 'assets/Environment/spike_bottom.png');
    game.load.image('spikeUp', 'assets/Environment/spike_top.png');
    game.load.image('spikesDown', 'assets/Environment/spikes_bottom.png');
    game.load.image('spikesUp', 'assets/Environment/spikes_top.png');
}