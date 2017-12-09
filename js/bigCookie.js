const bigCookie = {
  DOMelem: document.getElementById("big-cookie"),
  amount: document.getElementById("amountOfCookies"),
  allCookiesProducePerSec: document.getElementById("all-cookies-per-sec"),
  renderCookiesPerSec(amount) {
    this.allCookiesProducePerSec.innerHTML = amount; 
  },
  render: function (howMany) {
    this.amount.innerHTML = howMany;
  }
};
bigCookie.DOMelem = document.getElementById("big-cookie");
export default bigCookie;