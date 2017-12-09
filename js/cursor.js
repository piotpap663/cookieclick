import Production from './production';

export default class Cursor extends Production {
  constructor() {
    super();
    this.name = "Cursor";
    this.baseCost = 15; // 15
    this.cost = 15;
    this.DOMelem = document.getElementById('production-cursor');
  }
  render(cookiesAmount = 0) {
    let content = `
    <span>Name:${this.name}</span>
    <span>*${this.cost}</span>
    <span>Owned:${this.owned}</span>
    <span>Produced:${this.howManyProduced}</span>
    <span>perSec: ${(this.perSecond * this.owned) / 10}</span>
    `; // has to be new function render because perSec is divided by 10 -> 0.1 cookies per sec
    //should be new onhover div for howManyProduced, perSec with same interval as bigcookie beacuse of delay
    this.DOMelem.innerHTML = content;
    if (cookiesAmount >= this.cost) {
      this.DOMelem.style.opacity = 1;
      this.isAvailable = true;
    } else {
      this.DOMelem.style.opacity = 0.6;
      this.isAvailable = false;
    }
  }
}