export default class Producer {
  constructor(DOMid, name, baseCost, perSecond, owned, howManyProduced) {
    this.DOMelem = document.getElementById(DOMid);
    this.name = name || "";
    this.baseCost = baseCost || 0;
    this.cost = baseCost;
    this.perSecond = perSecond || 1;
    this.owned = owned || 0;
    this.howManyProduced = howManyProduced || 0;
    this.isAvailable = false;
    this.intervals = [];
  }
  render(cookiesAmount = 0, multiplePrice = 1) {
    const content = `
    <span class="name">Name:${this.name}</span>
    <span class="price">*${(Math.ceil(this.cost * multiplePrice)).toLocaleString()}</span>
    <span class="owned">Owned:${this.owned.toLocaleString()}</span>
    <span class="produced">Produced:${Math.floor(this.howManyProduced).toLocaleString()}</span>
    <span class="per-sec">perSec: ${Math.floor((this.perSecond * this.owned) * 10) / 10}</span>
    `;
    this.DOMelem.innerHTML = content;

    if (cookiesAmount >= this.cost * multiplePrice) {
      this.DOMelem.style.opacity = 1;
      this.isAvailable = true;
    } else {
      this.DOMelem.style.opacity = 0.6;
      this.isAvailable = false;
    }
  }
  addOwner(multiple = 1) {
    this.owned += multiple;
    this.cost = Math.ceil(this.baseCost * (1.15 ** this.owned));
  }
}
