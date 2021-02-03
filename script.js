// объявляются переменные из задания

let money = 100;
let income = 'мойка машин'; 
let addExpenses = 'Интернет, Такси, Коммуналка'; 
let deposit = false; 
let mission = 200; 
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('Длина строки addExpenses ' + addExpenses.length + 'символов');
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
addExpenses = addExpenses.toLowerCase();
let addExpensesArray = addExpenses.split('');

console.log(addExpensesArray);

let budgetDay = money / 30;
console.log(budgetDay);