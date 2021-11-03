const DATA_THEME = "data-theme";
const DARK = "dark";
const modeToggler = document.querySelector(".header__modeToggle");
let ls: Storage | null;

const toggleToDark = () => {
  modeToggler?.classList.add("moon");
  modeToggler?.classList.remove("sun");
  document.documentElement.setAttribute(DATA_THEME, DARK);
  ls?.setItem(DATA_THEME, DARK);
};

const toggleToLight = () => {
  modeToggler?.classList.remove("moon");
  modeToggler?.classList.add("sun");
  document.documentElement.removeAttribute(DATA_THEME);
  ls?.removeItem(DATA_THEME);
};

window.onload = () => {
  ls = window.localStorage;
  const currentTheme = ls?.getItem(DATA_THEME);
  if (currentTheme) toggleToDark();
};

modeToggler?.addEventListener("click", (e) => {
  const target = e.currentTarget;
  if (!(target instanceof HTMLElement)) return false;
  target.classList.contains("moon") ? toggleToLight() : toggleToDark();
});
