"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
function hello(compiler) {
    console.log("\u041F\u0440\u0438\u0432\u0435\u0442 \u043E\u0442 " + compiler);
}
hello("TypeScript");
console.log(greet_1.sayHello("TypeScript2"));
