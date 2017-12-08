import Production from './production';

export default class Cursor extends Production {
  constructor() {
    super();
    this.name = "Cursor";    
    this.cost = 5; // 15
    this.DOMelem = document.getElementById('production-cursor');
  }
  
};