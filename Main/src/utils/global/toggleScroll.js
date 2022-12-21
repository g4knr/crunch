/**
 * Function to toggle scroll behaviour
 * @returns true if scroll is enabled, false if not
 */

export const toggleScroll = () => {
  document.body.classList.toggle('overflow-hidden');
  return !document.body.classList.contains('overflow-hidden');
};
