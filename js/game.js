import css from '../css/style.css';
import bigCookie from './bigCookie';
import Producer from './producer';

class Game {
  constructor() {
    this.allCookies = 1250000;
    this.renderProducersTime = 250; // ms
    this.renderBigCookieTime = 100; // ms
    this.saveDataBtn = document.getElementById("save-data");
    this.listOfProducers = [];
    this.mode = "BUY";
    this.multipliers = [1, 20.303718238, 7828749.671335188];
    this.multipleIndex = 0; //0 -> 1, 1->10, 2->100
    this.init();    
  }
  init() {
    document.addEventListener("DOMContentLoaded", function (event) {
      game.saveDataBtn.addEventListener("click", game.saveDataToIndexedDB);

      // Add Render of Big Cookie by Interval every "game.renderBigCookieTime" ms
      setInterval(() => {
        bigCookie.render(game.getAmountOfCookies());
        bigCookie.renderCookiesPerSec(game.howManyCookiesWeProducePerSec());
        game.renderTitleOfBrowser();
      }, game.renderBigCookieTime);

      // Add bigCookie Onclick Event Listener
      bigCookie.DOMelem.addEventListener("click", () => {
        game.incrementCookies();
      });
      // Add OnClick Event to all Producers
      const addProducersEventListeners = (() => {
        game.listOfProducers.forEach((producer) => {
          producer.DOMelem.addEventListener("click", () => {
            if (game.decrementCookies(producer.cost)) {
              let multiple = game.multipleIndex === 0 ? 1: Math.pow(10, game.multipleIndex);
              producer.addOwner(multiple, game.multipliers[game.multipleIndex]);
              producer.render(game.getAmountOfCookies(), game.multipliers[game.multipleIndex]);
              game.addInterval(producer, producer.perSecond);
            }
          });
        });
      })();

      // Render List of All Producers
      const renderListOfProducers = () => {
        game.listOfProducers.forEach((producer) => {
          producer.render(game.getAmountOfCookies(),  game.multipliers[game.multipleIndex]);
        });
      };
      // render it every "renderProducersTime" miliseconds
      setInterval(renderListOfProducers, game.renderProducersTime);

      // Render Store button -> Buy 1 10 100
      document.getElementById("store1").addEventListener("click", () => game.multipleIndex = 0);
      document.getElementById("store10").addEventListener("click", () => game.multipleIndex = 1);
      document.getElementById("store100").addEventListener("click", () => game.multipleIndex = 2);
    });
  }
  getAmountOfCookies() {
    return Math.floor(this.allCookies);
  }
  incrementCookies(incrAmount = 1) {
    this.allCookies = Math.floor((this.allCookies + incrAmount) * 100) / 100;
  }
  decrementCookies(decrAmount = 1) {
    if (this.allCookies >= decrAmount * game.multipliers[game.multipleIndex]) {
      this.allCookies -= decrAmount;
      return true;
    } else {
      console.error("Nie stac cie");
      return false;
    }
  }
  renderTitleOfBrowser() {
    document.title = Math.floor(this.allCookies).toLocaleString() + " cookies";
  }
  howManyCookiesWeProducePerSec() {
    let sum = 0;
    this.listOfProducers.forEach((producer) => {
      sum += Math.floor(((producer.perSecond) * producer.owned) * 10) / 10;
    });
    return sum;
  }
  addInterval(producerName, howManyCookiesAdd, time = 1000) {
    let multiple = game.multipleIndex === 0 ? 1: Math.pow(10, game.multipleIndex);
    for (let i = 0; i < multiple; i += 1) {
      producerName.intervals.push(setInterval(() => {
        // Math.floor because it does not show vaild perSec value of cursor which is incremented by 0.1
        producerName.howManyProduced = Math.floor((producerName.howManyProduced + producerName.perSecond) * 100) / 100;
        game.incrementCookies(howManyCookiesAdd);
      }, time));
    }
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
      const obj = [];
      game.listOfProducers.forEach((prod) => {
        const { baseCost, cost, howManyProduced, isAvailable, name, owned, perSec } = prod;
        obj.push({ baseCost, cost, howManyProduced, isAvailable, name, owned, perSec });
      });
      store.put({
        id: 12345,
        game: { "allCookies": game.allCookies },
        listOfProducers: obj
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
        if (!data) { return; }
        game.allCookies = data.game.allCookies;
        // update values of ech Producers -> owned, howManyProduced
        game.listOfProducers.forEach((producer, index) => {
          if (producer.name === data.listOfProducers[index].name) {
            const { owned, howManyProduced } = data.listOfProducers[index];
            producer.owned = owned;
            producer.howManyProduced = howManyProduced;
          }
        });
        // Add intervals for every Producer
        game.listOfProducers.forEach((producer) => {
          for (let i = 0; i < producer.owned; i += 1) {
            game.addInterval(producer, producer.perSecond, 1000);
          }
        });
      };
      // Close the db when the transaction is done
      tx.oncomplete = function () {
        db.close();
        console.log("End reading");
      };
    };
  }
}
// Initialize 
// constructor -> DOMid, name, baseCost, perSecond, owned, howManyProduced
const cursor = new Producer("producer-cursor", "Cursor", 15, 0.1);
const grandma = new Producer("producer-grandma", "Grandma", 100, 1);
const farm = new Producer("producer-farm", "Farm", 1100, 8);
const mine = new Producer("producer-mine", "Mine", 12000, 47);
const game = new Game();

// Add every producer to List of Producers Array
// to have an easy access to list of Producers
game.listOfProducers.push(cursor);
game.listOfProducers.push(grandma);
game.listOfProducers.push(farm);
game.listOfProducers.push(mine);

// read data from IndexedDB database
game.readDataFromIndexedDB();