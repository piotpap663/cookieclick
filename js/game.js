import css from '../css/style.css';
import bigCookie from './bigCookie';
import Cursor from './cursor';
import Grandma from './grandma';

class Game {
  constructor(){
    this.amount = 0;
    this.renderProductionsTime = 100; //in ms
  }
  getAmountOfCookies() {
    return this.amount;
  }
  incrementCookies(incrAmount=1) {
    this.amount += incrAmount;
  }    
  decrementCookies(decrAmount=1) {
    if(this.amount >= decrAmount){
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
  bigCookie.render(game.getAmountOfCookies());
};
// Initialize 
let game = new Game();
let cursor = new Cursor();
let grandma = new Grandma();
console.log(cursor);
console.log(grandma);

// draw list of productions
renderListOfProductions();
//render it globally every "renderProductionsTime" mseconds
setInterval(renderListOfProductions, game.renderProductionsTime);


//Event listeners
bigCookie.DOMelem.addEventListener("click", () => {
  bigCookie.render(game.getAmountOfCookies());
  game.incrementCookies();
  cursor.render(game.getAmountOfCookies());
  grandma.render(game.getAmountOfCookies());
});
// Handle production-cursor click
cursor.DOMelem.addEventListener("click", () => {
  if(game.decrementCookies(cursor.cost)){
    cursor.addOne();
    bigCookie.render(game.getAmountOfCookies());
    cursor.render(game.getAmountOfCookies());
    // add interval
    cursor.intervals.push(setInterval(() => { interv(cursor.perSecond); }, 1000));
    

  }
});

// Handle production-grandma click
grandma.DOMelem.addEventListener("click", () => {
  if(game.decrementCookies(grandma.cost)){
    grandma.addOne();
    bigCookie.render(game.getAmountOfCookies());
    grandma.render(game.getAmountOfCookies());
    grandma.intervals.push(setInterval(() => { interv(grandma.perSecond); }, 1000));
    
  }
});

const interv = (howManyCookiesAdd) => {
  game.incrementCookies(howManyCookiesAdd);
  bigCookie.render(game.getAmountOfCookies());  
};

// var refreshIntervalId = setInterval(interv, 3000);

/* later */
//clearInterval(refreshIntervalId);