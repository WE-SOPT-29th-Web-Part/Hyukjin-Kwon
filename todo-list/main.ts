"use strict";

const rightSection = document.querySelector(".todos__right");
const leftSection = document.querySelector(".todos__left");

const rightList = document.querySelector<HTMLUListElement>(
  ".todos__right > .todos__items"
);
const rightInput = document.querySelector<HTMLInputElement>(
  ".todos__right > .todos__add-item > input"
);

const leftList = document.querySelector<HTMLUListElement>(
  ".todos__left > .todos__items"
);
const leftInput = document.querySelector<HTMLInputElement>(
  ".todos__left > .todos__add-item > input"
);

const addBtns = document.querySelectorAll<HTMLButtonElement>(".todos__add-btn");
const inputs = document.querySelectorAll<HTMLInputElement>(
  ".todos__add-item > input"
);

const navs = document.querySelector(".navBar");

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
  if (isRightSection(target)) {
    if (rightInput && rightInput.value.trim()) {
      newSpan.innerText = rightInput.value;
      rightList?.appendChild(newList);
      rightInput.value = "";
    }
  } else {
    if (leftInput && leftInput.value.trim()) {
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
  addBtn.addEventListener("click", (e) => {
    addTodoItem(addBtn);
  });
});

inputs.forEach((input) => {
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
