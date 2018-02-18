(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
window.onload = function () {
    let mainInputVal = document.getElementById("main-input");
    let itemCount = 0;
    let ol = document.querySelector(".item-list");
    let arrItems = [];
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
    };
    mainInputVal.onkeydown = function (event) {
        if (event.keyCode === 13) {
            document.getElementById("btn-ok").click();
        }
    };
    // Добавляем информацию об айтеме в массив, массив отправляем в LocalStorage 
    function addTask(text) {
        itemCount++;
        var temp = {
            todo: text,
            check: false
        };
        arrItems.push(temp);
        localStorage.setItem("todo", JSON.stringify(arrItems));
    }
    // Вывод/обновление списка айтемов
    function outItems() {
        let fragment = document.createDocumentFragment();
        let i = 0;
        // Формирование и заполнение айтема
        for (let key in arrItems) {
            let checked = "";
            if (arrItems[key].check) {
                checked = " checked='checked'";
            }
            else {
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
          <button id="btn-delete"></button>
          <button id="btn-edit"></button>
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
        for (let i = 0; i < items.length; i++) {
            items[i].querySelector("#btn-delete").onclick = deleteItem;
            items[i].querySelector("#btn-edit").onclick = editItem;
        }
        function deleteItem() {
            this.parentElement.parentElement.remove();
            let thisInputNumber = this.parentElement.parentElement.querySelector("input").id.slice(-1);
            deleteFromArr(arrItems, Number(thisInputNumber) - 1);
            localStorage.setItem("todo", JSON.stringify(arrItems));
            outItems();
            function deleteFromArr(arr, number) {
                return arr.splice(number, 1);
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
            };
            input.setAttribute("type", "text");
            input.value = label.innerText;
            input.classList.add("edit-input");
            label.style.display = "none";
            function changeItem(arr, number, str) {
                return arr[number].todo = str;
            }
        }
    }
    // Инициализация проверки состояния айтема
    function checkCondition() {
        let itemsInList = document.querySelectorAll("li.item > input[type='checkbox']");
        for (let i = 0; i < itemsInList.length; i++) {
            itemsInList[i].onclick = function () {
                let input = this;
                let thisInputNumber = input.id.slice(-1);
                if (input.type === "text") {
                    console.log("это текстовое поле");
                    return false;
                }
                if (input.hasAttribute("checked")) {
                    input.removeAttribute("checked");
                    changeItemCheck(arrItems, Number(thisInputNumber) - 1, false);
                    localStorage.setItem("todo", JSON.stringify(arrItems));
                }
                else {
                    input.setAttribute("checked", "checked");
                    changeItemCheck(arrItems, Number(thisInputNumber) - 1, true);
                    localStorage.setItem("todo", JSON.stringify(arrItems));
                }
            };
            function changeItemCheck(arr, number, bool) {
                arr[number].check = bool;
            }
        }
    }
    // Инициализация кнопки очистки списка из LocalStorage
    document.getElementById("btn-clear").onclick = function () {
        localStorage.clear();
        ol.innerHTML = "";
        itemCount = 0;
        arrItems = [];
    };
};

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
