import {COIN_TYPE} from '../Items/Coin';

export default class HUD {
    constructor(game, playerType = 'brown') {
        this.group_hud = game.add.group();
        this.group_hud.fixedToCamera = true;

        this.fontOptions = {
            fontSize: '30px',
            font: 'Bubblegum',
            strokeThickness: 5
        };
        this.goodHealth = {fill: '#29ad60', stroke: '#1b8246'};
        this.badHealth = {fill: '#ffad49', stroke: '#ea8509'};
        this.crititcalHealth = {fill: '#ff5656', stroke: '#d30a0a'};

        this.healthText = game.add.text(16, 16, '', Object.assign(this.fontOptions, this.goodHealth));
        this.group_hud.add(this.healthText);


        this.coinFontOptions = {fontSize: '24px', font: 'Bubblegum', strokeThickness: 5};

        this[`${COIN_TYPE.BRONZE}CoinText`] = game.add.text(40, 50, 'x0', Object.assign({fill: '#E99F64', stroke: '#A57045'}, this.coinFontOptions));
        this.group_hud.add(this[`${COIN_TYPE.BRONZE}CoinText`]);

        this[`${COIN_TYPE.SILVER}CoinText`] = game.add.text(40, 75, 'x0', Object.assign({fill: '#95B3B5', stroke: '#576C6D'}, this.coinFontOptions));
        this.group_hud.add(this[`${COIN_TYPE.SILVER}CoinText`]);

        this[`${COIN_TYPE.GOLD}CoinText`] = game.add.text(40, 100, 'x0', Object.assign({fill: '#FFCC00', stroke: '#A38200'}, this.coinFontOptions));
        this.group_hud.add(this[`${COIN_TYPE.GOLD}CoinText`]);


        this.bronzeCoin = this.group_hud.create(16, 52, 'coin_bronze');
        this.bronzeCoin.scale.setTo(.4, .4);
        this.group_hud.add(this.bronzeCoin);

        this.silverCoin = this.group_hud.create(16, 77, 'coin_silver');
        this.silverCoin.scale.setTo(.4, .4);
        this.group_hud.add(this.silverCoin);

        this.goldCoin = this.group_hud.create(16, 102, 'coin_gold');
        this.goldCoin.scale.setTo(.4, .4);
        this.group_hud.add(this.goldCoin);


        this.lifeFontOptions = {fontSize: '30px', font: 'Bubblegum', strokeThickness: 8};
        this.lifeText = game.add.text(728, 16, '', Object.assign({fill: '#B67B3F', stroke: '#87592A'}, this.lifeFontOptions));
        this.group_hud.add(this.lifeText);

        this.lifeIcon = this.group_hud.create(700, 16, 'life_icon');
        this.lifeIcon.scale.setTo(.5, .5);
    }

    static loadHUDImages(game) {
        game.load.image('coin_bronze', 'assets/HUD/coin_bronze.png', 61, 61);
        game.load.image('coin_silver', 'assets/HUD/coin_silver.png', 61, 61);
        game.load.image('coin_gold', 'assets/HUD/coin_gold.png', 61, 61);

        game.load.image('life_icon', 'assets/HUD/lifes.png', 52, 71);
    }

    updateLife(lives) {
        this.lifeText.text = `x${lives}`;
    }

    updateHealth(health) {
        let healthBars = '';
        for (let idx = 0; idx < health; idx++) {
            healthBars += '|';
        }
        this.healthText.text = `Health: ${healthBars}`;

        if (health > 5) {
            this.healthText.stroke = this.goodHealth.stroke;
            this.healthText.fill = this.goodHealth.fill;
        }
        else if (health <= 5 && health > 2) {
            this.healthText.stroke = this.badHealth.stroke;
            this.healthText.fill = this.badHealth.fill;
        }
        else if (health <= 2) {
            this.healthText.stroke = this.crititcalHealth.stroke;
            this.healthText.fill = this.crititcalHealth.fill;
        }
    }

    updateCoinAmount(type, amount) {
        this[`${type}CoinText`].text = `x${amount}`;
    }
}