import { log, isStaging } from '../global/index';

export const pushToDataLayer = (event) => {
  Object.keys(event).forEach((key) => {
    if (event[key] === undefined || event[key] === null) {
      delete event[key];
    }
  });

  log(event);

  if (!isStaging()) window.dataLayer.push(event);
};
