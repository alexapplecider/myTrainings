import {Itemp, arrItems} from "./main";

// Добавляем информацию об айтеме в массив, массив отправляем в LocalStorage 
export default function addTask(text: String) {
  let temp: Itemp = {
    todo: text,
    check: false
  }
  arrItems.push(temp);
  localStorage.setItem("todo", JSON.stringify(arrItems));
}