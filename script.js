'use strict';
// объявили строгий режим

let isNumber = function(item){
  return !isNaN(parseFloat(item)) && isFinite(item);
};

let money = 100;
let income = 'мойка машин'; 
let addExpenses = 'Интернет, Такси, Коммуналка'; 
let deposit = false; 
let mission = 200000; 
let period = 6;

let start = function(){
  do {
  money = prompt('Ваш месячный доход?: ');
  }
// более длинный вариант записи условия
//  while (isNaN(money) || money.trim() === '' || money === null)

// более короткий вариант записи условия
//  while (isNaN(parseFloat(money)));

// запись условия с использованием написанной функции
    while (!isNumber(money));
};

start();

let showTypeOf = function(item){
  console.log(typeof item);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// первый вариант
addExpenses = addExpenses.toLowerCase();
let addExpensesArray = addExpenses.split(', ');
console.log(addExpensesArray);
// второй вариант
console.log(addExpenses.toLowerCase().split(','));


let budgetDay = money / 30;
//console.log(budgetDay);

// Lesson03
// задания 2, 3, 4

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');

// задание 5
/*const expenses1 = prompt('Введите обязательную статью расходов 1: ');
let amount1 = parseInt(prompt('Во сколько это обойдется?: ', 1));
const expenses2 = prompt('Введите обязательную статью расходов 2: ');
let amount2 = parseInt(prompt('Во сколько это обойдется?: ', 1));

// проверяем введенные суммы на числовое значение, в случае ошибки присваиваем значение 1 
// (не 0,чтобы избежать ошибки деления на 0)
amount1 = (isNaN(amount1)) ? 1 : amount1;
amount2 = (isNaN(amount2)) ? 1 : amount2;*/

let expenses = [];

// Lesson05
let getExpensesMonth = function(){
  let sum = 0;
  let expense = 0;
  for (let i = 0; i < 2; i++){
    expenses[i] = prompt('Введите обязательную статью расходов ' + (i + 1) + ': ');

// проверяем, что вводится только число   
    do{
      expense = +prompt('Во сколько это обойдется?: ');
      if (!isNumber(expense)) {
        alert('Введите число!');
      }
    }
    while (!isNumber(expense));
    sum += expense;
  }
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('money ', money);
console.log('expensesAmount ', expensesAmount);
// Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(){
  return money - expensesAmount;
}

// Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
let accumulatedMonth = getAccumulatedMonth();
//console.log('accumulatedMonth: ', accumulatedMonth);
//console.log('mission: ', mission);
//console.log('Math.ceil(mission / accumulatedMonth) ', Math.ceil(mission / accumulatedMonth));
// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель,
// зная результат месячного накопления (accumulatedMonth) и возвращает результат (округляя до целого вверх)
let getTargetMonth = function(){
  return Math.ceil(mission / accumulatedMonth);
};
//console.log('getTargetMonth: ',getTargetMonth());

// Если getTargetMonth возвращает нам отрицательное значение, 
// то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”
if (getTargetMonth() < 0) {
  console.log('цель не будет достигнута!');
} else {
  console.log('цель будет достигнута за: ', getTargetMonth(), ' месяцев');
}

budgetDay = accumulatedMonth / 30;
console.log('budgetDay ', Math.floor(budgetDay));
