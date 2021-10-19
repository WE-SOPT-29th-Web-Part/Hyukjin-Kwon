const viewOptions = document.querySelector('.filters__viewOptions');
const gridOption = document.querySelector('.filters__grid');
const sliderOption = document.querySelector('.filters__slider');
const postContainer = document.querySelector('.velog');

const leftSlideBtn = document.querySelector('.slider__left');
const rightSlideBtn = document.querySelector('.slider__right');
const slidePagination = document.querySelector('.slider__index');

let slidePostList = null;
let currentIndex = 0; 
let maxPostCount = 3;
let initialPostList = null;

const movePost = (direction) => {
  if (!currentIndex && direction < 0) return false; // 첫번째 포스트에서 왼쪽 시도?
  if (slidePostList.length - maxPostCount <= currentIndex && direction > 0) return false; // 마지막 포스트에서 오른쪽 시도?

  slidePagination.childNodes[currentIndex].classList.remove('current');

  currentIndex += direction;

  slidePostList.forEach((post) => {
    post.style.transform = `translateX(calc(-${100 * currentIndex}% - ${currentIndex}rem))`;
  }); // translateX(- (인덱스*100 + 마진) )

  slidePagination.childNodes[currentIndex].classList.add('current');
}

const moveLeft = () => movePost(-1);
const moveRight = () => movePost(1);

// CSS미디어쿼리 분기점 기반으로 슬라이더에 나타내는 최대 포스트 개수 표현
const applyResponsivePostCount = () => {
  const width = window.innerWidth;
  if (width <= 700) maxPostCount = 1;
  else if (width <= 980) maxPostCount = 2;
  else if (width <= 1280) maxPostCount = 3;
  else if (width <= 1800) maxPostCount = 4;
  else maxPostCount = 5;
}

// 슬라이더 하단에 현재 인덱스 나타나도록 페이지네이션
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

/*
  map / cloneNode : transform 인라인 속성 오염 방지를 위해 초기 포스트리스트 백업
  left, right 버튼에 슬라이더 이벤트 부착
*/
const initializeSlide = () => {
  slidePostList = [...document.querySelectorAll('.velog.slider .velog__post')];
  initialPostList = slidePostList.map((slide) => slide.cloneNode(true));
  if (!leftSlideBtn || !rightSlideBtn) return;

  applyResponsivePostCount();
  createPagination(slidePostList.length);
  leftSlideBtn.addEventListener('click', moveLeft);
  rightSlideBtn.addEventListener('click', moveRight);
}

const cleanUpSlide = () => {
  // 각 포스트를 원본으로 교체.
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