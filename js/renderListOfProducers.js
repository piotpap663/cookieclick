const renderListOfProducers = (listOfProducers, getAmountOfCookies, multipliers, getStoreModeIndex, renderProducersTime) => {
  setInterval(() => {
    listOfProducers.forEach((producer) => {
      producer.render(getAmountOfCookies(), multipliers[getStoreModeIndex()]);
    });
  }, renderProducersTime);
};
export default renderListOfProducers;
