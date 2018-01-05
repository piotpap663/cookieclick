import addInterval from "./addInterval";

const readDataFromIndexedDB = (setAmountOfCookies, listOfProducers, multipleIndex, incrementCookies) => {
  // This works on all devices/browsers, and uses IndexedDBShim as a final fallback
  const indexedDB = window.indexedDB || window.mozIndexedDB ||
    window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  // Open (or create) the database
  const open = indexedDB.open("MyCookieStore", 1);
  // Create the schema
  open.onupgradeneeded = () => {
    const db = open.result;
    db.createObjectStore("SaveGame", { keyPath: "id" });
  };
  open.onsuccess = () => {
    // Start a new transaction
    const db = open.result;
    const tx = db.transaction("SaveGame");
    const store = tx.objectStore("SaveGame");
    // Query the data
    const getData = store.get(12345);
    getData.onsuccess = () => {
      const data = getData.result; // => "John"
      if (!data) { return; }
      setAmountOfCookies(data.game.allCookies);
      // update values of ech Producers. Values updated -> owned, howManyProduced and cost
      listOfProducers.forEach((producer, index) => {
        if (producer.name === data.listOfProducers[index].name) {
          const { owned, howManyProduced, cost } = data.listOfProducers[index];
          producer.owned = owned;
          producer.howManyProduced = howManyProduced;
          producer.cost = cost;
        }
      });
      // Add intervals for every Producer
      listOfProducers.forEach((producer) => {
        for (let i = 0; i < producer.owned; i += 1) {
          addInterval(producer, producer.perSecond, 1000, multipleIndex, incrementCookies);
        }
      });
    };
    // Close the db when the transaction is done
    tx.oncomplete = () => {
      db.close();
    };
  };
};
export default readDataFromIndexedDB;
