window.onload = function () {

  let mainInputVal = < HTMLInputElement > document.getElementById("main-input");
  let ol = document.querySelector(".item-list");

  interface Itemp {
    todo: String;
    check: Boolean;
  }

  let arrItems: Array < Itemp > = [];

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
  // Добавляем информацию об айтеме в массив, массив отправляем в LocalStorage 
  function addTask(text: String) {
    let temp: Itemp = {
      todo: text,
      check: false
    }
    arrItems.push(temp);
    localStorage.setItem("todo", JSON.stringify(arrItems));
  }
  // Вывод/обновление списка айтемов
  function outItems() {
    let fragment = document.createDocumentFragment();
    let i = 0;
    // Формирование и заполнение айтема
    for (let key in arrItems) {
      let checked: String = "";
      if (arrItems[key].check) {
        checked = " checked='checked'";
      } else {
        checked = "";
      }
      i++;
      let itemList = document.createElement("li");
      itemList.classList.add("item");
      itemList.innerHTML =
        `<input type="checkbox" id="item-${i}" ${checked}>
        <label for="item-${i}">${arrItems[key].todo}</label>
        <button id="btn-save"></button>
        <div class="buttons">
        <button id="btn-edit"></button>
        <button id="btn-delete"></button>
        </div>`;
      fragment.appendChild(itemList);
    }
    ol.innerHTML = '';
    ol.appendChild(fragment);
    initButtons();
    checkCondition();
  }
  // Инициализация обработчиков кнопок существующих айтемов
  function initButtons() {
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
  // Инициализация проверки состояния айтема
  function checkCondition() {
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
  // Инициализация кнопки очистки списка из LocalStorage
  document.getElementById("btn-clear").onclick = function () {
    localStorage.clear();
    ol.innerHTML = "";
    arrItems = [];
  }

}