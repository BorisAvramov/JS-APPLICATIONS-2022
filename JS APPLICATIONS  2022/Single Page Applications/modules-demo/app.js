//named exports /naimenuvani/ imeto trabva da e syshtoto kato inicializaciqta
import {multiplyNum as mult, sumNum} from './functionsToUse.js';
import {myArr, logArray} from './dataExport.js';
//defaul import
import myPerson, {exampleFunc} from './personClassExample.js';


//display in console of browser
console.log(sumNum(3, 2));

logArray();
console.log(myArr);

const person = new myPerson('pesho', 35);
console.log(person);

console.log(mult(2, 5));
