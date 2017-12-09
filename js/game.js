import css from '../css/style.css';
import bigCookie from './bigCookie';
import Cursor from './cursor';
import Grandma from './grandma';

class Game {
  constructor() {
    this.allCookies = 0;
    this.renderProductionsTime = 500; // ms
    this.renderBigCookieTime = 100; // ms
    this.saveDataBtn = document.getElementById("save-data");
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
  saveDataToIndexedDB() {
    console.log("Start save");

    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    // Open (or create) the <database></database>
    const open = indexedDB.open("MyCookieStore", 1);

    // Create the schema
    open.onupgradeneeded = function () {
      const db = open.result;
      const store = db.createObjectStore("SaveGame", { keyPath: "id" });
    };

    open.onsuccess = () => {
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction("SaveGame", "readwrite");
      const store = tx.objectStore("SaveGame");
      // Add some data
      store.put({
        id: 12345,
        game: { "allCookies": game.allCookies },
        productionsList: {
          cursor: { "owned": cursor.owned, "howManyProduced": cursor.howManyProduced },
          grandma: { "owned": grandma.owned, "howManyProduced": grandma.howManyProduced }
        },

      });
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
      };
    };
    console.log("End save");
  }
  readDataFromIndexedDB() {
    console.log("Start reading");
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback 
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    // Open (or create) the database
    const open = indexedDB.open("MyCookieStore", 1);

    // Create the schema
    open.onupgradeneeded = function () {
      const db = open.result;
      const store = db.createObjectStore("SaveGame", { keyPath: "id" });
    };

    open.onsuccess = () => {
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction("SaveGame");
      const store = tx.objectStore("SaveGame");

      // Query the data
      const getData = store.get(12345);

      getData.onsuccess = () => {
        const data = getData.result;  // => "John"
        if(!data) {return;}
        game.allCookies = data.game.allCookies;
        console.log(data);

        // take it to new function
        if (data.productionsList.cursor.owned > 10) {// add cookies every one second instead of 10s -> looks much better
          for (let i = 0; i < data.productionsList.cursor.owned / 10; i += 1) {
            addInterval(cursor, cursor.perSecond, 1000);
          }
        } else {
          for (let i = 0; i < data.productionsList.cursor.owned; i += 1) {
            addInterval(cursor, cursor.perSecond, 10000);
          }
        }
        for (let i = 0; i < data.productionsList.grandma.owned; i += 1) {
          addInterval(grandma, grandma.perSecond, 1000);
        }
        cursor.owned = data.productionsList.cursor.owned;
        grandma.owned = data.productionsList.grandma.owned;
      };

      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
        console.log("End reading");
      };
    };
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

game.saveDataBtn.addEventListener("click", game.saveDataToIndexedDB);

//game.saveDataToIndexedDB();
setTimeout(() => { game.readDataFromIndexedDB(); }, 500);

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

