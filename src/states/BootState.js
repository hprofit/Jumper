import preloadImages from './ImagePreloader';

export default class BootState extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        preloadImages(this.game);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    create() {
        this.game.state.start('main');
    }
}