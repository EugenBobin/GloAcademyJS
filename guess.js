'use strict';
// объявили строгий режим

let userNumber;
// функция проверки на целое число от 1 до 100
let checkNumber = function(item){
  return (Number.isInteger(item) && item < 101 && item > 0);
};

// функция загадывания целого числа от 1 до 100
let getSecretNumber = function(){
  return Math.ceil(Math. random() * 100);
};

// в эту переменную сохраняем загаданное число
const secretNumber = getSecretNumber();

// функция ввода числа пользователем с проверкой, что число целое от 1 до 100
let getUserNumber = function(){
  let askedUserNumber = +prompt('Угадай число от 1 до 100: ');

// если нажата кнопка "Отмена", то игра завершается
  if (askedUserNumber === 0) {
    alert('Игра окончена');
    return;
  }
//  console.log('askedUserNumber ', askedUserNumber);
//  console.log('userNumber ', userNumber);
  if (!checkNumber(askedUserNumber)) {
    alert('Введите целое число от 1до 100!');
//    console.log('userNumber alert ', userNumber);
    return getUserNumber();
    } else {
    return askedUserNumber;
  }
};

let playRound = function(){

// спрашиваем число у пользователя
  userNumber = getUserNumber();
//  console.log(userNumber);

  if (userNumber < secretNumber){
    alert('Загаданное число больше');
    return playRound();
  } else if (userNumber > secretNumber){
    alert('Загаданное число меньше');
    return playRound();

// проверяем на равенство, чтобы надпись не выдавалась при нажатии "Отмена"
  } else if (userNumber === secretNumber){
    alert('Поздравляю, Вы угадали!!!');
//    console.log('Поздравляю, Вы угадали!!!');
    return;
  }
};

playRound();