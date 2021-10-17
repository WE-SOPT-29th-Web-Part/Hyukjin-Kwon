document.querySelector('.header__modeToggle').addEventListener('click', (e) => {
  const target = e.currentTarget;
  if (target.classList.contains('moon')) {
    target.classList.remove('moon');
    target.classList.add('sun');
    document.documentElement.removeAttribute('data-theme', 'dark');

  } else {
    target.classList.add('moon');
    target.classList.remove('sun');
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})