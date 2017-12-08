import Production from './production';

export default class Cursor extends Production {
  constructor() {
    super();
    this.name = "Cursor";
    this.baseCost = 15; // 15
    this.cost = 15;
    this.DOMelem = document.getElementById('production-cursor');
  }
};