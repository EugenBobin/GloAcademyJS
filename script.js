'use strict';
// объявили строгий режим

// функция делает первый символ строки заглавным
String.prototype.firstLetterCaps = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// получаем элементы страницы в переменные
let calculateButton = document.getElementById('start');
let resetButton = document.getElementById('cancel');
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
// функция обнуления всех значений переменных в объекте    
    resetAppData: function() {
      this.income = {};
      this.addIncome = [];
      this.expenses = {};
      this.addExpenses = [];
      this.deposit = false;
      this.precentDeposit = 0;
      this.moneyDeposit = 0;
      this.incomeMonth = 0;
      this.mission = 0;
      this.period = 1;
      this.budget = 0;
      this.budgetDay = 0;
      this.budgetMonth = 0;
      this.expensesMonth = 0;
      this.accumulatedMonth = 0;
    },
// функция сброса всех параметров и данных    
    reset: function() {
//      alert('reset');

// разблокируем ввод данных в поля input и убираем все значения
      const dataInputs = document.querySelector('.data').querySelectorAll('input[type="text"]');
      dataInputs.forEach(function(item){
        item.removeAttribute('readOnly');
        item.value = '';
      });
      const dataOutputs = document.querySelector('.result').querySelectorAll('input[type="text"]');
      dataOutputs.forEach(function(item){
//        item.removeAttribute('readOnly');
        item.value = '';
      });      
      this.resetAppData();
      resetButton.style.display = "none";
      calculateButton.style.display = "block";           

    },

    start: function() {
      this.resetAppData();
      appData.budget = +salaryAmount.value;
//      console.log(this);
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getBudget();
      this.getAddExpenses();
      this.getAddIncome();
      this.showResult();
      resetButton.style.display = "block";
      calculateButton.style.display = "none";

// блокируем ввод данных в поля input
      const dataInputs = document.querySelector('.data').querySelectorAll('input[type="text"]');
      dataInputs.forEach(function(item){
        item.setAttribute('readOnly', 'readOnly');
      });

    },


    addExpensesBlock: function(){
      const cloneExpensesItem = expensesItems[0].cloneNode(true);

// удаляем данные из input при копировании блоков      
      const inputs = cloneExpensesItem.querySelectorAll('input');
      inputs.forEach(function(item){
        item.value = '';
      });

      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlusButton);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3){
        expensesPlusButton.style.display = 'none';
      }
    },

    addIncomeBlock: function(){
      let cloneIncomeItem = incomeItems[0].cloneNode(true);

      // удаляем данные из input при копировании блоков      
      const inputs = cloneIncomeItem.querySelectorAll('input');
      inputs.forEach(function(item){
        item.value = '';
      });

      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlusButton);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3){
        incomePlusButton.style.display = 'none';
      }
    },

    getExpenses: function() {
      let sum = 0;
//      console.log(this);
      expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== ''){
//          console.log(this, '---');
          this.expenses[itemExpenses] = cashExpenses;          
//          appData.expenses[itemExpenses] = cashExpenses;
        }
      }.bind(this));
    },

    getIncome: function(){
      incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;

        if (itemIncome !== '' && cashIncome !== ''){
          this.income[itemIncome] = cashIncome;
        }
      }.bind(this));
//      console.log(this);
      for (let key in this.income){
        this.incomeMonth += +this.income[key];
      }
    },
    
    showResult: function(){
//            console.log(this);
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = Math.ceil(this.budgetDay);
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = this.getTargetMonth();
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('input', this.changeIncomePeriodValue.apply(appData));
    },

    getAddExpenses: function() {
      this.addExpenses = [];
      let addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== ''){
          this.addExpenses.push(item);
        }
      }.bind(this));
    },

    getAddIncome: function(){
      this.addIncome = [];
      additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
          this.addIncome.push(itemValue);
        }
      }.bind(this));
    },

    getExpensesMonth: function() {
      for (let key in appData.expenses){
        this.expensesMonth += +this.expenses[key];
      }
    },

    getBudget: function() {
      this.budgetMonth = this.budget - this.expensesMonth;
      this.budgetDay = this.budgetMonth / 30;
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
      incomePeriodValue.value = this.calcPeriod();
    },
    calcPeriod: function(){
      return this.budgetMonth * periodSelect.value;
    }    
};

let checkSalaryAmount = function(){
//  console.log('salaryAmount.value ', salaryAmount.value);
  if (salaryAmount.value !== ''){
    calculateButton.disabled = '';
  } else {
    calculateButton.disabled = 'true';
  }
};

calculateButton.disabled = 'true';

//calculateButton.addEventListener('click', appData.start);
calculateButton.addEventListener('click', appData.start.bind(appData));
resetButton.addEventListener('click', appData.reset.bind(appData));

expensesPlusButton.addEventListener('click', appData.addExpensesBlock);
incomePlusButton.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', rangeChange.bind(appData));
salaryAmount.addEventListener('input', checkSalaryAmount);
salaryAmount.addEventListener('change', checkSalaryAmount);

/*
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

