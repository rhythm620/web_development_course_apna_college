for(let i =0;i<5;i++){
    console.log(i);
}

let args = process.argv;

for(let i =0;i<args.length;i++){
    console.log("Hello to " + args[i]);
}

let rhythm = require("./math");
console.log(rhythm);
console.log(rhythm.sum(12,32));
console.log(rhythm.mul(12,32));
console.log(rhythm.g);
console.log(rhythm.pi);

const info = require("./fruits");
console.log(info);
console.log(info[0].name);
console.log(info[1].color);

// import {sum,pi,mul} from "./math.js";
// console.log(sum(1,4));
// console.log(mul(1,4));

