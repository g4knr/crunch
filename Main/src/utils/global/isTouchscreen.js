/**
 * Function to determine whether the user is on a touchscreen device
 * @returns true if device is touchscreen
 */

export const isTouchscreen = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};
