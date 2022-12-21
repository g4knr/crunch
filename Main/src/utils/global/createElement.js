/**
 * Function to create any HTML element
 * @param {string} type - the type of HTML element
 * @param {HTMLElement} location - the location to append the new element to
 * @param {object} options - optional additions to the element
 * @returns the newly created and appended element
 */

export const createElement = (type, location, options = {}) => {
  let element = document.createElement(type);

  Object.entries(options).forEach(([key, value]) => {
    if (key === 'class') {
      element.classList.add(value);
      return;
    }

    if (key === 'dataset') {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      });
      return;
    }

    if (key === 'text') {
      element.textContent = value;
      return;
    }

    if (key === 'callback') {
      element.onload = value;
      return;
    }

    element.setAttribute(key, value);
  });

  location.appendChild(element);
  return element;
};
