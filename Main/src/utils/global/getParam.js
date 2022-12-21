/**
 * Function to get the value of a given key in search query
 * @param {string} key - the key to search for in the query string
 * @returns the value if it exists, empty string if there is no value and null if non existent
 */

export const getParam = (key) => {
  const query = window.location.search;
  const urlParams = new URLSearchParams(query);
  let value = urlParams.get(key);
  if (value === '') value = true;
  return value;
};
