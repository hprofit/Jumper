import DebugService from '../objects/Debug/Debug.js';
import MenuBase from './MenuBase';
import { CLICKABLE_BUTTON_TYPE, ClickableButton } from './buttons/ClickableButton';

export default class OptionsMenu extends MenuBase {
    constructor(game) {
        super(game);

        //this.group_buttons.add(new ClickableButton(game, 300, 250, 'Resume Game', this.resumeGame, this, CLICKABLE_BUTTON_TYPE.LARGE));
        //this.group_buttons.add(new ClickableButton(game, 300, 300, 'Options', this.launchOptions, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this.group_buttons.add(new ClickableButton(game, 300, 350, 'Back', this.backToPreviousMenu, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this.debugButton = this.group_buttons.add(new ClickableButton(game, 300, 425, 'Debug', this.toggleDebug, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this._setDebugText(DebugService.isInDebugMode());

        let text = this.group_buttons.add(new Phaser.Text(game, 0, 0, 'Options', {
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
        this.back = new Phaser.Signal();
    }

    backToPreviousMenu() {
        this.back.dispatch();
    }

    _setDebugText(isInDebug) {
        isInDebug ? this.debugButton.setLabel('Debug: On') : this.debugButton.setLabel('Debug: Off');
    }

    toggleDebug() {
        if (DebugService.isInDebugMode()) {
            DebugService.turnDebugModeOff();
            this._setDebugText(false);
        }
        else {
            DebugService.turnDebugModeOn();
            this._setDebugText(true);
        }
    }
}