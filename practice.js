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

//Styles

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//to get the value of current styles as a string
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

//a use case for computed style with parseInt or parseFloat
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';
console.log(getComputedStyle(message).height);

//changing css variables or custom csss

//document.documentElement.style.setProperty('--color-primary','orangered');


//Attributes
const logo = document.querySelector('.nav__logo');
//to access Standard HTML attributes
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

//to access and setting Non-Standard HTML attributes
console.log(logo.designer);
console.log(logo.setAttribute('designer', 'HazBeri'));
console.log(logo.getAttribute('designer'));

//difference between src absolute and relative paths
console.log(logo.src);//absolute
console.log(logo.getAttribute('src'));//relative

console.log(document.querySelector('.btn--show-modal').href);//absolute
console.log(document.querySelector('.btn--show-modal').getAttribute('href'));//relative

//Data Attributes
console.log(document.querySelector('.nav__logo').dataset.versionNumber);
console.log(logo.getAttribute('data-version-number'));

//Classes
logo.classList.add('c', 'j', 'k');
logo.classList.remove('c', 'j', 'k');
logo.classList.toggle('c', 'j', 'k');
logo.classList.contains('c', 'j', 'k'); //not includes like in arrays
