'use strict';
// объявили строгий режим
String.prototype.firstLetterCaps = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// получаем элементы страницы в переменные
let calculateButton = document.getElementById('start');
let plusButton1 = document.getElementsByTagName('button')[0];
let plusButton2 = document.getElementsByTagName('button')[1];
let checkboxButton = document.querySelector('#deposit-check');
let inputsAdditionalIncomeItem = document.querySelectorAll('.additional_income-item');

let elementsClassValue = document.querySelectorAll('[class*="-value"]');
let varBudgetMonthValue = document.getElementsByClassName('budget_month-value');
let varBudgetDayValue = document.getElementsByClassName('budget_day-value');
let varExpensesMonthValue = document.getElementsByClassName('expenses_month-value');
let varAdditionalIncomeValue = document.getElementsByClassName('additional_income-value');
let varAdditionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
let varIncomePeriodValue = document.getElementsByClassName('income_period-value');
let varTargetMonthValue = document.getElementsByClassName('target_month-value');

let varSalaryAmount = document.querySelector('.salary-amount');
let varIncomeTitle = document.querySelector('.income-title');
let varIncomeAmount = document.querySelector('.income-amount');
let varAdditionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
let varAdditionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
let varExpensesTitle = document.querySelector('.expenses-title');
let varExpensesAmount = document.querySelector('.expenses-amount');
let varAdditionalExpensesItem = document.querySelector('.additional_expenses-item');

let varTargetAmount = document.querySelector('.target-amount');
let varPeriodSelect = document.querySelector('.period-select');


let money = 100;
let expenses = [];

let isNumber = function(item) {
  return !isNaN(parseFloat(item)) && isFinite(item);
};

// функция проверяет, что введено текстовое значение, не число или пустая строка
let stringer = function (questionText) {
  let item = prompt(questionText);
  if (isNumber(item) || item.trim() === '') {
    alert('Введите текст, не число и не пустую строку!');
    return (stringer(questionText));
  }
  return (item);
};
// функция проверяет, что введено число, не строка или пустая строка
let numberer = function (questionText, baseAmount) {
  let item = prompt(questionText, baseAmount);
//  console.log(typeof(item) + ' ' + item + ' ' + isNumber(item));
  if (!isNumber(item) || item.trim() === '') {
    alert('Введите число, а не текст и не пустую строку!');
    return (numberer(questionText, baseAmount));
  }
  return (item);
};


let start = function() {
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

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    precentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    asking: function() {

      if (confirm('Есть ли у вас дополнительный заработок?')){
        let itemIncome = stringer('Какой у вас есть дополнительный заработок?: ');
        let cashIncome = numberer('Сколько в месяц?: ', 10000);
        this.income[itemIncome] = cashIncome;
      }
      let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую: ');
      this.addExpenses = addExpenses.toLowerCase().split(',');
      this.deposit = confirm('Есть ли у вас депозит в банке?');
      let sum = 0;
      let expense = 0;
      for (let i = 0; i < 2; i++){
        expenses[i] = prompt('Введите обязательную статью расходов ' + (i + 1) + ': ');
        do{
          expense = +prompt('Во сколько это обойдется?: ');
          if (!isNumber(expense)) {
            alert('Введите число!');
          }
        }
        while (!isNumber(expense));
        this.expenses[expenses[i]] = expense;
//        console.log('this.expenses: ',this.expenses);
        sum += expense;
      }
        return sum;
    },
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    accumulatedMonth: 0,
    getExpensesMonth: function() {
      for (let key in this.expenses){
//        console.log(this.expenses[key], ' type: ', typeof (this.expenses[key]));
        this.expensesMonth += this.expenses[key];
      }
    },
    getBudget: function() {
      this.budgetMonth = this.budget - this.expensesMonth;
      this.budgetDay = this.budgetMonth / 30;
    },
    getTargetMonth: function() {
      return Math.ceil(this.mission / this.budgetMonth);
    },
    getStatusIncome: function() {
      if (this.budgetDay > 800){
        return ('Высокий уровень дохода');
      } else if (this.budgetDay > 300){
          return ('Средний уровень дохода');
      } else if (this.budgetDay > 0){
        return ('Низкий уровень дохода');
      } else{
        return ('Что-то пошло не так!');
      }
    },
    getInfoDeposit: function() {
      if (this.deposit){
        this.precentDeposit = numberer('Годовой процент депозита?: ', 10);
        this.moneyDeposit = numberer('Какая сумма вложена в депозит?: ', 10000);
      }
    },
    calcSavedMoney: function() {
      return (this.budgetMonth * this.period);
    }    
};

let showObject = function(object){
  console.log('В обекте есть следующие свойства и методы:');
  for (let key in object){
    console.log('свойство/метод: ', key, ', со значением: ', object[key]);
 }
};

//start();
//appData.asking();
//console.log(appData.addExpenses);
//appData.getExpensesMonth();
//appData.getBudget();


//console.log('money ', money);
//console.log('appData.getExpensesMonth ', appData.getExpensesMonth());

if (appData.getTargetMonth() < 0) {
  console.log('цель не будет достигнута!');
} else {
  console.log('цель будет достигнута за: ', appData.getTargetMonth(), ' месяцев');
}

console.log('budgetDay ', Math.floor(appData.budgetDay));

//showObject(appData);
let expensesString ='';

// вариант с циклом for in
for (let key in appData.addExpenses) {
   expensesString += appData.addExpenses[key].firstLetterCaps() + ', ';
}
console.log(expensesString);

// вариант с циклом for of
expensesString ='';
for (let key of appData.addExpenses) {
  expensesString += key.firstLetterCaps() + ', ';
 }
 console.log(expensesString);
