import addInterval from "./addInterval";

const addOnClickEventToProducers = (listOfProducers, multipleIndex, multipliers, decrementCookies, getAmountOfCookies, incrementCookies) => {
  listOfProducers.forEach((producer) => {
    producer.DOMelem.addEventListener("click", () => {
      if (decrementCookies(producer.cost)) {
        const multiple = multipleIndex === 0 ? 1 : 10 ** multipleIndex;
        producer.addOwner(multiple, multipliers[multipleIndex]);
        producer.render(getAmountOfCookies(), multipliers[multipleIndex]);
        addInterval(producer, producer.perSecond, 1000, multipleIndex, incrementCookies);
      }
    });
  });
};

export default addOnClickEventToProducers;
