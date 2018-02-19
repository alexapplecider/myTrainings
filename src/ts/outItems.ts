import {ol, arrItems} from "./main";

import initButtons from "./initButtons";
import checkCondition from "./checkCondition";

// Вывод/обновление списка айтемов
export default function outItems() {
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