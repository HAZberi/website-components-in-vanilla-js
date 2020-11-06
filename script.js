'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Adding a cookie message
const message = document.createElement('div');
document.querySelector('.header').before(message);
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
//Closing a cookie message
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function (e) {
    message.parentElement.removeChild(message);
  });

//Implement Smooth Scrolling for nav links
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  //Fetching the element with class operations__tab
  const targetClicked = e.target.closest('.operations__tab');

  //Deactivating all the tabs by removing css class on all
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  //Activate the clicked tab
  //I used optional chainning while Jonas used the following code
  //if (!targetClicked) return; Gaurd Clause Tachnique
  targetClicked?.classList.add('operations__tab--active');

  //Deactivating all the content by removing css class on all
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate the clicked tab content
  document
    .querySelector(`.operations__content--${targetClicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu Fade Animation

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

///////////////////////////////Fade in and out function in plain javascript///////////////////////////

const fade = function (el, type, ms) {
  let fadeIn = type === 'in';
  let opacity = fadeIn ? 0 : 1;
  const interval = 50;
  const duration = ms;
  const gap = interval / duration;
  const intervalCallback = function () {
    opacity = fadeIn ? opacity + gap : parseFloat((opacity - gap).toFixed(1));
    el.style.opacity = opacity;
    if (opacity <= 0) el.style.display = 'none';
    if (opacity <= 0 || opacity >= 1) clearInterval(fading);
  };
  if (fadeIn) {
    el.style.display = 'flex';
    el.style.opacity = opacity;
  }
  const fading = setInterval(intervalCallback, interval);
  return fading;
};
////////////////////////Sticky Navigation Intersection Observer API///////////////

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
      fade(navbar, 'in', 250);
    } else {
      fade(navbar, 'out', 200);
      setTimeout(() => {
        navbar.classList.remove('sticky');
        navbar.style.display = 'flex';
        navbar.style.opacity = 1;
      }, 200);
    }
  });
};
const headerObserver = new IntersectionObserver(toggleNav, options);
headerObserver.observe(header);

//////////////////Revealing Content on Scrolling//////////////////////

const allSections = document.querySelectorAll('.section');

const config = {
  root: null,
  threshold: 0.1
}

const revealContent = function (entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const contentObserver = new IntersectionObserver(revealContent, config);

allSections.forEach(function(section){
  contentObserver.observe(section);
  section.classList.add('section--hidden');
})

////////////////////////////////Lazy Loading Images////////////////////////

const lazyImgs = document.querySelectorAll('img[data-src]');
const loadImages = function(entries, observer){
  entries.forEach(entry => {
    //the guard clause technique
    if(!entry.isIntersecting) return
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', (e) => {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
    console.log(entry);
  });
}
const imgObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0
});
lazyImgs.forEach(lazyImg => imgObserver.observe(lazyImg));

///////////////////////////////