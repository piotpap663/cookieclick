const saveDataToIndexedDB = (saveDataBtn, listOfProducers, allCookies) => {
  saveDataBtn.innerHTML = "Saving...";
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
    const tx = db.transaction("SaveGame", "readwrite");
    const store = tx.objectStore("SaveGame");
    // Add some data
    const obj = [];
    listOfProducers.forEach((prod) => {
      const {
        baseCost, cost, howManyProduced, isAvailable, name, owned, perSec,
      } = prod;
      obj.push({
        baseCost, cost, howManyProduced, isAvailable, name, owned, perSec,
      });
    });
    store.put({
      id: 12345,
      game: { allCookies },
      listOfProducers: obj,
    });
    saveDataBtn.innerHTML = "Saved!";
    // Close the db when the transaction is done
    tx.oncomplete = () => {
      db.close();
      setTimeout(() => { saveDataBtn.innerHTML = "Save Game"; }, 1000);
    };
  };
};
export default saveDataToIndexedDB;
