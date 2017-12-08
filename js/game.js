import css from '../css/style.css';
import bigCookie from './bigCookie';

export default class Game {
    constructor(){
      this.amount = 0;
    }
    getAmountOfCookies() {
      return this.amount;
    }
    incrementCookies() {
      this.amount++;
    }

    
};
let game = new Game();

bigCookie.render(game.getAmountOfCookies());

bigCookie.DOMelem.addEventListener('click', () => {
    game.incrementCookies();
    bigCookie.render(game.getAmountOfCookies());
});



