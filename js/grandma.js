import Production from './production';

export default class Grandma extends Production {
  constructor() {
    super();
    this.name = "Grandma";    
    this.cost = 10; // 15
    this.DOMelem = document.getElementById('production-grandma');
    this.perSecond = 12;
  }
  
};