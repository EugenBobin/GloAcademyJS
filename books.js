'use strict';

let itemAside = document.querySelector('aside');
let collections = document.querySelectorAll('.book');

let itemsOfBook2 = collections[0].querySelectorAll('li');
let itemsOfBook5 = collections[5].querySelectorAll('li');
let itemUlBook6 = collections[2].querySelector('ul');
let itemsOfBook6 = collections[2].querySelectorAll('li');

// выключаем рекламу
//const itemAdv = document.querySelector('.adv');
//itemAdv.remove();
document.querySelector('.adv').remove();

// расставляем книги по порядку с помощью append
/*itemAside.append(collections[0]);
itemAside.append(collections[4]);
itemAside.append(collections[3]);
itemAside.append(collections[5]);
itemAside.append(collections[2]);*/

// меняем фон странички
//document.querySelector('body').style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';
document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';


// меняем название 3 книги
collections[4].querySelector('h2>a').innerText = 'Книга 3. this и Прототипы Объектов';
//collections[4].querySelectorAll('h2>a')[0].innerText = 'Книга 3. this и Прототипы Объектов';
//collections[4].querySelectorAll('h2>a')[0].textContent = 'Книга 3. this и Прототипы Объектов';


// расставляем книги по порядку спомощью after
collections[5].after(collections[2]);
collections[4].after(collections[3]);
collections[1].after(collections[0]);

// восстанавливаем порядок глав в книге 2
itemsOfBook2[1].after(itemsOfBook2[3]);
itemsOfBook2[3].after(itemsOfBook2[6]);
itemsOfBook2[6].after(itemsOfBook2[8]);
itemsOfBook2[8].after(itemsOfBook2[4]);
itemsOfBook2[5].after(itemsOfBook2[7]);
itemsOfBook2[9].after(itemsOfBook2[2]);

// восстанавливаем порядок глав в книге 5
itemsOfBook5[1].after(itemsOfBook5[9]);
itemsOfBook5[9].after(itemsOfBook5[3]);
itemsOfBook5[4].after(itemsOfBook5[2]);
itemsOfBook5[2].after(itemsOfBook5[6]);
itemsOfBook5[7].after(itemsOfBook5[5]);

// добавляем главу в книгу 6
let newLi = document.createElement('li');
newLi.innerText = 'Глава 8: За пределами ES6';
itemUlBook6.insertBefore(newLi, itemsOfBook6[9]);
