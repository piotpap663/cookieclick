export default class Producer {
  constructor(DOMid, name, baseCost, perSecond, isAvailable, owned, howManyProduced) {
    this.DOMelem = document.getElementById(DOMid);
    this.name = name || "";
    this.baseCost = baseCost || 0;
    this.cost = baseCost;
    this.perSecond = perSecond || 1;
    this.owned = owned || 0;
    this.howManyProduced = howManyProduced || 0;
    this.isAvailable = isAvailable || false;
    this.intervals = [];
  }
  render(cookiesAmount = 0) {
    let content = `
    <span>Name:${this.name}</span>
    <span>*${this.cost}</span>
    <span>Owned:${this.owned}</span>
    <span>Produced:${Math.floor(this.howManyProduced)}</span>
    <span>perSec: ${Math.floor((this.perSecond * this.owned) * 10) / 10}</span>
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
    this.cost = Math.ceil(this.baseCost * Math.pow(1.15, this.owned));
  }
}