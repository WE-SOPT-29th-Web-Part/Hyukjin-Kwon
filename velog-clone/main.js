"use strict";

const dropdowns = document.querySelectorAll('.filters__dd-wrapper');
const optionsDropdown = document.querySelector('.options > .filters__dd-wrapper .filters__dropdown');
const menuDropdown = document.querySelector('.menu > .filters__dd-wrapper .filters__dropdown')

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('click', (e) => {
    const target = dropdown.closest('li');
    if (target.classList.contains('options')) {
      optionsDropdown.classList.toggle('open');
    } else {
      menuDropdown.classList.toggle('open');
    }
  });
})