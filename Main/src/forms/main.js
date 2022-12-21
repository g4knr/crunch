import { formStepLoad, formSubmit } from '../utils/datalayer';

/**
 * Temporary function to control all form behaviour
 * New forms coming soon
 */

export const main = () => {
  // declare selectors
  const modalWrapperSelector = '.modal__wrapper',
    callbackFormSelector = '.callback-form',
    formStepsSelector = `${callbackFormSelector}__step`,
    errorLabelsSelector = '.form__lbl-wrapper.is--error',
    formInputsSelector = `${callbackFormSelector} .form__input`,
    radioGroupsSelector = `${callbackFormSelector} .radio__group`,
    radioElementsSelector = `${callbackFormSelector} .form__radio-element`,
    validateButtonsSelector = `${callbackFormSelector} .button.is--validate`,
    backButtonsSelector = `${callbackFormSelector} [data-form-el="back-button"]`,
    inputWrapperClass = 'form__input-wrapper',
    inputWrapperSelector = `.${inputWrapperClass}`;

  // reference elements
  const callbackForms = document.querySelectorAll(callbackFormSelector),
    formSteps = document.querySelectorAll(formStepsSelector),
    errorLabels = document.querySelectorAll(errorLabelsSelector),
    formInputs = document.querySelectorAll(formInputsSelector),
    radioGroups = document.querySelectorAll(radioGroupsSelector),
    radioElements = document.querySelectorAll(radioElementsSelector),
    validateButtons = document.querySelectorAll(validateButtonsSelector),
    backButtons = document.querySelectorAll(backButtonsSelector);

  /*
      define reusable functions
      */

  // function to hide or show text input errors
  function formInputErrors(formInput, valid) {
    const errorLabel = formInput.parentElement.querySelector(errorLabelsSelector);

    if (!errorLabel) return;

    if (valid) {
      errorLabel.style.display = 'none';
    } else {
      errorLabel.style.removeProperty('display');
    }
  }

  // function to reset a given radio group
  function resetRadioGroup(radioGroup) {
    const radioGroupParent = radioGroup.parentElement;
    const radioGroupErrors = radioGroupParent.querySelectorAll(errorLabelsSelector);

    // hide the error labels
    radioGroupErrors.forEach((errorLabel) => {
      errorLabel.style.display = 'none';
    });

    // hide the linked text input if there is one
    const radioInputs = radioGroup.querySelectorAll(inputWrapperSelector);
    if (radioInputs.length !== 0) {
      radioInputs.forEach((radioInput) => {
        radioInput.style.display = 'none';
        radioInput.querySelector('input').required = false;
      });
    }
  }

  // function to show the loading animation
  function loadingAnim(button, show) {
    // declare the values
    const text = show ? '0' : '1',
      loading = show ? '1' : '0',
      buttonOpacity = show ? '0.8' : '1',
      events = show ? 'none' : 'auto';

    // apply the values
    button.querySelector('.button__text').style.opacity = text;
    button.querySelector('.button__loading').style.opacity = loading;
    button.style.opacity = buttonOpacity;
    button.style.pointerEvents = events;
  }

  /*
      prep the form
      */

  // hide all but the first step of each form
  formSteps.forEach((step) => {
    const parentForm = step.parentElement;
    if (step !== parentForm.firstChild) {
      step.style.display = 'none';
    }
  });

  // hide all error labels
  errorLabels.forEach((errorLabel) => {
    errorLabel.style.display = 'none';
  });

  // ensure the inputs linked to radio buttons are hidden and not required
  radioGroups.forEach((radioGroup) => {
    resetRadioGroup(radioGroup);
  });

  /*
      when a radio element is clicked
      hide any error labels
      ensure only relevant text inputs are showing and required
      */

  radioElements.forEach((radioElement) => {
    radioElement.onclick = () => {
      // reset the radio group
      const radioGroup = radioElement.closest(radioGroupsSelector);
      resetRadioGroup(radioGroup);

      // show the text input if needed
      const nextEl = radioElement.nextElementSibling;
      if (nextEl === null) return false;
      if (nextEl.classList.contains(inputWrapperClass)) {
        nextEl.querySelector('input').required = true;
        nextEl.style.removeProperty('display');
      }
    };
  });

  /*
      form validation
      */

  // validate text inputs
  function validateTextInputs(formInput) {
    // check the validity
    const isValid = formInput.checkValidity();

    // format the input and return the validity
    formInputErrors(formInput, isValid);
    return isValid;
  }

  // validate radio inputs
  function validateRadioGroup(radioGroup) {
    const checked = radioGroup.querySelector('input[type="radio"]:checked'),
      radioError = radioGroup.parentElement.querySelector(errorLabelsSelector);

    // determine whether to hide or show the error message
    if (checked) {
      const radioError = radioGroup.parentElement.querySelector(errorLabelsSelector);
      radioError.style.display = 'none';
    } else {
      radioError.style.removeProperty('display');
    }

    return checked;
  }

  /*
      run the form validation
      */

  // validate when the user leaves inputs
  formInputs.forEach((formInput) => {
    formInput.addEventListener('focusout', (event) => {
      const value = formInput.value.trim();
      formInput.value = value;
      validateTextInputs(formInput);
    });
  });

  // validate when user clicks button
  validateButtons.forEach((button) => {
    button.onclick = () => {
      // show the loading anim
      loadingAnim(button, true);

      // get a reference to the current form step
      const formStep = button.closest(formStepsSelector),
        formInputsToValidate = formStep.querySelectorAll(formInputsSelector),
        radioGroupsToValidate = formStep.querySelectorAll(radioGroupsSelector);

      // declare boolean for whether or not to move on, default to true
      let validationPassed = true;

      // validate each of the form inputs if there are any
      if (formInputsToValidate.length !== 0) {
        formInputsToValidate.forEach((formInput) => {
          const valid = validateTextInputs(formInput);
          // update the validation passed boolean
          if (!valid) {
            validationPassed = false;
          }
        });
      }

      // validate the radio groups if there are any
      if (radioGroupsToValidate.length !== 0) {
        radioGroupsToValidate.forEach((radioGroup) => {
          const valid = validateRadioGroup(radioGroup);
          // update the validation passed boolean
          if (!valid) {
            validationPassed = false;
          }
        });
      }

      /*
              determine the next step
              e.g. progress to following form step or send form
              */

      const currentForm = button.closest('form'),
        currentFormButtons = Array.from(currentForm.querySelectorAll(validateButtonsSelector)),
        index = currentFormButtons.indexOf(button);

      // either show the next form step or send the form
      if (validationPassed && index !== currentFormButtons.length - 1) {
        // inputs have passed validation and this is not the final form step

        formStep.style.display = 'none';
        formStep.nextElementSibling.style.removeProperty('display');

        formStepLoad(currentForm, formStep.nextElementSibling);

        loadingAnim(button, false);
      } else if (validationPassed && index === currentFormButtons.length - 1) {
        console.log('has passed');
        // inputs have passed validation and this is the final form step
        // format the checkboxes for pardot if there are any
        const formCheckboxes = currentForm.querySelectorAll('.form__checkbox-wrapper');
        if (formCheckboxes.length !== 0) {
          formCheckboxes.forEach((formCheckbox) => {
            // get the id and status of the checkbox
            const checkboxId = formCheckbox.id,
              checkboxInput = formCheckbox.nextElementSibling.querySelector('input'),
              checkboxStatus = formCheckbox.querySelector('input[type="checkbox"]:checked');

            // assign the values to the text input
            if (checkboxId !== '') {
              checkboxInput.id = checkboxId;
              checkboxInput.value = checkboxStatus;
            }

            // remove the id from the checkbox to ensure it isn't submitted
            formCheckbox.querySelector('input').id = '';
          });
        }

        // format the radio groups for pardot if there are any
        const formRadioGroups = currentForm.querySelectorAll(radioGroupsSelector);
        if (formRadioGroups.length !== 0) {
          formRadioGroups.forEach((formRadioGroup) => {
            // get the id of the selected radio
            const selectedRadio = formRadioGroup.querySelector(':checked'),
              radioGroupInput = formRadioGroup
                .closest(inputWrapperSelector)
                .querySelector('.form__radio-submit input');

            // assign the values to the text input
            radioGroupInput.id = selectedRadio.dataset.name;
            radioGroupInput.name = selectedRadio.dataset.name;
            radioGroupInput.value = selectedRadio.value;

            // reset the selected radio
            selectedRadio.removeAttribute('name');
            selectedRadio.removeAttribute('id');
            selectedRadio.removeAttribute('value');
          });
        }

        // find the name field and determine the next step
        const userName = currentForm.querySelector('input[name="name"]');
        if (userName.value !== '') {
          currentForm.method = 'get';
          currentForm.submit();
          return false;
        }

        // get the endpoint
        const pEnd = currentForm.closest('[data-p-end]')
          ? atob(currentForm.closest('[data-p-end]').getAttribute('data-p-end'))
          : currentForm.action;

        currentForm.method = 'post';
        currentForm.action =
          currentForm.action === window.location.href ? pEnd : currentForm.action;

        // create a hidden input for page info
        let existingHiddenInput = currentForm.querySelector('input[name="originating_form"]');
        let hiddenInput =
          existingHiddenInput === null ? document.createElement('input') : existingHiddenInput;
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'originating_form');
        hiddenInput.setAttribute('value', window.location.pathname);
        currentForm.appendChild(hiddenInput);

        formSubmit(currentForm);
        currentForm.submit();
      } else if (!validationPassed) {
        // inputs have not passed validation
        loadingAnim(button, false);
      }
    };
  });

  // go to previous card when back button is clicked
  if (backButtons.length !== 0) {
    backButtons.forEach((backButton) => {
      backButton.onclick = () => {
        // find the current form step
        const currentForm = backButton.closest(formStepsSelector);
        // hide the current form step and show the previous one
        currentForm.style.display = 'none';
        currentForm.previousElementSibling.style.removeProperty('display');
      };
    });
  }
};
