'use strict';
/* 
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

console.log(document.getElementsByClassName('btn')); */
/* 
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
  .addEventListener('click', function () {
    //message.remove() || secondmessage.remove();
    message.parentElement.removeChild(message); //for older browser support
  });

//Also see explanation on innerHTML vs insertAdjacentHTML
 */
//Styles
/* 
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//to get the value of current styles as a string
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

//a use case for computed style with parseInt or parseFloat
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';
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
console.log(logo.src); //absolute
console.log(logo.getAttribute('src')); //relative

console.log(document.querySelector('.btn--show-modal').href); //absolute
console.log(document.querySelector('.btn--show-modal').getAttribute('href')); //relative

//Data Attributes
console.log(document.querySelector('.nav__logo').dataset.versionNumber);
console.log(logo.getAttribute('data-version-number'));

//Classes
logo.classList.add('c', 'j', 'k');
logo.classList.remove('c', 'j', 'k');
logo.classList.toggle('c', 'j', 'k');
logo.classList.contains('c', 'j', 'k'); //not includes like in arrays
 */
//Implementing Smooth Scrolling
/* 
const btnLearnMore = document.querySelector('.btn--scroll-to');

const section1 = document.getElementById('section--1');

//implementing smooth scrolling with older browser methods
btnLearnMore.addEventListener('click', function (e) {
  //getting relative element coordinates (target and destination)
  console.log(section1.getBoundingClientRect());
  console.log(e.target.getBoundingClientRect());

  //finding current scroll
  console.log(
    `Current X and Y scroll: ${window.pageXOffset} ${window.pageYOffset}`
  );
  console.log(`Current X and Y scroll: ${window.scrollX} ${window.scrollY}`);

  //getting height and width of viewport
  console.log(
    `Viewport Height: ${document.documentElement.clientHeight
      .toString()
      .padStart(
        5,
        ' '
      )} \nViewport Width: ${document.documentElement.clientWidth
      .toString()
      .padStart(6, ' ')}`
  );
  //scroll to element old school method
  //for older browsers use window.pagexoffset and yoffset
  // window.scrollTo({
  //     left: section1.getBoundingClientRect().left + window.scrollX,
  //     top: section1.getBoundingClientRect().top + window.scrollY,
  //     behavior: 'smooth'
  // });

  //a new and easier method without calculations
  section1.scrollIntoView({ behavior: 'smooth' });
});
 */
//adding and removing event listeners
/* 
const h1 = document.querySelector('h1');
const h4 = document.querySelector('h4');
const himg = document.querySelector('.header__img');

//Old way and can be used in a similar way in the html file
// h1.onmouseenter = function(e){
//     alert("hi from on mouse enter on H1 heading");
// }

//recommended method to add event listeners
h4.addEventListener('mouseenter', e =>
  alert(
    `Hi from recommended method of adding event listeners and arrow functions`
  )
);

//if the event listeners needs to be removed after triggering once
const alertHover = e => {
  alert(
    `Why are you touching me, says the image! \nI will not talk to you in future`
  );
  himg.removeEventListener('click', alertHover);
};

himg.addEventListener('click', alertHover);

//A use case with setTimeout function
const alertOnH1 = function (e) {
  alert('hi from on mouse enter on H1 heading');
};
h1.addEventListener('mouseenter', alertOnH1);
setTimeout(() => {
  console.log(`I will remove the event on h1. Sorry for the inconvinence`);
  h1.removeEventListener('mouseenter', alertOnH1);
}, 8000);
 */
//Event propagation and event bubbling
/* 
//create a random color rgb(255, 255, 255)

const randomColor = (min = 0, max = 255) =>
  `rgb(${Math.floor(Math.random() * max - min + 1) + min}, ${
    Math.floor(Math.random() * max - min + 1) + min
  }, ${Math.floor(Math.random() * max - min + 1) + min})`;

document.querySelectorAll('.nav__link').forEach(function (el){
  el.addEventListener("click", function(e){
    console.log(this);
    this.style.backgroundColor = randomColor();
    console.log('LINK', e.target, e.currentTarget);

    //stop propagation toggle the code below to see true effect of bubbling
    // e.stopPropagation();
});
});
document.querySelector('.nav__links').addEventListener('click', function(e){
    this.style.backgroundColor = randomColor();
    console.log("CONTAINER",e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener("click", function(e){
    this.style.backgroundColor = randomColor();
    console.log("NavBar",e.target, e.currentTarget);
});
 */
//Implement Smooth Scrolling for nav links
/* 
// An inefficient of dealing and implementing smooth scrolling
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('LINK');
//     const id = el.getAttribute('href');
//     console.log(document.querySelector(id));
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   });
// });

//Event Delegation Mehtod
document.querySelector('.nav__links').addEventListener('click', function (e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    console.log('LINK');
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: "smooth"});
  }
});

 */
//DOM Traversing
/* const head1 = document.querySelector('h1');

//Going Downwards or finding children
console.log(head1.querySelectorAll('.highlight'));
console.log(head1.childNodes);
console.log(head1.children);
head1.firstElementChild.style.color = 'white';
head1.lastElementChild.style.color = 'orangered';

//Going Upwards or finding parents
console.log(head1.parentNode);
console.log(head1.parentElement);

head1.closest('.header').style.backgroundColor = 'var(--color-secondary-darker)';
head1.closest('h1').style.color = 'var(--color-tertiary-darker)';

//Going Sideways -- Siblings
console.log(head1.previousElementSibling);//element
console.log(head1.nextElementSibling);

console.log(head1.previousSibling);//node
console.log(head1.nextSibling);//node

console.log(head1.parentElement.children);

[...head1.parentElement.children].forEach(function(el){
  console.log(el);
  if(el !== head1) el.style.transform = 'scale(0.5)';
}); */

///////// Fade Animation/////////////////
//Menu Fade Animation
/* 
const navbar = document.querySelector('.nav');

const fadeHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');
    siblings.forEach(
      function (el) {
        if (el !== link) {
          el.style.opacity = this;
        }
      }.bind(this)
    );
    logo.style.opacity = this;
  }
};

navbar.addEventListener('mouseover', fadeHandler.bind(0.5));
navbar.addEventListener('mouseout', fadeHandler.bind(1));

var someEventHander = function (pram1, pram2, event) {
  //console.log(this);
  console.log(event.target);
  console.log(event, pram1, pram2);
};
//add listener
document
  .getElementById('logo')
  .addEventListener(
    'click',
    someEventHander.bind(null, 'pram1', 'pram2'),
    false
  );
 */
//////////////////Sticky Navigation//////////////////////////////////

// const section1Coords = document.querySelector('#section--1').getBoundingClientRect().top;
// window.addEventListener('scroll', function(){
//   if(window.scrollY > section1Coords) {
//     message.remove();
//     navbar.classList.add('sticky')
//   }
//   else navbar.classList.remove('sticky')
// })

////////////////////////Sticky Navigation Intersection Observer API//////
/* 

///////////////////////////////////////Fade in and Fade Out function in Javascript///
  const fade = function(el, type, ms){
  let fadeIn = type === 'in'
  let opacity = fadeIn ? 0 : 1;
  const interval = 50;
  const duration = ms;
  const gap = interval/duration;
  const intervalCallback =function (){
    opacity = fadeIn ? opacity + gap : opacity - gap;
    el.style.opacity = opacity;
    if(opacity <= 0) el.style.display = 'none'
    if(opacity <= 0 || opacity >=1) clearInterval(fading);
  }
  if(fadeIn){
    el.style.display = 'flex';
    el.style.opacity = opacity;
  }
  
  const fading = setInterval(intervalCallback, interval);
  return fading;
}

const header = document.querySelector('.header');

const headerHeight = parseFloat(getComputedStyle(navbar).height);

const options = {
  root: null,
  rootMargin: `-${headerHeight + 10}px`,
  threshold: 0,
};

const toggleNav = entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      navbar.classList.add('sticky');
      fade(navbar, "in", 750);
    } else {
      navbar.classList.remove('sticky');
      fade(navbar, "in", 250);
    }
  });
};
const headerObserver = new IntersectionObserver(toggleNav, options);
headerObserver.observe(header); */

//////////////////////////Revealing Content on Scrolling////////
/* 
const allSections = document.querySelectorAll('.section');

const config = {
  root: null,
  threshold: 0.1
}

const revealContent = function (entries, observer){
  const [entry] = entries;
  console.log(entry.isIntersecting);
  if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const contentObserver = new IntersectionObserver(revealContent, config);

allSections.forEach(function(section){
  contentObserver.observe(section);
  section.classList.add('section--hidden');
}) */