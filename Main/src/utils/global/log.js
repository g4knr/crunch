import { isStaging } from './isStaging';

/**
 * Logs a message if on the staging domain
 */

export const log = (message) => {
  if (isStaging()) console.log(message);
};
