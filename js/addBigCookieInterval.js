import bigCookie from "./bigCookie";
import beautifyNumber from "./beautifyNumber";

const addBigCookieInterval = (getAmountOfCookies, howManyCookiesWeProducePerSec, renderTitleOfBrowser, renderBigCookieTime) => {
  setInterval(() => {
    bigCookie.render(beautifyNumber(getAmountOfCookies()));
    bigCookie.renderCookiesPerSec(howManyCookiesWeProducePerSec());
    renderTitleOfBrowser();
  }, renderBigCookieTime);
};
export default addBigCookieInterval;
