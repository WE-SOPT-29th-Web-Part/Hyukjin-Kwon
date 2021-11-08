import { getClassList, safeQuerySelector, isHTMLElement } from "./dom-util";

const viewOptions = safeQuerySelector(".filters__viewOptions");
const gridOption = safeQuerySelector(".filters__grid");
const sliderOption = safeQuerySelector(".filters__slider");
const postContainer = safeQuerySelector(".velog");

const leftSlideBtn = safeQuerySelector(".slider__left");
const rightSlideBtn = safeQuerySelector(".slider__right");
const slidePagination = safeQuerySelector(".slider__index");

type PostList = HTMLElement[] | null;
type PostCloneList = Node[] | null;

let slidePostList: PostList = null;
let currentIndex = 0;
let maxPostCount = 3;
let initialPostList: PostCloneList = null;

const movePost = (direction: -1 | 1) => {
  if (!currentIndex && direction < 0) return false; // 첫번째 포스트에서 왼쪽 시도?
  if (!slidePostList || !slidePagination) return false;
  if (slidePostList.length - maxPostCount <= currentIndex && direction > 0)
    return false; // 마지막 포스트에서 오른쪽 시도?

  getClassList(slidePagination.childNodes[currentIndex])?.remove("current");

  currentIndex += direction;

  slidePostList.forEach((post) => {
    post.style.transform = `translateX(calc(-${
      100 * currentIndex
    }% - ${currentIndex}rem))`;
  }); // translateX(- (인덱스*100 + 마진) )

  getClassList(slidePagination.childNodes[currentIndex])?.add("current");
};

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
};

// 슬라이더 하단에 현재 인덱스 나타나도록 페이지네이션
const createPagination = (pageNum: number) => {
  if (slidePagination && slidePagination.childNodes.length) {
    getClassList(slidePagination.childNodes[0])?.add("current");
    return;
  }

  for (let i = 0; i <= pageNum - maxPostCount; i++) {
    const li = document.createElement("li");
    if (!i) li.classList.add("current");
    if (slidePagination) slidePagination.appendChild(li);
  }
};

const resizePagination = () => {
  if (!slidePagination || !slidePostList) return false;

  // 화면이 줄었을 때
  while (
    maxPostCount + slidePagination.childNodes.length <
    slidePostList.length + 1
  ) {
    const li = document.createElement("li");
    slidePagination.appendChild(li);
  }

  // 화면이 넓어졌을 때
  let removeIdx = slidePagination.childNodes.length - 1;
  while (
    maxPostCount + slidePagination.childNodes.length >
    slidePostList.length + 1
  ) {
    if (currentIndex === removeIdx) {
      getClassList(slidePagination.childNodes[currentIndex])?.remove("current");
      getClassList(slidePagination.childNodes[--currentIndex])?.add("current");
    }
    slidePagination.childNodes[removeIdx--].remove();
  }
};

/*
  map / cloneNode : transform 인라인 속성 오염 방지를 위해 초기 포스트리스트 백업
  left, right 버튼에 슬라이더 이벤트 부착
*/
const initializeSlide = () => {
  slidePostList = [
    ...document.querySelectorAll<HTMLElement>(".velog.slider .velog__post"),
  ];
  initialPostList = slidePostList.map((slide) => slide.cloneNode(true));
  if (!leftSlideBtn || !rightSlideBtn) return;

  applyResponsivePostCount();
  createPagination(slidePostList.length);
  leftSlideBtn.addEventListener("click", moveLeft);
  rightSlideBtn.addEventListener("click", moveRight);
};

const cleanUpSlide = () => {
  if (!slidePostList || !initialPostList) return false;
  if (!initialPostList.length) return false;
  // 각 포스트를 원본으로 교체.
  slidePostList.forEach((post, idx) => {
    if (initialPostList) post.replaceWith(initialPostList[idx]);
  });
  slidePagination?.childNodes.forEach((child) =>
    getClassList(child)?.remove("current")
  );
  currentIndex = 0;

  leftSlideBtn?.removeEventListener("click", moveLeft);
  rightSlideBtn?.removeEventListener("click", moveRight);
};

const handleResize = () => {
  const prevPostCount = maxPostCount;
  applyResponsivePostCount();
  if (slidePostList && prevPostCount !== maxPostCount) resizePagination();
  // 포스트 개수의 변화가 생겼을 때
};

window.addEventListener("resize", handleResize);

viewOptions?.addEventListener("click", (e) => {
  if (!isHTMLElement(e.target)) return false;
  const target = e.target.closest("li");
  if (target) {
    if (target.className === "filters__grid") {
      postContainer?.classList.remove("slider");
      gridOption?.classList.add("selected");
      sliderOption?.classList.remove("selected");
      cleanUpSlide();
    } else if (target.className === "filters__slider") {
      postContainer?.classList.add("slider");
      gridOption?.classList.remove("selected");
      sliderOption?.classList.add("selected");
      initializeSlide();
    }
  }
});
