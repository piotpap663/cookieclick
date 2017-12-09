export default class Production {
  constructor() {
    this.howManyProduced = 0;
    this.perSecond = 1;
    this.owned = 0;
    this.isAvailable = false;
    this.baseCost = 0;
    this.cost = 0;
    this.sell = 0;
    this.name = "";
    this.intervals = [];
  }
  render(cookiesAmount = 0) {
    let content = `
    <span>Name:${this.name}</span>
    <span>*${this.cost}</span>
    <span>Owned:${this.owned}</span>
    <span>Produced:${this.howManyProduced}</span>
    <span>perSec: ${this.perSecond * this.owned}</span>
    `; //should be new onhover div for howManyProduced, perSec with same interval as bigcookie beacuse of delay
    this.DOMelem.innerHTML = content;

    if (cookiesAmount >= this.cost) {
      this.DOMelem.style.opacity = 1;
      this.isAvailable = true;
    } else {
      this.DOMelem.style.opacity = 0.6;
      this.isAvailable = false;
    }
  }
  addOwner() {
    this.owned++;
    this.cost = Math.ceil(this.baseCost * Math.floor(Math.pow(1.15, this.owned)));    
  }
}