import * as calculators from './calculators';

window.Webflow ||= [];
window.Webflow.push(() => {
  const { pathname } = window.location;
  const form = document.querySelector('form');

  switch (pathname) {
    case '/dividends':
      calculators.dividends(form);
      break;
    case '/capital-gains':
      calculators.capitalGains(form);
      break;
    case '/national-insurance':
      calculators.nationalInsurance(form);
      break;
    case '/mileage':
      calculators.mileage(form);
      break;
    case '/student-and-post-graduate-loans':
      calculators.studentLoans(form);
      break;
  }
});
