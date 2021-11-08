"use strict";

import { isHTMLElement } from "./dom-util";

const body = document.querySelector("body");
const postList = document.querySelector("main.velog");

const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");

const isClickedByOutside = (target: HTMLElement) =>
  target.closest("div")?.classList.contains("modal") ||
  target.closest("div")?.classList.contains("modal-wrapper");

const hideModal = () => {
  modal?.classList.remove("show");
  body?.classList.remove("modal-show");
};

const showModal = () => {
  body?.classList.add("modal-show");
  modal?.classList.add("show");
};

modal?.addEventListener("click", (e) => {
  if (!isHTMLElement(e.target)) return false;
  if (isClickedByOutside(e.target)) hideModal();
});

postList?.addEventListener("click", (e) => {
  if (!isHTMLElement(e.target)) return false;
  const target = e.target?.closest("article");
  if (!target) return false;

  const clonedTarget = target.cloneNode(true);

  // 모달 내부에 자식이 있다면 현재 클릭한 요소로 replace :: [모달 여러번 클릭 시 요소가 여러개 되는 것 방지]
  if (modalContent?.firstElementChild)
    modalContent?.replaceChild(clonedTarget, modalContent.firstElementChild);
  else modalContent?.appendChild(clonedTarget);

  showModal();

  const modalCloseBtn = document.querySelector(".modal .modal__closeBtn");
  modalCloseBtn?.addEventListener("click", hideModal);
});
