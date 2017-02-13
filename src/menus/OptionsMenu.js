import { turnDebugModeOn, turnDebugModeOff } from '../objects/Debug/Debug.js';
import MenuBase from './MenuBase';
import { CLICKABLE_BUTTON_TYPE, ClickableButton } from './buttons/ClickableButton';

export default class OptionsMenu extends MenuBase {
    constructor(game) {
        super(game);

        //this.group_buttons.add(new ClickableButton(game, 300, 200, 'Resume Game', this.resumeGame, this, CLICKABLE_BUTTON_TYPE.LARGE));
        //this.group_buttons.add(new ClickableButton(game, 300, 250, 'Options', this.launchOptions, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this.group_buttons.add(new ClickableButton(game, 300, 300, 'Back', this.backToPreviousMenu, this, CLICKABLE_BUTTON_TYPE.LARGE));
        this.group_buttons.add(new ClickableButton(game, 300, 375, 'Toggle Debug', this.toggleDebug, this, CLICKABLE_BUTTON_TYPE.LARGE));

        /**
         * Signals - Dispatched when menu buttons are clicked
         * @type {Phaser.Signal}
         */
        this.back = new Phaser.Signal();
    }

    backToPreviousMenu() {
        this.back.dispatch();
    }

    toggleDebug() {
        if (isInDebugMode()) {
            turnDebugModeOff();
        }
        else {
            turnDebugModeOn();
        }
    }
}