import MenuBase from './MenuBase';
import { CLICKABLE_BUTTON_TYPE, ClickableButton } from './buttons/ClickableButton';

export default class PauseMenu extends MenuBase {
    constructor(game) {
        super(game);

        this.group_buttons.add(new ClickableButton(game, 300, 200, 'Resume', this.resumeGame, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this.group_buttons.add(new ClickableButton(game, 300, 250, 'Options', this.launchOptions, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this.group_buttons.add(new ClickableButton(game, 300, 300, 'Exit', this.exitGame, this, CLICKABLE_BUTTON_TYPE.LARGE));

        let text = this.group_buttons.add(new Phaser.Text(game, 0, 0, 'Pause', {
            boundsAlignH: "center",
            boundsAlignV: "middle",
            fontSize: '60px',
            font: 'Bubblegum',
            strokeThickness: 8,
            fill: '#5acefc',
            stroke: '#166E93'
        }));

        text.setTextBounds(0, 50, 800, 100);

        /**
         * Signals - Dispatched when menu buttons are clicked
         * @type {Phaser.Signal}
         */
        this.resume = new Phaser.Signal();
        this.options = new Phaser.Signal();
        this.exit = new Phaser.Signal();
    }

    resumeGame() {
        this.resume.dispatch();
    }

    launchOptions() {
        this.options.dispatch();
    }

    exitGame() {
        this.exit.dispatch();
    }
}