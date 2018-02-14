window.onload = function () {

  var mainInputVal = document.getElementById("main-input");
  var itemCount = 0;
  var list = document.querySelector(".item-list");

  // Клик по кнопке ОК
  document.getElementById("btn-ok").onclick = function () {
    if (mainInputVal.value === "") {
      mainInputVal.style.borderColor = "red";
      return;
    }
    mainInputVal.style.borderColor = "";
    addTask(mainInputVal.value);
    mainInputVal.value = "";
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
      var itemsInList = document.querySelectorAll("li.item > input[type='checkbox']");
      for (var i = 0; i < itemCount; i++) {

        itemsInList[i].onclick = function () {
          this.setAttribute("checked", "checked");
          var label = this.parentElement.querySelector("label");

          if (this.click && this.hasAttribute("checked")) {
            label.classList.toggle("item-done");
          }
          if(this.type === "text") {
            label.classList.remove("item-done");
          }
        }

      }
    }
  }

  function addTask(text) {
    var itemList = document.createElement("li");
    itemList.classList.add("item");
    // Остальные элементы айтема
    itemList.innerHTML =
      '<input type="checkbox" id="item-' + itemCount + '">' + "\n" +
      '<label for="item-' + itemCount + '">' + text + '</label>' +
      '<button id="btn-save">Сохр.</button><div class="buttons"><button id="btn-delete">Удалить</button><button id="btn-red">Ред.</button></div>';

    list.insertAdjacentElement("beforeEnd", itemList);
    itemCount++;
  }

  function initButtons() {
    var items = document.querySelectorAll("li.item");

    for (var i = 0; i < items.length; i++) {
      items[i].querySelector("#btn-delete").onclick = deleteItem;
      items[i].querySelector("#btn-red").onclick = redItem;
    }

    function deleteItem() {
      this.parentElement.parentElement.remove();
    }

    function redItem() {
      var input = this.parentElement.parentElement.querySelector("input");
      var label = this.parentElement.parentElement.querySelector("label");
      var btnSave = this.parentElement.parentElement.querySelector("#btn-save");
      btnSave.style.display = "block";
      var btnRed = this;
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