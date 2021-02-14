'use strict';
// объявили строгий режим
let money = 100;
let expenses = [];

let isNumber = function(item){
  return !isNaN(parseFloat(item)) && isFinite(item);
};

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

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    asking: function(){
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
    getExpensesMonth: function(){
      for (let key in this.expenses){
//        console.log(this.expenses[key], ' type: ', typeof (this.expenses[key]));
        this.expensesMonth += this.expenses[key];
      }
      return appData.expensesMonth;
    },
    getBudget: function(){
      let expensesAmount = this.getExpensesMonth();
      this.budgetMonth = this.budget - expensesAmount;
      this.budgetDay = this.budgetMonth / 30;
    },
    getTargetMonth: function(){
      return Math.ceil(this.mission / this.budgetMonth);
    }    
};

let showObject = function(object){
  console.log('В обекте есть следующие свойства и методы:');
  for (let key in object){
    console.log('свойство/метод: ', key, ', со значением: ', object[key]);
 }
};

start();
appData.asking();
appData.getBudget();


console.log('money ', money);
console.log('appData.getExpensesMonth ', appData.getExpensesMonth());

if (appData.getTargetMonth() < 0) {
  console.log('цель не будет достигнута!');
} else {
  console.log('цель будет достигнута за: ', appData.getTargetMonth(), ' месяцев');
}

console.log('budgetDay ', Math.floor(appData.budgetDay));

showObject(appData);
