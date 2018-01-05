const addStoreBuyButtons = (changeStoreMode) => {
  // Add Store Buy buttons -> Buy 1 10 100
  document.getElementById("store1").addEventListener("click", () => {
    changeStoreMode(0);
    document.getElementById("store10").classList.remove("active-multiplier");
    document.getElementById("store100").classList.remove("active-multiplier");
    document.getElementById("store1").classList.add("active-multiplier");
  });
  document.getElementById("store10").addEventListener("click", () => {
    changeStoreMode(1);
    document.getElementById("store1").classList.remove("active-multiplier");
    document.getElementById("store100").classList.remove("active-multiplier");
    document.getElementById("store10").classList.add("active-multiplier");
  });
  document.getElementById("store100").addEventListener("click", () => {
    changeStoreMode(2);
    document.getElementById("store1").classList.remove("active-multiplier");
    document.getElementById("store10").classList.remove("active-multiplier");
    document.getElementById("store100").classList.add("active-multiplier");
  });
}
export default addStoreBuyButtons;
