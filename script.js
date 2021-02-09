'use strict';
// объявили строгий режим

// lesson02

let money = 100;
let income = 'мойка машин'; 
let addExpenses = 'Интернет, Такси, Коммуналка'; 
let deposit = false; 
let mission = 200; 
let period = 6;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
//console.log('Длина строки addExpenses ' + addExpenses.length + 'символов');
//console.log('Период равен ' + period + ' месяцев');
//console.log('Цель заработать ' + mission + ' рублей/долларов/гривен/юани');
addExpenses = addExpenses.toLowerCase();
let addExpensesArray = addExpenses.split('');
console.log(addExpensesArray);

let budgetDay = money / 30;
//console.log(budgetDay);

// Lesson03
// задания 2, 3, 4
money = prompt('Ваш месячный доход?: ', money);
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ', addExpenses);
deposit = confirm('Есть ли у вас депозит в банке?');

// задание 5
const expenses1 = prompt('Введите обязательную статью расходов 1: ');
let amount1 = parseInt(prompt('Во сколько это обойдется?: ', 1));
const expenses2 = prompt('Введите обязательную статью расходов 2: ');
let amount2 = parseInt(prompt('Во сколько это обойдется?: ', 1));


// проверяем введенные суммы на числовое значение, в случае ошибки присваиваем значение 1 
// (не 0,чтобы избежать ошибки деления на 0)
amount1 = (isNaN(amount1)) ? 1 : amount1;
amount2 = (isNaN(amount2)) ? 1 : amount2;

// Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную
//const budgetMonth = amount1 + amount2;
//console.log('бюджет на месяц: ', budgetMonth);

// Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, 
// вывести в консоль, округляя в большую сторону (методы объекта Math в помощь)
//console.log('цель будет достигнута за: ', Math.ceil(mission / budgetMonth), ' месяцев');

// Поправить budgetDay учитывая бюджет на месяц, а не месячный доход.
// Вывести в консоль  округлив в меньшую сторону
//budgetDay = budgetMonth / 30;
//console.log(Math.floor(budgetDay));

/* Написать конструкцию условий (расчеты приведены в рублях)	
    Если budgetDay больше 1200, то “У вас высокий уровень дохода”
    Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
    Если budgetDay меньше 600 и больше 0 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
    Если отрицательное значение то вывести “Что то пошло не так”
    Учесть варианты 0, 600 и 1200 (к какому уровню не важно)*/

if (budgetDay > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay > 600 && budgetDay <= 1200) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay > 0 && budgetDay <= 600) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay < 0){
  console.log('Что то пошло не так!');
}

// Lesson04
// Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth(){
  return amount1 + amount2;
};

// Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(){
  return money - (amount1 + amount2);
};

// Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth
let accumulatedMonth = getAccumulatedMonth();

// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель,
// зная результат месячного накопления (accumulatedMonth) и возвращает результат (округляя до целого вверх)
function getTargetMonth(){
  return Math.ceil(mission / accumulatedMonth);
};

console.log('цель будет достигнута за: ', getTargetMonth(), ' месяцев');
budgetDay = accumulatedMonth / 30;
console.log('budgetDay ', Math.floor(budgetDay));

/* вывод переменных и функций для отладки
console.log('money ', money);
console.log('amount1 ', amount1);
console.log('amount2 ', amount2);

console.log('getExpensesMonth ', getExpensesMonth());
console.log('accumulatedMonth ', accumulatedMonth);*/