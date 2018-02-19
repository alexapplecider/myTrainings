import addTask from "./addTask";
import outItems from "./outItems";
import initButtons from "./initButtons";

// export default window.onload = function () {

  let mainInputVal = < HTMLInputElement > document.getElementById("main-input");
  let ol = document.querySelector(".item-list");

  interface Itemp {
    todo: String;
    check: Boolean;
  }

  export let arrItems: Array < Itemp > = [];

  if (localStorage.getItem("todo") !== undefined) {
    arrItems = JSON.parse(localStorage.getItem("todo")) || [];
    outItems();
  }

  document.getElementById("btn-ok").onclick = function () {
    if (mainInputVal.value === "") {
      mainInputVal.style.borderColor = "red";
      return;
    }
    mainInputVal.style.borderColor = "";
    addTask(mainInputVal.value);
    mainInputVal.value = "";
    outItems();
    initButtons();
  }

  mainInputVal.onkeydown = function (event) {
    if (event.keyCode === 13) {
      document.getElementById("btn-ok").click();
    }
  }
  
  // Инициализация кнопки очистки списка из LocalStorage
  document.getElementById("btn-clear").onclick = function () {
    localStorage.clear();
    ol.innerHTML = "";
    arrItems = [];
  }

// }

export default arrItems;
export {ol as ol, Itemp as Itemp};