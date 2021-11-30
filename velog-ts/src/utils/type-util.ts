export const isHTMLElement = (target: any): target is HTMLElement => {
  return target instanceof HTMLElement;
};

export const isHTMLInputElement = (target: any): target is HTMLInputElement => {
  return target instanceof HTMLInputElement;
};
