export default class MenuBase {
    constructor(game) {
        this.group_buttons = game.add.group();
    }

    static loadMenuImages(game) {
        game.load.atlasJSONHash('buttonSheet', 'assets/Menus/buttonSheet.png', 'assets/Menus/buttonSheet.json');
    }

    updateMenu(cursors, deltaTime) {

    }

    kill() {
        this.group_buttons.destroy();
    }
}