const addInterval = (producerName, howManyCookiesAdd, time = 1000, multipleIndex, incrementCookies) => {
  const multiple = multipleIndex === 0 ? 1 : 10 ** multipleIndex;
  for (let i = 0; i < multiple; i += 1) {
    producerName.intervals.push(setInterval(() => {
      // Math.floor because it does not show vaild perSec
      // value of cursor which is incremented by 0.1
      const prepareVal = producerName.howManyProduced + producerName.perSecond;
      producerName.howManyProduced = Math.floor((prepareVal) * 100) / 100;
      incrementCookies(howManyCookiesAdd);
    }, time));
  }
};
export default addInterval;
