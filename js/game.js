import css from '../css/style.css';
import bigCookie from './bigCookie';
import Cursor from './cursor';
import Grandma from './grandma';

class Game {
  constructor() {
    this.allCookies = 1000;
    this.renderProductionsTime = 500; // ms
    this.renderBigCookieTime = 100; // ms
  }
  getAmountOfCookies() {
    return this.allCookies;
  }
  incrementCookies(incrAmount = 1) {
    this.allCookies += incrAmount;
  }
  decrementCookies(decrAmount = 1) {
    if (this.allCookies >= decrAmount) {
      this.allCookies -= decrAmount;
      return true;
    } else {
      console.error("Nie stac cie");
      return false;
    }
  }
  renderTitleOfBrowser() {
    document.title = this.allCookies + " cookies";
  }
  howManyCookiesWeProducePerSec() {
    let cursorCookies = Math.floor(((cursor.perSecond / 10) * cursor.owned) * 100) / 100;
    let grandmaCookies = grandma.perSecond * grandma.owned;
    return cursorCookies + grandmaCookies;
  }
}

const renderListOfProductions = () => {
  // I can make an array of names of production names and make foreach
  cursor.render(game.getAmountOfCookies());
  grandma.render(game.getAmountOfCookies());
};
// Initialize 
let game = new Game();
let cursor = new Cursor();
let grandma = new Grandma();

renderListOfProductions();
// render it every "renderProductionsTime" miliseconds
setInterval(renderListOfProductions, game.renderProductionsTime);
// Add Render of Big Cookie by Interval
setInterval(() => {
  bigCookie.render(game.getAmountOfCookies());
  bigCookie.renderCookiesPerSec(game.howManyCookiesWeProducePerSec());
  game.renderTitleOfBrowser();
}, game.renderBigCookieTime);

// Event listeners
bigCookie.DOMelem.addEventListener("click", () => {
  game.incrementCookies();
  cursor.render(game.getAmountOfCookies());
  grandma.render(game.getAmountOfCookies());
});
// Handle production-cursor click
cursor.DOMelem.addEventListener("click", () => {
  if (game.decrementCookies(cursor.cost)) {
    cursor.addOwner();
    cursor.render(game.getAmountOfCookies());
    addInterval(cursor, cursor.perSecond, 10000);
  }
});
// Handle production-grandma click
grandma.DOMelem.addEventListener("click", () => {
  if (game.decrementCookies(grandma.cost)) {
    grandma.addOwner();
    grandma.render(game.getAmountOfCookies());
    addInterval(grandma, grandma.perSecond);
  }
});

// addInterval dynamically function 
const addInterval = (productionName, howManyCookiesAdd, time = 1000) => {
  productionName.intervals.push(setInterval(() => {
    productionName.howManyProduced += productionName.perSecond;
    game.incrementCookies(howManyCookiesAdd);
  }, time));
};

//zmienic nazwe AddOne()

