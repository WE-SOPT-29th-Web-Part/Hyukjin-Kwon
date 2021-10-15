const container = document.querySelector('.container');
const input = document.querySelector('.container__input');

const tagList = new Set();

const createTag = (value) => {
  const newTag = document.createElement('span');
  newTag.className = 'container__tag';
  newTag.innerText = value;
  container.appendChild(newTag);

  newTag.onclick = (e) => {
    newTag.remove();
    tagList.delete(e.target.innerText);
  };

  tagList.add(value);
}

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const inputValue = e.target.value.trim();
    if (!inputValue) return false;

    if (!tagList.has(inputValue)) createTag(inputValue);
    e.target.value = '';
  }
});