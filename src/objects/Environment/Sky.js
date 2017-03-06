export default class Sky {
    constructor(game) {
        this.bg_1 = game.add.sprite(0, 0, 'bg_1');
        this.bg_2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_2');
        this.bg_3 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_3');
        this.bg_4 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg_4');

        let dimensionSize = 2048,
            width = game.camera.width / dimensionSize,
            height = game.camera.height / dimensionSize;
        this.bg_1.scale.setTo(game.world.width, height);
        this.bg_2.tileScale.setTo(width, height);
        this.bg_3.tileScale.setTo(width, height);
        this.bg_4.tileScale.setTo(width, height);

        this.bg2_speed = 50;

        this.bg3_rate = .25;
    }

    static loadSkyImages(game) {
        game.load.image('bg_1', 'assets/Background/bg_layer1.png');
        game.load.image('bg_2', 'assets/Background/bg_layer2.png');
        game.load.image('bg_3', 'assets/Background/bg_layer3.png');
        game.load.image('bg_4', 'assets/Background/bg_layer4.png');
    }

    update(velocity, deltaTime) {
    }
}
