import Game from './game';
const bigCookie = {
    DOMelem:  document.getElementById('big-cookie'),
    render: function(howMany) {
        let amount = document.getElementById('amountOfCookies');
        amount.innerHTML = howMany;
    }
};
bigCookie.DOMelem = document.getElementById('big-cookie');
export default bigCookie;