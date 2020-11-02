'use strict';

console.log(document); //not useful to access document elements
//to access all html elements
console.log(document.documentElement);
//to access head element
console.log(document.head);
//to access body element
console.log(document.body);
//we dont need to use query selector or elementbyId to access head or body

//for all others div elements
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');

//returns a live collection -- if we programatically or dynamically remove
// the elements the collection will be updated automatically
//its not the same case with NodeLists --> Try to delete and re-access
//'allButtons' and 'allSections' in console to see the effect
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//Creating and inserting elements
//.indertAdjacentHTML see implementation in money-transfer-app
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//Implementing new message div
//this will create a child of header
// header.prepend(message);
// header.append(message);
// header.prepend(message.cloneNode(true));//if we need copies of same div

// this will add the elemenet before or after header div
header.before(message);
const secondmessage = message.cloneNode(true); // creates a copy
// header.after(secondmessage);

//delete elements

//item for disscussion deleting clone nodes vs element
//this example shows the difference between node and elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function() {
      //message.remove() || secondmessage.remove();
      message.parentElement.removeChild(message); //for older browser support
  });

//Also see explanation on innerHTML vs insertAdjacentHTML