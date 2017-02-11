export class DebugGraphicsObjectSquare {
    constructor(game) {
        this.graphics = {
            ul: game.add.graphics(0, 0),
            ur: game.add.graphics(0, 0),
            dl: game.add.graphics(0, 0),
            dr: game.add.graphics(0, 0)
        };
    }
    
    render(spriteBody) {
        this.graphics.ul.reset(spriteBody.x, spriteBody.y);
        this.graphics.ul.beginFill(0xFFFFFF, 1);
        this.graphics.ul.drawCircle(0, 0, 5);
        this.graphics.ul.endFill();

        this.graphics.ur.reset(spriteBody.x + spriteBody.width, spriteBody.y);
        this.graphics.ur.beginFill(0x0000FF, 1);
        this.graphics.ur.drawCircle(0, 0, 5);
        this.graphics.ur.endFill();

        this.graphics.dl.reset(spriteBody.x, spriteBody.y + spriteBody.height);
        this.graphics.dl.beginFill(0xFF0000, 1);
        this.graphics.dl.drawCircle(0, 0, 5);
        this.graphics.dl.endFill();

        this.graphics.dr.reset(spriteBody.x + spriteBody.width, spriteBody.y + spriteBody.height);
        this.graphics.dr.beginFill(0xFF00FF, 1);
        this.graphics.dr.drawCircle(0, 0, 5);
        this.graphics.dr.endFill();
    }
}

export class DebugGraphicsObjectCircle {
    constructor (game) {
        this.graphics = game.add.graphics(0, 0);
    }

    render(spriteBody) {
        this.graphics.beginFill(0x00FFFF);
        this.graphics.drawCircle(spriteBody.x, spriteBody.y, spriteBody.radius * 2);
        this.graphics.endFill();
    }
}