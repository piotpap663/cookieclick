const bigCookie = {
  DOMelem: document.getElementById("big-cookie"),
  amount: document.getElementById("amountOfCookies"),
  allCookiesProducePerSec: document.getElementById("all-cookies-per-sec"),
  renderCookiesPerSec(amount) {
    this.allCookiesProducePerSec.innerHTML = amount.toLocaleString();
  },
  render: (howMany) => { bigCookie.amount.innerHTML = howMany.toLocaleString(); },
};
bigCookie.DOMelem = document.getElementById("big-cookie");
export default bigCookie;
