import bigCookie from "./bigCookie";
import beautifyNumber from "./beautifyNumber";
import saveDataToIndexedDB from "./saveDataToIndexedDB";
import addOnClickToProducers from "./addOnClickToProducers";
import addBigCookieInterval from "./addBigCookieInterval";
import renderListOfProducers from "./renderListOfProducers";
import addStoreBuyButtons from "./addStoreBuyButtons";

require("../css/style.css");

export default class Game {
  constructor() {
    this.allCookies = 0;
    this.renderProducersTime = 400; // ms
    this.renderBigCookieTime = 100; // ms
    this.saveDataBtn = document.getElementById("save-data");
    this.listOfProducers = [];
    this.multipliers = [1, 20.303718238, 7828749.671335188]; // multipliers from cookieclicker doc
    this.multipleIndex = 0; // 0 -> 1, 1->10, 2->100
    this.init = this.init.bind(this);
    this.changeStoreMode = this.changeStoreMode.bind(this);
    this.getStoreModeIndex = this.getStoreModeIndex.bind(this);
    this.getAmountOfCookies = this.getAmountOfCookies.bind(this);
    this.setAmountOfCookies = this.setAmountOfCookies.bind(this);
    this.incrementCookies = this.incrementCookies.bind(this);
    this.decrementCookies = this.decrementCookies.bind(this);
    this.renderTitleOfBrowser = this.renderTitleOfBrowser.bind(this);
    this.howManyCookiesWeProducePerSec = this.howManyCookiesWeProducePerSec.bind(this);
  }
  init() {
    // Add Save Game button onclick
    this.saveDataBtn.addEventListener("click", () => saveDataToIndexedDB(this.saveDataBtn, this.listOfProducers, this.allCookies));

    // Add Render of Big Cookie by Interval every "game.renderBigCookieTime" ms
    addBigCookieInterval(this.getAmountOfCookies, this.howManyCookiesWeProducePerSec, this.renderTitleOfBrowser, this.renderBigCookieTime);

    // Add bigCookie Onclick Event Listener
    bigCookie.addOnClick(this.incrementCookies);
    addOnClickToProducers(this.listOfProducers, this.multipleIndex, this.multipliers, this.decrementCookies, this.getAmountOfCookies, this.incrementCookies);

    // Render List of All Producers
    renderListOfProducers(this.listOfProducers, this.getAmountOfCookies, this.multipliers, this.getStoreModeIndex, this.renderProducersTime);

    addStoreBuyButtons(this.changeStoreMode);
  }
  changeStoreMode(index) {
    this.multipleIndex = index;
  }
  getStoreModeIndex() {
    return this.multipleIndex;
  }
  getAmountOfCookies() {
    return Math.floor(this.allCookies);
  }
  setAmountOfCookies(cookies) {
    this.allCookies = Math.floor((cookies) * 100) / 100;
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
}
