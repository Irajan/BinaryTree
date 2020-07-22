//DOM Handler Functions

export const _A = (element) => document.querySelectorAll(element);
export const _ = (element) => document.querySelector(element);
export const _I = (elementId) => document.getElementById(elementId);

//Random Numbers generation Functions
export const random = (a, b = 0) => Math.random() * (b - a) + a;
export const randomInt = (a, b) => Math.round(random(a, b));

//map Functions

export const map = (value, minIn, maxIn, minOut = 0, maxOut = 1) =>
  ((maxOut - minOut) / (maxIn - minIn)) * (value - minIn) + minOut;
