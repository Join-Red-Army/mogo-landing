let header = document.getElementById('header');
let burgerMenu = document.querySelector('.nav-toggle');
let nav = document.querySelector('.nav');
let navElements = document.querySelectorAll('[data-scroll]');
let intro = document.getElementById('intro');
let introHeight = intro.offsetHeight; // переменная не нужна

// при загрузке страницы проверить, нужно ли показать фиксированый header
showFixedHeader();

window.addEventListener('scroll', () => {
  showFixedHeader();
  // highlightСurrentNavLink();
});

document.addEventListener('click', (ev) => {
  // плавная прокрутка к секциям на странице
  if (ev.target.dataset.scroll) {
    ev.preventDefault();
    smoothScrollTo(document.querySelector(ev.target.dataset.scroll));
    ev.target.classList.add('active');
    nav.classList.remove('active');
    burgerMenu.classList.remove('active');
  }
  // мобильное меню
  if (ev.target.closest('.nav-toggle')) {
    burgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
  }
  // меню-аккордион
  if (ev.target.closest('.accordion__header')) {
    let accordionItem = ev.target.closest('.accordion__item');
    // accordionItem.classList.toggle('active');
    let currentYCoord = window.pageYOffset + 0.5;
    if (accordionItem.classList.contains('active')) {
      accordionItem.classList.remove('active');
    } else {
      accordionItem.parentElement.querySelectorAll('.accordion__item')
        .forEach(el => el.classList.remove('active'));
      accordionItem.classList.add('active');
    }
    window.scrollTo(0, currentYCoord); // костыль  
  }

});


// если окно прокручено ниже блока intro, то header получит класс fixed
function showFixedHeader() {
  if (window.scrollY >= introHeight - header.clientHeight) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }
}

// плавная прокрутка к элементам
function smoothScrollTo(targetElement) {
  // if (nav.classList.contains('active')) {

  // }
  window.scroll({
    top: targetElement.offsetTop - header.clientHeight,
    left: 0,
    behavior: 'smooth'
  });
  navElements.forEach(el => el.classList.remove('active'));
}

// если окно прокручено ниже какого-то блока, 
// выдать класс "active" для соответствующей ссылки в header
// не используется
function highlightСurrentNavLink() {
  navElements.forEach((el, i) => {
    let scroll = window.scrollY;
    let navTarget = document.querySelector(el.dataset.scroll);
    let navTargetTop = navTarget.offsetTop;
    let navTargetBottom = navTarget.offsetTop + navTarget.offsetHeight;
    let nextTargetTop = navElements[i + 1] ? document.querySelector(navElements[i + 1].dataset.scroll).offsetTop : null;

    if (navTargetTop <= scroll && navTargetBottom >= scroll) {
      el.classList.add('active');
    } else if (navTargetBottom < scroll && nextTargetTop > scroll) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  })
}
