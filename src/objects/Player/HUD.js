export class HUD {
    constructor(game) {
        this.fontOptions = {
            fontSize: '30px',
            fill: '#29ad60',
            font: 'Bubblegum',
            stroke: '#1b8246',
            strokeThickness: 5
        };
        this.healthText = game.add.text(16, 16, '', this.fontOptions);

        this.coinFontOptions = {fontSize: '24px', font: 'Bubblegum', strokeThickness: 5};

        this.bronzeFontOptions = Object.assign({fill: '#E99F64', stroke: '#A57045'}, this.coinFontOptions);
        this.bronzeCoinText = game.add.text(40, 50, 'x0', this.bronzeFontOptions);

        this.silverFontOptions = Object.assign({fill: '#95B3B5', stroke: '#576C6D'}, this.coinFontOptions);
        this.silverCoinText = game.add.text(40, 75, 'x0', this.silverFontOptions);

        this.goldFontOptions = Object.assign({fill: '#FFCC00', stroke: '#A38200'}, this.coinFontOptions);
        this.goldCoinText = game.add.text(40, 100, 'x0', this.goldFontOptions);

        this.bronzeCoin = game.add.sprite(16, 52, 'coin_bronze');
        this.bronzeCoin.scale.setTo(.4, .4);

        this.silverCoin = game.add.sprite(16, 77, 'coin_silver');
        this.silverCoin.scale.setTo(.4, .4);

        this.goldCoin = game.add.sprite(16, 102, 'coin_gold');
        this.goldCoin.scale.setTo(.4, .4);
    }

    updateHealth(health) {
        this.healthText.text = `Health: ${health}`;
    }

    updateCoinAmount(type, amount) {
        this[`${type}CoinText`].text = `x${amount}`;
    }
}

export function loadHUDImages(game) {
    game.load.image('coin_bronze', 'assets/HUD/coin_bronze.png', 61, 61);
    game.load.image('coin_silver', 'assets/HUD/coin_silver.png', 61, 61);
    game.load.image('coin_gold', 'assets/HUD/coin_gold.png', 61, 61);
}
