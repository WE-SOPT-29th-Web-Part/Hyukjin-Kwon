"use strict";

let isAnyDropdownOpen = false;

const dropdowns = document.querySelectorAll('.filters__dd-wrapper');
const optionsDropdown = document.querySelector('.options > .filters__dd-wrapper .filters__dropdown');
const menuDropdown = document.querySelector('.menu > .filters__dd-wrapper .filters__dropdown')

const dropdownTextGroup = document.querySelectorAll('ul.filters__dropdown');
const currentDropDownText = document.querySelector('.filters__dd-current > span');

document.addEventListener('click', (e) => {
  const target = e.target;
  const parent = target.closest('li');
  const isDropdownClicked = parent && (parent.classList.contains('options') || parent.classList.contains('menu'));
  if (isDropdownClicked || !isAnyDropdownOpen) return false;
  menuDropdown.classList.remove('open');
  optionsDropdown.classList.remove('open');
});

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', (e) => {
    const target = dropdown.closest('li.filters__list');
    if (target.classList.contains('options')) {
      optionsDropdown.classList.toggle('open');
    } else {
      menuDropdown.classList.toggle('open');
    }
    isAnyDropdownOpen = optionsDropdown.classList.contains('open') || menuDropdown.classList.contains('open');
  });
})

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
    }
  })
})