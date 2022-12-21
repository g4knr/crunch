export const newsletter = () => {
  const newsletterForms = [...document.querySelectorAll('.email__form')];
  newsletterForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const name = form.querySelector('input[name="name"]');

      if (name.value === '') {
        form.setAttribute('action', 'https://www.crunch.uk/l/264772/2021-07-22/rhnlf');
      }

      form.submit();
    });
  });
};
