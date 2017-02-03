import GameState from './states/GameState';
// import MapParser from './MapParser.js';

class Game extends Phaser.Game {
	constructor() {
		super(800, 600, Phaser.AUTO, 'content', new GameState());
	}
}

new Game();


// let xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
// 	if (this.readyState == 4 && this.status == 200) {
// 		console.log("Loaded");
// 		new MapParser(this.responseText);
// 	}
// };
// xhttp.open("GET", "maps/JumperTest.tmx", true);
// xhttp.send();
