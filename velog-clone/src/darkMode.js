document.querySelector('.header__modeToggle').addEventListener('click', (e) => {
  const target = e.currentTarget;
  if (target.classList.contains('moon')) {
    target.classList.remove('moon');
    target.classList.add('sun');
  } else {
    target.classList.add('moon');
    target.classList.remove('sun');
  }
})