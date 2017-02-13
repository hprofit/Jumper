import MenuBase from './MenuBase';
import { CLICKABLE_BUTTON_TYPE, ClickableButton } from './buttons/ClickableButton';

export function loadMainMenuImages(game) {
    game.load.atlasJSONHash('buttonSheet', 'assets/Menus/buttonSheet.png', 'assets/Menus/buttonSheet.json');
}

export default class MainMenu extends MenuBase {
    constructor(game) {
        super(game);

        this.group_buttons.add(new ClickableButton(game, 300, 200, 'Play Game', this.playGame, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this.group_buttons.add(new ClickableButton(game, 300, 250, 'Continue', this.continueGame, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this.group_buttons.add(new ClickableButton(game, 300, 300, 'Options', this.launchOptions, this, CLICKABLE_BUTTON_TYPE.LARGE));

        /**
         * Signals - Dispatched when menu buttons are clicked
         * @type {Phaser.Signal}
         */
        this.play = new Phaser.Signal();
        this.continue = new Phaser.Signal();
        this.options = new Phaser.Signal();
    }

    playGame() {
        this.play.dispatch();
    }

    continueGame() {
        this.continue.dispatch();
    }

    launchOptions() {
        this.options.dispatch();
    }
}