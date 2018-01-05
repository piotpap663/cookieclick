import Producer from "./producer";
import Game from "./game";
import readDataFromIndexedDB from "./readDataFromIndexedDB";


// Init
const cursor = new Producer("producer-cursor", "Cursor", 15, 0.1);
const grandma = new Producer("producer-grandma", "Grandma", 100, 1);
const farm = new Producer("producer-farm", "Farm", 1100, 8);
const mine = new Producer("producer-mine", "Mine", 12000, 47);
const bakery = new Producer("producer-bakery", "Bakery", 130000, 260);
const game = new Game();

// Add every producer to List of Producers Array
// to have an easy access to list of Producers
game.listOfProducers.push(cursor);
game.listOfProducers.push(grandma);
game.listOfProducers.push(farm);
game.listOfProducers.push(mine);
game.listOfProducers.push(bakery);

readDataFromIndexedDB(game.setAmountOfCookies, game.listOfProducers, game.getStoreModeIndex, game.incrementCookies);
// initialize game when DOM is ready
document.addEventListener("DOMContentLoaded", game.init);
