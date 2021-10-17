const viewOptions = document.querySelector('.filters__viewOptions');
const gridOption = document.querySelector('.filters__grid');
const sliderOption = document.querySelector('.filters__slider');
const postContainer = document.querySelector('.velog');

let slidePagination = null;
let leftSlideBtn = null;
let rightSlideBtn = null;
let slidePostList = null;
let currentIndex = 0; 
let maxPostCount = 3;
let initialPostList = null;

const movePost = (direction) => {
  if (slidePostList.length - maxPostCount <= currentIndex && direction > 0) return false;
  if (!currentIndex && direction < 0) return false;

  slidePagination.childNodes[currentIndex].classList.remove('current');

  currentIndex += direction;
  slidePostList.forEach((post) => {
    post.style.transform = `translateX(calc(-${100 * currentIndex}% - ${currentIndex}rem))`;
  });
  slidePagination.childNodes[currentIndex].classList.add('current');
}

const moveLeft = () => movePost(-1);
const moveRight = () => movePost(1);

const applyResponsivePostCount = () => {
  const width = window.innerWidth;
  if (width <= 700) maxPostCount = 1;
  else if (width <= 980) maxPostCount = 2;
  else if (width <= 1280) maxPostCount = 3;
  else if (width <= 1800) maxPostCount = 4;
  else maxPostCount = 5;
}

const createPagination = (pageNum) => {
  if (slidePagination.childNodes.length) {
    slidePagination.childNodes[0].classList.add('current');
    return;
  }
  
  for(let i = 0; i <= pageNum - maxPostCount; i++) {
    const li = document.createElement('li');
    if (!i) li.classList.add('current');
    if (slidePagination) slidePagination.appendChild(li);
  }
}

const initializeSlide = () => {
  leftSlideBtn = document.querySelector('.slider__left');
  rightSlideBtn = document.querySelector('.slider__right');
  slidePostList = [...document.querySelectorAll('.velog.slider .velog__post')];
  slidePagination = document.querySelector('.slider__index');
  initialPostList = slidePostList.map((slide) => slide.cloneNode(true));
  if (!leftSlideBtn || !rightSlideBtn) return;

  applyResponsivePostCount();
  createPagination(slidePostList.length);
  leftSlideBtn.addEventListener('click', moveLeft);
  rightSlideBtn.addEventListener('click', moveRight);
}

const cleanUpSlide = () => {
  slidePostList.forEach((post, idx) => post.replaceWith(initialPostList[idx]));
  slidePagination.childNodes.forEach((child) => child.classList.remove('current'));
  currentIndex = 0;

  leftSlideBtn.removeEventListener('click', moveLeft);
  rightSlideBtn.removeEventListener('click', moveRight);
}

window.addEventListener('resize', applyResponsivePostCount);

viewOptions.addEventListener('click', (e) => {
  const target = e.target.closest('li');
  if (target) {
    if (target.className === 'filters__grid') {
      postContainer.classList.remove('slider');
      gridOption.classList.add('selected');
      sliderOption.classList.remove('selected');
      cleanUpSlide();
    } else if (target.className === 'filters__slider') {
      postContainer.classList.add('slider');
      gridOption.classList.remove('selected');
      sliderOption.classList.add('selected');
      initializeSlide();
    }
  } 
});