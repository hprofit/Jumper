export const CLICKABLE_BUTTON_TYPE = {
    LARGE: 'largeButtons',
    SMALL: 'smallButtons'
};

const DEFAULT_BUTTON_FONT_OPTIONS = {
    fontSize: '30px',
    font: 'Bubblegum',
    strokeThickness: 5,
    fill: '#5acefc',
    stroke: '#166E93'
};

export class ClickableButton extends Phaser.Button {
    constructor(game, x, y, label, callback, callbackContext, type = CLICKABLE_BUTTON_TYPE.LARGE, fontOptions = DEFAULT_BUTTON_FONT_OPTIONS) {
        let overFrame = `UI/${type}/over.png`;
        let outFrame = `UI/${type}/out.png`;
        let downFrame = `UI/${type}/down.png`;
        let upFrame = `UI/${type}/over.png`;

        //super(game, x, y, 'buttonSheet', callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
        super(game, x, y, 'bunnyJumperSheet', callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
        this.anchor.setTo(0, 1);

        if (label) {
            this.label = new Phaser.Text(game, 16, -5, label, fontOptions);
            //puts the label in the center of the button
            this.label.anchor.setTo(0, 1);
            this.addChild(this.label);
            this.setLabel(label);

            this.onInputDown.add(this._moveLabelDown, this);
            this.onInputUp.add(this._moveLabelUp, this);
        }

        this.noPause = true;
    }

    _moveLabelDown() {
        this.label.y += 5;
    }

    _moveLabelUp(){
        this.label.y -= 5;
    }

    setLabel(label) {
        this.label.setText(label);
    }
}