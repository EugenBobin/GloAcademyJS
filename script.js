'use strict';
// объявили строгий режим

// функция делает первый символ строки заглавным
String.prototype.firstLetterCaps = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// получаем элементы страницы в переменные
let calculateButton = document.getElementById('start');
let incomePlusButton = document.getElementsByTagName('button')[0];
let expensesPlusButton = document.getElementsByTagName('button')[1];
let checkboxButton = document.querySelector('#deposit-check');
let inputsAdditionalIncomeItem = document.querySelectorAll('.additional_income-item');

let elementsClassValue = document.querySelectorAll('[class*="-value"]');
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let additionalIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
let additionalIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');

let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');


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

let rangeChange = function() {
  periodAmount.innerText = periodSelect.value;
};


let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    precentDeposit: 0,
    moneyDeposit: 0,
    incomeMonth: 0,
    mission: 50000,
    period: 3,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    accumulatedMonth: 0,
    start: function() {

       appData.budget = +salaryAmount.value;
//      console.log('type salaryAmount: ', typeof salaryAmount.value, ', ', salaryAmount.value);
//     console.log('type appData.budget: ', typeof appData.budget, ', ', appData.budget);

      appData.getExpenses();
      appData.getExpensesMonth();
      appData.getBudget();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.showResult();
    },


    addExpensesBlock: function(){
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusButton);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3){
        expensesPlusButton.style.display = 'none';
      }
    },

    addIncomeBlock: function(){
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlusButton);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3){
        incomePlusButton.style.display = 'none';
      }
    },

    getExpenses: function() {
      let sum = 0;
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
//        console.log('type itemExpenses ', typeof itemExpenses, ' value ', itemExpenses);
//        console.log('type cashExpenses ', typeof cashExpenses, ' value ', cashExpenses);

        if (itemExpenses !== '' && cashExpenses !== ''){
          appData.expenses[itemExpenses] = cashExpenses;
//          sum += +cashExpenses;
//          console.log(sum);
        }
      });
    },

    getIncome: function(){
      incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== ''){
          appData.income[itemIncome] = cashIncome;
        }
      });
      
      for (let key in appData.income){
        appData.incomeMonth += +appData.income[key];
      }
    },
    
    showResult: function(){
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = Math.ceil(appData.budgetDay);
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', ');
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = appData.getTargetMonth();
      incomePeriodValue.value = appData.calcPeriod();
      periodSelect.addEventListener('input', appData.changeIncomePeriodValue);
    },

    getAddExpenses: function() {
      appData.addExpenses = [];
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== ''){
          appData.addExpenses.push(item);
        }
      });
    },

    getAddIncome: function(){
      appData.addIncome = [];
      additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
          appData.addIncome.push(itemValue);
        }
      });
    },

    getExpensesMonth: function() {
      for (let key in appData.expenses){
//        console.log('key: ', key, ' type: ', typeof (key));
//        console.log('appData.expenses[key]: ', appData.expenses[key], ' type: ', typeof (appData.expenses[key]));
        appData.expensesMonth += +appData.expenses[key];
      }
//      console.log('appData.expensesMonth: ', appData.expensesMonth, ' type: ', typeof appData.expensesMonth);      
    },

    getBudget: function() {
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;
    },

    getTargetMonth: function() {
      return Math.ceil(targetAmount.value / this.budgetMonth);
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
    },

    changeIncomePeriodValue: function() {
      incomePeriodValue.value = appData.calcPeriod();
    },
    calcPeriod: function(){
      return appData.budgetMonth * periodSelect.value;
    }    
};

let checkSalaryAmount = function(){
  console.log('salaryAmount.value ', salaryAmount.value);
  if (salaryAmount.value !== ''){
    calculateButton.disabled = '';
  } else {
    calculateButton.disabled = 'true';
  }
};

calculateButton.disabled = 'true';


//salaryAmount.value = 50000;

calculateButton.addEventListener('click', appData.start);
expensesPlusButton.addEventListener('click', appData.addExpensesBlock);
incomePlusButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', rangeChange);
salaryAmount.addEventListener('input', checkSalaryAmount);
salaryAmount.addEventListener('change', checkSalaryAmount);

/*
let showObject = function(object){
  console.log('В обекте есть следующие свойства и методы:');
  for (let key in object){
    console.log('свойство/метод: ', key, ', со значением: ', object[key]);
 }
};



if (appData.getTargetMonth() < 0) {
  console.log('цель не будет достигнута!');
} else {
  console.log('цель будет достигнута за: ', appData.getTargetMonth(), ' месяцев');
}
*/


/*
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
 */

