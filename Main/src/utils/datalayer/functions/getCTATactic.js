/**
 * returns the tactic of cta
 * @param {element} link
 */

export const getCTATactic = (link) => {
  const classes = link.classList;

  let ctaTactic;
  classes.forEach((item) => {
    if (item.includes('footer-callback')) {
      ctaTactic = 'Signup';
    } else if (item.includes('callback')) {
      ctaTactic = 'Call Back';
    } else if (item.includes('validate')) {
      let form = link.closest('form');
      let formButtons = Array.from(form.querySelectorAll(`.${item}`));

      formButtons.forEach((button, index) => {
        if (button !== link) return;

        if (index < formButtons.length - 1) {
          ctaTactic = 'Next Step';
        } else {
          ctaTactic = 'Form Completion';
        }
      });

      return;
    }
  });

  return ctaTactic;
};
