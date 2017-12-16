import beautifyNumber from "./beautifyNumber";

export default class Producer {
  constructor(DOMid, name, baseCost, perSecond) {
    this.DOMelem = document.getElementById(DOMid);
    this.name = name || "";
    this.baseCost = baseCost || 0;
    this.cost = baseCost;
    this.perSecond = perSecond || 1;
    this.owned = 0;
    this.howManyProduced = 0;
    this.isAvailable = false;
    this.intervals = [];
  }
  render(cookiesAmount = 0, multiplePrice = 1) {
    if (cookiesAmount >= this.cost * multiplePrice) {
      this.DOMelem.style.opacity = 1;
      this.isAvailable = true;
    } else {
      this.DOMelem.style.opacity = 0.5;
      this.isAvailable = false;
    }
    const content = `
    <span class="name">${this.name}</span>
    <span class="price">${beautifyNumber((Math.ceil(this.cost * multiplePrice)))}</span>
    <span class="owned">${beautifyNumber(this.owned)}</span>
    <span class="produced">Produced:${beautifyNumber(Math.floor(this.howManyProduced))}</span>
    <span class="per-sec">perSec: ${beautifyNumber((Math.floor((this.perSecond * this.owned) * 10) / 10))}</span>
    `;
    this.DOMelem.innerHTML = content;
  }
  addOwner(multiple = 1) {
    this.owned += multiple;
    this.cost = Math.ceil(this.baseCost * (1.15 ** this.owned));
  }
}
