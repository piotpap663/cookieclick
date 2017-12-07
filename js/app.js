import cookie from './cookie';

const Game = {
    init: function () {
        console.log("Hello i");
    }
};
Game.init();

let niceCookies = cookie();
console.log(niceCookies + ' import works'); 