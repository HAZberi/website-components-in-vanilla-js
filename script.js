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
    console.log('LINK');
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
  //if (!targetClicked) return;
  targetClicked?.classList.add('operations__tab--active');

  //Deactivating all the content by removing css class on all
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Activate the clicked tab content
  document
    .querySelector(`.operations__content--${targetClicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
