import css from '../css/style.css';
import bigCookie from './bigCookie';
import Cursor from './cursor';
import Grandma from './grandma';

class Game {
  constructor() {
    this.amount = 0;
    this.renderProductionsTime = 500; //in ms
    this.renderBigCookieTime = 100; //in ms
  }
  getAmountOfCookies() {
    return this.amount;
  }
  incrementCookies(incrAmount = 1) {
    this.amount += incrAmount;
  }
  decrementCookies(decrAmount = 1) {
    if (this.amount >= decrAmount) {
      this.amount -= decrAmount;
      return true;
    } else {
      console.log("Nie stac cie");
      return false;
    }
  }
};

const renderListOfProductions = () => {
  cursor.render(game.getAmountOfCookies());
  grandma.render(game.getAmountOfCookies());
};
// Initialize 
let game = new Game();
let cursor = new Cursor();
let grandma = new Grandma();

// Add Render of ListOfProductions by Interval
renderListOfProductions();
// render it globally every "renderProductionsTime" mseconds
setInterval(renderListOfProductions, game.renderProductionsTime);
// Add Render of Big Cookie by Interval
setInterval(() => { bigCookie.render(game.getAmountOfCookies()); }, game.renderBigCookieTime);

//Event listeners
bigCookie.DOMelem.addEventListener("click", () => {
  game.incrementCookies();
  cursor.render(game.getAmountOfCookies());
  grandma.render(game.getAmountOfCookies());
});

// Handle production-cursor click
cursor.DOMelem.addEventListener("click", () => {
  if (game.decrementCookies(cursor.cost)) {
    cursor.addOne();
    cursor.render(game.getAmountOfCookies());
    addInterval(cursor, cursor.perSecond);
  }
});
// Handle production-grandma click
grandma.DOMelem.addEventListener("click", () => {
  if (game.decrementCookies(grandma.cost)) {
    grandma.addOne();
    grandma.render(game.getAmountOfCookies());
    addInterval(grandma, grandma.perSecond);

  }
});

// addInterval dynamically function 
const addInterval = (productionName, howManyCookiesAdd) => {
  productionName.intervals.push(setInterval(() => {
    productionName.howManyProduced += productionName.perSecond;
    game.incrementCookies(howManyCookiesAdd);
  }, 1000));
};