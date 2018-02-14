window.onload = function () {

  let mainInputVal = document.getElementById("main-input");
  let itemCount = 0;
  let ol = document.querySelector(".item-list");

  let arrItems = [];
  if (localStorage.getItem("todo") !== undefined) {
    arrItems = JSON.parse(localStorage.getItem("todo")) || [];
    outItems();
    initButtons();
  }

  console.log(arrItems);
  console.log(localStorage.getItem("todo"));

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
    checkCondition();
  }

  mainInputVal.onkeydown = function (event) {
    if (event.keyCode === 13) {
      document.getElementById("btn-ok").click();
    }
  }

  function checkCondition() {
    if (itemCount > 0) {
      let itemsInList = document.querySelectorAll("li.item > input[type='checkbox']");
      for (let i = 0; i < itemCount; i++) {

        itemsInList[i].onclick = function () {
          this.setAttribute("checked", "checked");
          let label = this.parentElement.querySelector("label");

          if (this.click && this.hasAttribute("checked")) {
            label.classList.toggle("item-done");
          }
          if (this.type === "text") {
            label.classList.remove("item-done");
          }
        }

      }
    }
  }

  function addTask(text) {
    var temp = {};
    temp.todo = text;
    temp.check = false;
    arrItems.push(temp);
    localStorage.setItem("todo", JSON.stringify(arrItems));
  }

  function outItems() {
    let fragment = document.createDocumentFragment();

    for (let key in arrItems) {
      itemCount++;
      let itemList = document.createElement("li");
      itemList.classList.add("item");
      // Остальные элементы айтема и сам текст `
      itemList.innerHTML =
        `<input type="checkbox" id="item-${itemCount}">
            <label for="item-${itemCount}">${arrItems[key].todo}</label>
            <button id="btn-save">Сохр.</button>
            <div class="buttons">
              <button id="btn-delete">Удалить</button>
              <button id="btn-red">Ред.</button>
            </div>`;
      fragment.appendChild(itemList);
    }
    ol.innerHTML = '';
    ol.appendChild(fragment);
  }


  function initButtons() {
    let items = document.querySelectorAll("li.item");
    for (let i = 0; i < items.length; i++) {
      items[i].querySelector("#btn-delete").onclick = deleteItem;
      items[i].querySelector("#btn-red").onclick = redItem;
    }

    function deleteItem() {
      this.parentElement.parentElement.remove();
    }

    function redItem() {
      let input = this.parentElement.parentElement.querySelector("input");
      let label = this.parentElement.parentElement.querySelector("label");
      let btnSave = this.parentElement.parentElement.querySelector("#btn-save");
      btnSave.style.display = "block";
      let btnRed = this;
      btnRed.style.display = "none";

      btnSave.onclick = function () {
        if (!input.value) {
          input.value = label.innerText;
        }
        label.innerText = input.value;
        input.setAttribute("type", "checkbox");
        btnSave.style.display = "none";
        btnRed.style.display = "";
      }
      input.setAttribute("type", "text");
    }
  }

}