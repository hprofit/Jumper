class InputManager {
    constructor(game) {
        this.game = game;
        this.game.input.gamepad.start();

        this.keyMap = new Map();

        this.pad = this.game.input.gamepad.pad1;
    }

    getKeys (game) {
        return game.input.keyboard.createCursorKeys();
    }

    addKeyMap(name, keys) {

    }

    updateKeys(){

    }
}



var pad;

var buttonA;
var buttonB;
var buttonX;
var buttonY;
var buttonDPadLeft;
var buttonDPadRight;
var buttonDPadUp;
var buttonDPadDown;

var imageA;
var imageB;
var imageX;
var imageY;
var imageDPad;

function create() {


    game.input.gamepad.start();

    pad = game.input.gamepad.pad1;

    pad.addCallbacks(this, { onConnect: addButtons });

}

function addButtons() {

    //  We can't do this until we know that the gamepad has been connected and is started

    buttonA = pad.getButton(Phaser.Gamepad.XBOX360_A);
    buttonB = pad.getButton(Phaser.Gamepad.XBOX360_B);
    buttonX = pad.getButton(Phaser.Gamepad.XBOX360_X);
    buttonY = pad.getButton(Phaser.Gamepad.XBOX360_Y);

    buttonA.onDown.add(onDown, this);
    buttonB.onDown.add(onDown, this);
    buttonX.onDown.add(onDown, this);
    buttonY.onDown.add(onDown, this);

    buttonA.onUp.add(onUp, this);
    buttonB.onUp.add(onUp, this);
    buttonX.onUp.add(onUp, this);
    buttonY.onUp.add(onUp, this);

    //  These won't work in Firefox, sorry! It uses totally different button mappings

    buttonDPadLeft = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
    buttonDPadRight = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
    buttonDPadUp = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP);
    buttonDPadDown = pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);

    buttonDPadLeft.onDown.add(onDown, this);
    buttonDPadRight.onDown.add(onDown, this);
    buttonDPadUp.onDown.add(onDown, this);
    buttonDPadDown.onDown.add(onDown, this);

    buttonDPadLeft.onUp.add(onUp, this);
    buttonDPadRight.onUp.add(onUp, this);
    buttonDPadUp.onUp.add(onUp, this);
    buttonDPadDown.onUp.add(onUp, this);

}

function onDown(button, value) {

    if (button.buttonCode === Phaser.Gamepad.XBOX360_A)
    {
        imageA.alpha = 0.5;
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_B)
    {
        imageB.alpha = 0.5;
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_X)
    {
        imageX.alpha = 0.5;
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y)
    {
        imageY.alpha = 0.5;
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_LEFT)
    {
        imageDPad.frameName = '360_Dpad_Left';
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT)
    {
        imageDPad.frameName = '360_Dpad_Right';
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP)
    {
        imageDPad.frameName = '360_Dpad_Up';
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN)
    {
        imageDPad.frameName = '360_Dpad_Down';
    }

}

function onUp(button, value) {

    if (button.buttonCode === Phaser.Gamepad.XBOX360_A)
    {
        imageA.alpha = 1;
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_B)
    {
        imageB.alpha = 1;
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_X)
    {
        imageX.alpha = 1;
    }
    else if (button.buttonCode === Phaser.Gamepad.XBOX360_Y)
    {
        imageY.alpha = 1;
    }
    else
    {
        imageDPad.frameName = '360_Dpad';
    }

}
