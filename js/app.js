import cookie from './cookie';
import css from '../css/style.css'
const Game = {
    init: function () {
        console.log("Hello i");
    }
};
Game.init();

let niceCookies = cookie();
console.log(niceCookies + ' import works'); 