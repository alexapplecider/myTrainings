import {Itemp, arrItems} from "./main";

import addTask from "./addTask";
import outItems from "./outItems";

// Инициализация обработчиков кнопок существующих айтемов
export default function initButtons() {
  let items = document.querySelectorAll("li.item");

  items.forEach(function (curr, i) {
    (items[i].querySelector("#btn-delete") as HTMLElement).onclick = deleteItem;
    (items[i].querySelector("#btn-edit") as HTMLElement).onclick = editItem;
  });

  function deleteItem() {
    this.parentElement.parentElement.remove();
    let thisInputNumber = this.parentElement.parentElement.querySelector("input").id.slice(-1);

    deleteFromArr(arrItems, Number(thisInputNumber) - 1);
    localStorage.setItem("todo", JSON.stringify(arrItems));
    outItems();

    function deleteFromArr(arr: Array < Itemp > , number: number) {
      return arr.splice(number, 1)
    }
  }

  function editItem() {
    let input = this.parentElement.parentElement.querySelector("input");
    let thisInputNumber = input.id.slice(-1);
    let label = this.parentElement.parentElement.querySelector("label");
    let btnSave = this.parentElement.parentElement.querySelector("#btn-save");

    btnSave.style.display = "inline";
    let btnRed = this;
    btnRed.style.display = "none";

    btnSave.onclick = function () {
      if (!input.value) {
        input.value = label.innerText;
      }
      label.innerText = input.value;
      label.style.display = "inline";
      input.setAttribute("type", "checkbox");
      input.classList.remove("edit-input");
      btnSave.style.display = "none";
      btnRed.style.display = "";
      changeItem(arrItems, Number(thisInputNumber) - 1, input.value);
      localStorage.setItem("todo", JSON.stringify(arrItems));
    }
    input.setAttribute("type", "text");
    input.value = label.innerText;
    input.classList.add("edit-input");
    label.style.display = "none";


    function changeItem(arr: Array < Itemp > , number: number, str: String) {
      return arr[number].todo = str;
    }
  }
}