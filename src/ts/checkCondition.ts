import {Itemp, arrItems} from "./main";

// Инициализация проверки состояния айтема
export default function checkCondition() {
  let itemsInList = document.querySelectorAll("li.item > input[type='checkbox']");

  itemsInList.forEach(function (curr, i) {
    (itemsInList[i] as HTMLInputElement).onclick = function () {
      let input = this;
      let thisInputNumber = input.id.slice(-1);

      if ((input as HTMLInputElement).type === "text") {
        console.log("это текстовое поле");
        return false;
      }

      if (input.hasAttribute("checked")) {
        input.removeAttribute("checked");
        changeItemCheck(arrItems, Number(thisInputNumber) - 1, false);
        localStorage.setItem("todo", JSON.stringify(arrItems));
      } else {
        input.setAttribute("checked", "checked");
        changeItemCheck(arrItems, Number(thisInputNumber) - 1, true);
        localStorage.setItem("todo", JSON.stringify(arrItems));
      }
    }
  });

  function changeItemCheck(arr: Array < Itemp > , number: number, bool: Boolean) {
    arr[number].check = bool;
  }
}