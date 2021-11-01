"use strict";

let isAnyDropdownOpen = false;

const dropdowns = document.querySelectorAll('.filters__dd-wrapper');
const optionsDropdown = document.querySelector('.options > .filters__dd-wrapper .filters__dropdown');
const menuDropdown = document.querySelector('.menu > .filters__dd-wrapper .filters__dropdown')

const dropdownTextGroup = document.querySelectorAll('ul.filters__dropdown');
const currentDropDownText = document.querySelector('.filters__dd-current > span');

// 드랍다운 외부 구역 클릭 시 드랍다운 close
document.addEventListener('click', (e) => {
  const target = e.target;
  const parent = target.closest('li');
  const isDropdownClicked = parent && (parent.classList.contains('options') || parent.classList.contains('menu'));
  if (isDropdownClicked || !isAnyDropdownOpen) return false;
  menuDropdown.classList.remove('open');
  optionsDropdown.classList.remove('open');
});

// 드랍다운 클릭 시 (open / close) 토글
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', () => {
    const target = dropdown.closest('li.filters__list');
    
    target.classList.contains('options') ? optionsDropdown.classList.toggle('open'): menuDropdown.classList.toggle('open');

    isAnyDropdownOpen = optionsDropdown.classList.contains('open') || menuDropdown.classList.contains('open');
  });
})

// 드랍다운 텍스트 클릭 시 focus 효과
dropdownTextGroup.forEach((dropdownText, ddIndex) => {
  dropdownText.addEventListener('click', (e) => {
    const target = e.target;
    const parent = target.closest('ul');
    if (parent && parent.classList.contains('filters__dropdown')) {
      [...parent.children].forEach((child) => {
        child.classList.remove('selected');
      })
      target.classList.add('selected');
      if (!ddIndex) currentDropDownText.innerText = target.innerText;
      /* 
        ddIndex === 0: 왼쪽 드랍다운(클릭 시 텍스트 변경)
        ddIndex === 1: 오른쪽 드랍다운(텍스트 변경 X)
      */

    }
  })
})