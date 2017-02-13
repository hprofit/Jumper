export function loadMenuImages(game) {
    game.load.atlasJSONHash('buttonSheet', 'assets/Menus/buttonSheet.png', 'assets/Menus/buttonSheet.json');
}

export default class MenuBase {
    constructor(game) {
        this.group_buttons = game.add.group();
    }

    updateMenu(cursors, deltaTime) {

    }

    kill() {
        this.group_buttons.destroy();
    }
}