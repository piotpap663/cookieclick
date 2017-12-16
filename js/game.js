import bigCookie from "./bigCookie";
import Producer from "./producer";
import beautifyNumber from "./beautifyNumber";

require("../css/style.css");

class Game {
  constructor() {
    this.allCookies = 121;
    this.renderProducersTime = 400; // ms
    this.renderBigCookieTime = 100; // ms
    this.saveDataBtn = document.getElementById("save-data");
    this.listOfProducers = [];
    this.multipliers = [1, 20.303718238, 7828749.671335188]; // multipliers from cookieclicker doc
    this.multipleIndex = 0; // 0 -> 1, 1->10, 2->100
    this.init = this.init.bind(this);
  }
  init() {
    this.saveDataBtn.addEventListener("click", this.saveDataToIndexedDB.bind(this));
    // Add Render of Big Cookie by Interval every "game.renderBigCookieTime" ms
    setInterval(() => {
      bigCookie.render(beautifyNumber(this.getAmountOfCookies()));
      bigCookie.renderCookiesPerSec(this.howManyCookiesWeProducePerSec());
      this.renderTitleOfBrowser();
    }, this.renderBigCookieTime);

    // Add bigCookie Onclick Event Listener
    bigCookie.DOMelem.addEventListener("click", () => {
      this.incrementCookies();
    });
    // Add OnClick Event to all Producers
    (() => {
      this.listOfProducers.forEach((producer) => {
        producer.DOMelem.addEventListener("click", () => {
          if (this.decrementCookies(producer.cost)) {
            const multiple = this.multipleIndex === 0 ? 1 : 10 ** this.multipleIndex;
            producer.addOwner(multiple, this.multipliers[this.multipleIndex]);
            producer.render(this.getAmountOfCookies(), this.multipliers[this.multipleIndex]);
            this.addInterval(producer, producer.perSecond);
          }
        });
      });
    })();
    // Render List of All Producers
    const renderListOfProducers = () => {
      this.listOfProducers.forEach((producer) => {
        producer.render(this.getAmountOfCookies(), this.multipliers[this.multipleIndex]);
      });
    };
    renderListOfProducers();
    // render List of All Producers every "renderProducersTime" miliseconds
    setInterval(renderListOfProducers, this.renderProducersTime);

    // Render Store buttons -> Buy 1 10 100
    document.getElementById("store1").addEventListener("click", () => {
      this.multipleIndex = 0;
      document.getElementById("store10").classList.remove("active-multiplier");
      document.getElementById("store100").classList.remove("active-multiplier");
      document.getElementById("store1").classList.add("active-multiplier");
    });
    document.getElementById("store10").addEventListener("click", () => {
      this.multipleIndex = 1;
      document.getElementById("store1").classList.remove("active-multiplier");
      document.getElementById("store100").classList.remove("active-multiplier");
      document.getElementById("store10").classList.add("active-multiplier");
    });
    document.getElementById("store100").addEventListener("click", () => {
      this.multipleIndex = 2;
      document.getElementById("store1").classList.remove("active-multiplier");
      document.getElementById("store10").classList.remove("active-multiplier");
      document.getElementById("store100").classList.add("active-multiplier");
    });
  }
  getAmountOfCookies() {
    return Math.floor(this.allCookies);
  }
  incrementCookies(incrAmount = 1) {
    this.allCookies = Math.floor((this.allCookies + incrAmount) * 100) / 100;
  }
  decrementCookies(decrAmount = 1) {
    if (this.allCookies >= decrAmount * this.multipliers[this.multipleIndex]) {
      this.allCookies -= decrAmount;
      return true;
    }
    return false;
  }
  renderTitleOfBrowser() {
    document.title = `${beautifyNumber(Math.floor(this.allCookies))} cookies`;
  }
  howManyCookiesWeProducePerSec() {
    let sum = 0;
    this.listOfProducers.forEach((producer) => {
      sum += Math.floor(((producer.perSecond) * producer.owned) * 10) / 10;
    });
    return beautifyNumber(sum);
  }
  addInterval(producerName, howManyCookiesAdd, time = 1000) {
    const multiple = this.multipleIndex === 0 ? 1 : 10 ** this.multipleIndex;
    for (let i = 0; i < multiple; i += 1) {
      producerName.intervals.push(setInterval(() => {
        // Math.floor because it does not show vaild perSec
        // value of cursor which is incremented by 0.1
        const prepareVal = producerName.howManyProduced + producerName.perSecond;
        producerName.howManyProduced = Math.floor((prepareVal) * 100) / 100;
        this.incrementCookies(howManyCookiesAdd);
      }, time));
    }
  }
  saveDataToIndexedDB() {
    console.log(this, "savadataindex");
    this.saveDataBtn.innerHTML = "Saving...";
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
    const indexedDB = window.indexedDB || window.mozIndexedDB ||
      window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    // Open (or create) the database
    const open = indexedDB.open("MyCookieStore", 1);

    // Create the schema
    open.onupgradeneeded = () => {
      const db = open.result;
      db.createObjectStore("SaveGame", { keyPath: "id" });
    };
    open.onsuccess = () => {
      console.log(this);
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction("SaveGame", "readwrite");
      const store = tx.objectStore("SaveGame");
      // Add some data
      const obj = [];
      this.listOfProducers.forEach((prod) => {
        const {
          baseCost, cost, howManyProduced, isAvailable, name, owned, perSec,
        } = prod;
        obj.push({
          baseCost, cost, howManyProduced, isAvailable, name, owned, perSec,
        });
      });
      store.put({
        id: 12345,
        game: { allCookies: this.allCookies },
        listOfProducers: obj,
      });
      this.saveDataBtn.innerHTML = "Saved";
      // Close the db when the transaction is done
      tx.oncomplete = () => {
        db.close();
        setTimeout(() => { this.saveDataBtn.innerHTML = "Save Game"; }, 1000);
      };
    };
  }
  readDataFromIndexedDB() {
    // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
    const indexedDB = window.indexedDB || window.mozIndexedDB ||
      window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
    // Open (or create) the database
    const open = indexedDB.open("MyCookieStore", 1);
    // Create the schema
    open.onupgradeneeded = () => {
      const db = open.result;
      db.createObjectStore("SaveGame", { keyPath: "id" });
    };
    open.onsuccess = () => {
      console.log(this);
      // Start a new transaction
      const db = open.result;
      const tx = db.transaction("SaveGame");
      const store = tx.objectStore("SaveGame");
      // Query the data
      const getData = store.get(12345);
      getData.onsuccess = () => {
        const data = getData.result; // => "John"
        if (!data) { return; }
        this.allCookies = data.game.allCookies;
        // update values of ech Producers. Values updated -> owned, howManyProduced and cost
        this.listOfProducers.forEach((producer, index) => {
          if (producer.name === data.listOfProducers[index].name) {
            const { owned, howManyProduced, cost } = data.listOfProducers[index];
            producer.owned = owned;
            producer.howManyProduced = howManyProduced;
            producer.cost = cost;
          }
        });
        // Add intervals for every Producer
        this.listOfProducers.forEach((producer) => {
          for (let i = 0; i < producer.owned; i += 1) {
            this.addInterval(producer, producer.perSecond, 1000);
          }
        });
      };
      // Close the db when the transaction is done
      tx.oncomplete = () => {
        db.close();
      };
    };
  }
}
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

game.readDataFromIndexedDB();
// initialize game when DOM is ready
document.addEventListener("DOMContentLoaded", game.init);
