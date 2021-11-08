"use strict";

const isHTMLElement = (someElement: Element): someElement is HTMLElement => {
  return someElement instanceof HTMLElement;
};

const isHTMLInputElement = (
  someElement: Element
): someElement is HTMLInputElement => {
  return "value" in someElement;
};

const safeQuerySelector = (selector: string) => {
  const element = document.querySelector(selector);

  if (!element) return null;
  if (!isHTMLElement(element)) return null;

  return element;
};

const rightSection = safeQuerySelector(".todos__right");
const leftSection = safeQuerySelector(".todos__left");

const rightList = safeQuerySelector(".todos__right > .todos__items");
const rightInput = safeQuerySelector(
  ".todos__right > .todos__add-item > input"
);

const leftList = safeQuerySelector(".todos__left > .todos__items");
const leftInput = safeQuerySelector(".todos__left > .todos__add-item > input");

const addBtns = document.querySelectorAll(".todos__add-btn");
const inputs = document.querySelectorAll(".todos__add-item > input");

const navs = safeQuerySelector(".navBar");

interface IItem {
  newList: HTMLElement;
  newDiv: HTMLElement;
  newSpan: HTMLElement;
  newButton: HTMLElement;
  newImage: HTMLElement;
}

const isRightSection = (target: HTMLElement): boolean => {
  const closestSection = target.closest("section");
  if (closestSection) return closestSection.classList.contains("todos__right");
  return false;
};

const createElementWithClassName = (query: string) => {
  const [tagName, className] = query.split(".");
  const myElement = document.createElement(tagName);
  if (className) myElement.classList.add(className);

  return myElement;
};

const createNewItem = (): IItem => {
  const newList = createElementWithClassName("li.todos__item");
  const newDiv = createElementWithClassName("div.todos__btn-wrapper");
  const newSpan = document.createElement("span");
  const newButton = createElementWithClassName("button.todos__remove-btn");
  newButton.addEventListener("click", () => newList.remove());
  const newImage = document.createElement("img");
  newImage.setAttribute("src", "./assets/icon/trash-can.svg");

  newButton.appendChild(newImage);
  newDiv.appendChild(newSpan);
  newDiv.appendChild(newButton);
  newList.appendChild(newDiv);

  return { newList, newDiv, newSpan, newButton, newImage };
};

const addTodoItem = (target: HTMLElement) => {
  const { newList, newSpan } = createNewItem();
  if (!leftInput || !rightInput) return false;
  if (!isHTMLInputElement(leftInput) || !isHTMLInputElement(rightInput))
    return false;

  if (isRightSection(target)) {
    if (rightInput.value.trim()) {
      newSpan.innerText = rightInput.value;
      rightList?.appendChild(newList);
      rightInput.value = "";
    }
  } else {
    if (leftInput.value.trim()) {
      newSpan.innerText = leftInput.value;
      leftList?.appendChild(newList);
      leftInput.value = "";
    }
  }
};

document.querySelectorAll(".todos__remove-btn").forEach((btn) => {
  const target = btn.closest("li");
  btn.addEventListener("click", () => target?.remove());
});

addBtns.forEach((addBtn) => {
  if (!isHTMLElement(addBtn)) return false;
  addBtn.addEventListener("click", (e) => {
    addTodoItem(addBtn);
  });
});

inputs.forEach((input) => {
  if (!isHTMLInputElement(input)) return false;
  input.addEventListener("keyup", (e) => {
    if (!input.value) return false;
    if (e.key === "Enter") {
      addTodoItem(input);
    }
  });
});

navs?.addEventListener("click", (e) => {
  if (!e.target) return false;
  if (!(e.target instanceof HTMLButtonElement)) return false;

  if (e.target.classList.contains("navBar__today")) {
    rightSection?.classList.add("extended");
    leftSection?.classList.remove("extended");
  } else if (e.target.classList.contains("navBar__tommorow")) {
    leftSection?.classList.add("extended");
    rightSection?.classList.remove("extended");
  } else if (e.target.classList.contains("navBar__both")) {
    leftSection?.classList.remove("extended");
    rightSection?.classList.remove("extended");
  }
});
