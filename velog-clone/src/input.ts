import { isHTMLElement, isHTMLInputElement } from "./dom-util";

const container = document.querySelector(".container");
const input = document.querySelector(".container__input");

const tagList = new Set(); // 중복 체크를 위해 Set 사용.

const isKeyboardEvent = (e: Event): e is KeyboardEvent => {
  if (!e) return false;
  return "key" in e;
};

const createTag = (value: string) => {
  const newTag = document.createElement("span");
  newTag.className = "container__tag";
  newTag.innerText = value;
  container?.appendChild(newTag);

  newTag.onclick = (e) => {
    if (!isHTMLElement(e.target)) return false;
    newTag.remove();
    tagList.delete(e.target.innerText);
  };

  tagList.add(value);
};

if (input)
  input.addEventListener("keyup", (e: Event) => {
    const target = e.target;
    if (!isKeyboardEvent(e)) return false;
    if (e.key === "Enter") {
      if (!isHTMLInputElement(target)) return false;
      const inputValue = target.value.trim();
      if (!inputValue) return false;

      if (!tagList.has(inputValue)) createTag(inputValue);
      target.value = "";
    }
  });
