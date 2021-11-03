const container = document.querySelector(".container");
const input = document.querySelector(".container__input");

const tagList = new Set(); // 중복 체크를 위해 Set 사용.

interface IMyKeyboardEvent {
  key: string;
  target: HTMLElement;
}

const createTag = (value: string) => {
  const newTag = document.createElement("span");
  newTag.className = "container__tag";
  newTag.innerText = value;
  container?.appendChild(newTag);

  newTag.onclick = (e) => {
    if (!(e.target instanceof HTMLElement)) return false;
    newTag.remove();
    tagList.delete(e.target.innerText);
  };

  tagList.add(value);
};

if (input)
  input.addEventListener("keyup", (e) => {
    const target = e.target;
    if ((e as KeyboardEvent).key === "Enter") {
      if (!(target instanceof HTMLInputElement)) return false;
      const inputValue = target.value.trim();
      if (!inputValue) return false;

      if (!tagList.has(inputValue)) createTag(inputValue);
      target.value = "";
    }
  });
