
export default class Production {
  constructor() {
    this.howManyProduced = 0;
    this.perSecond = 0;
    this.owned = 0;
    this.isAvailable = false;
    this.cost = 0;
    this.sell = 0;
    this.name = "";
  }
  render(cookiesAmount = 0) {
    let content = `
    <span>${this.name}</span>
    <span>*${this.cost}</span>
    <span>${this.owned > 0 ? this.owned:""}</span>
    `;
    this.DOMelem.innerHTML = content;

    if( cookiesAmount >= this.cost){
      this.DOMelem.style.opacity = 1;
      this.isAvailable = true;      
    } else {
      this.DOMelem.style.opacity = 0.6;
      this.isAvailable = false;
    }
   
  }
  addOne() {
    this.owned++;
    this.cost+=10;
  }
};
