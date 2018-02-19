(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
// Добавляем информацию об айтеме в массив, массив отправляем в LocalStorage 
function addTask(text) {
    let temp = {
        todo: text,
        check: false
    };
    main_1.arrItems.push(temp);
    localStorage.setItem("todo", JSON.stringify(main_1.arrItems));
}
exports.default = addTask;

},{"./main":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
// Инициализация проверки состояния айтема
function checkCondition() {
    let itemsInList = document.querySelectorAll("li.item > input[type='checkbox']");
    itemsInList.forEach(function (curr, i) {
        itemsInList[i].onclick = function () {
            let input = this;
            let thisInputNumber = input.id.slice(-1);
            if (input.type === "text") {
                console.log("это текстовое поле");
                return false;
            }
            if (input.hasAttribute("checked")) {
                input.removeAttribute("checked");
                changeItemCheck(main_1.arrItems, Number(thisInputNumber) - 1, false);
                localStorage.setItem("todo", JSON.stringify(main_1.arrItems));
            }
            else {
                input.setAttribute("checked", "checked");
                changeItemCheck(main_1.arrItems, Number(thisInputNumber) - 1, true);
                localStorage.setItem("todo", JSON.stringify(main_1.arrItems));
            }
        };
    });
    function changeItemCheck(arr, number, bool) {
        arr[number].check = bool;
    }
}
exports.default = checkCondition;

},{"./main":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const outItems_1 = require("./outItems");
// Инициализация обработчиков кнопок существующих айтемов
function initButtons() {
    let items = document.querySelectorAll("li.item");
    items.forEach(function (curr, i) {
        items[i].querySelector("#btn-delete").onclick = deleteItem;
        items[i].querySelector("#btn-edit").onclick = editItem;
    });
    function deleteItem() {
        this.parentElement.parentElement.remove();
        let thisInputNumber = this.parentElement.parentElement.querySelector("input").id.slice(-1);
        deleteFromArr(main_1.arrItems, Number(thisInputNumber) - 1);
        localStorage.setItem("todo", JSON.stringify(main_1.arrItems));
        outItems_1.default();
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
            changeItem(main_1.arrItems, Number(thisInputNumber) - 1, input.value);
            localStorage.setItem("todo", JSON.stringify(main_1.arrItems));
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
exports.default = initButtons;

},{"./main":4,"./outItems":5}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addTask_1 = require("./addTask");
const outItems_1 = require("./outItems");
const initButtons_1 = require("./initButtons");
// export default window.onload = function () {
let mainInputVal = document.getElementById("main-input");
let ol = document.querySelector(".item-list");
exports.ol = ol;
exports.arrItems = [];
if (localStorage.getItem("todo") !== undefined) {
    exports.arrItems = JSON.parse(localStorage.getItem("todo")) || [];
    outItems_1.default();
}
document.getElementById("btn-ok").onclick = function () {
    if (mainInputVal.value === "") {
        mainInputVal.style.borderColor = "red";
        return;
    }
    mainInputVal.style.borderColor = "";
    addTask_1.default(mainInputVal.value);
    mainInputVal.value = "";
    outItems_1.default();
    initButtons_1.default();
};
mainInputVal.onkeydown = function (event) {
    if (event.keyCode === 13) {
        document.getElementById("btn-ok").click();
    }
};
// Инициализация кнопки очистки списка из LocalStorage
document.getElementById("btn-clear").onclick = function () {
    localStorage.clear();
    ol.innerHTML = "";
    exports.arrItems = [];
};
// }
exports.default = exports.arrItems;

},{"./addTask":1,"./initButtons":3,"./outItems":5}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const initButtons_1 = require("./initButtons");
const checkCondition_1 = require("./checkCondition");
// Вывод/обновление списка айтемов
function outItems() {
    let fragment = document.createDocumentFragment();
    let i = 0;
    // Формирование и заполнение айтема
    for (let key in main_1.arrItems) {
        let checked = "";
        if (main_1.arrItems[key].check) {
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
      <label for="item-${i}">${main_1.arrItems[key].todo}</label>
      <button id="btn-save"></button>
      <div class="buttons">
      <button id="btn-edit"></button>
      <button id="btn-delete"></button>
      </div>`;
        fragment.appendChild(itemList);
    }
    main_1.ol.innerHTML = '';
    main_1.ol.appendChild(fragment);
    initButtons_1.default();
    checkCondition_1.default();
}
exports.default = outItems;

},{"./checkCondition":2,"./initButtons":3,"./main":4}]},{},[4])

//# sourceMappingURL=bundle.js.map
