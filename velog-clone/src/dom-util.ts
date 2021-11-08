export const isHTMLElement = (
  someElement: Element | EventTarget | Node | ChildNode | null
): someElement is HTMLElement => {
  return someElement instanceof HTMLElement;
};

export const isHTMLInputElement = (
  someElement: Element | EventTarget | Node | ChildNode | null
): someElement is HTMLInputElement => {
  if (!someElement) return false;
  return "value" in someElement;
};

export const safeQuerySelector = (selector: string) => {
  const element = document.querySelector(selector);

  if (!element) return null;
  if (!isHTMLElement(element)) return null;

  return element;
};

export const getClassList = (
  element: Element | ChildNode | Node | EventTarget | null
): DOMTokenList | null => {
  if (!element) return null;
  if (!(element instanceof HTMLElement)) return null;

  return element.classList;
};
