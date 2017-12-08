import Production from './production';

export default class Grandma extends Production {
  constructor() {
    super();
    this.name = "Grandma";
    this.baseCost = 100; // 100
    this.cost = 100; //
    this.DOMelem = document.getElementById('production-grandma');
    this.perSecond = 12;
  }

};