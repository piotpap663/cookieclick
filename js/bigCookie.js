const bigCookie = {
  DOMelem: document.getElementById("big-cookie"),
  amount: document.getElementById("amountOfCookies"),
  render: function (howMany) { 
    this.amount.innerHTML = howMany;
  }
};
bigCookie.DOMelem = document.getElementById("big-cookie");
export default bigCookie;