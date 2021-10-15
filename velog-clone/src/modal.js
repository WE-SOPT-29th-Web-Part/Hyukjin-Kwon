"use strict"

const body = document.querySelector('body');
const postList = document.querySelector('main.velog');

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal__content');

const isClickedByOutside = (target) => target.closest('div').classList.contains('modal') || target.closest('div').classList.contains('modal-wrapper');

const hideModal = () => {
  modal.classList.remove('show')
  body.classList.remove('modal-show');
}

const showModal = () => {
  body.classList.add('modal-show');
  modal.classList.add('show');
}

modal.addEventListener('click', (e) => {
  if (isClickedByOutside(e.target)) hideModal();
});

postList.addEventListener('click', (e) => {
  const target = e.target.closest('article');
  if (!target) return false;

  const clonedTarget = target.cloneNode(true);

  if (modalContent.firstElementChild) modalContent.replaceChild(clonedTarget, modalContent.firstElementChild);
  else modalContent.appendChild(clonedTarget);
  
  showModal();

  const modalCloseBtn = document.querySelector('.modal .modal__closeBtn');
  modalCloseBtn.addEventListener('click' , hideModal);
});