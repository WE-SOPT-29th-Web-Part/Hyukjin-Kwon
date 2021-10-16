const viewOptions = document.querySelector('.filters__viewOptions');
const postContainer = document.querySelector('.velog');

viewOptions.addEventListener('click', (e) => {
  const target = e.target.closest('li');
  if (target) {
    if (target.className === 'filters__grid') {
      postContainer.classList.remove('slider');
    } else if (target.className === 'filters__slider') {
      postContainer.classList.add('slider');
    }
  } 
});