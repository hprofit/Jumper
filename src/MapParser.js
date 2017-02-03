import xmlToJson from './xml2Json.js';

export default class MapParser {
    // constructor(doc) {
    // 	this.parser = new DOMParser();
    //
    //   let readText = this.parser.parseFromString(doc, "text/xml");
    //
    // 	console.log(xmlToJson(readText));
    //
    // 	let parsedObject = xmlToJson(readText);
    // 	let encodedImage = parsedObject.map.layer.data['#text'];
    // 	encodedImage.trim();
    // 	// console.log(encodedImage);
    //
    // 	let image = new Image();
    // 	image.src = `data:image/png;base64,${encodedImage}`;
    // 	document.body.appendChild(image);
    // }
    constructor(game) {
        console.log(game.add.tilemap('tilemap', 32, 32, 100, 100));
    }
}
