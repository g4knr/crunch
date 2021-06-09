$(function () {
    // declare variables
    // get a list of all error labels and needed form inputs
    const errorLabels = $('.form__lbl-wrapper.is--error'),
        formInputs = $('.cb-card .form__input'),
        buttons = $('.cb-card .button.is--small'),
        cbForms = $('.form-block.is--cb'),
        backBtns = $('a:contains("Back")').filter(function (index) { return $(this).text() === "Back"; });

    // hide all error labels
    errorLabels.each(function () {
        $(this).hide();
    })

    // hide all cbForms but the first one
    $(cbForms).each(function (index) {
        if (index > 0) {
            $(this).hide();
        }
    })

    function validate(formInput, value) {
        // find out the type of input (e.g. text, email, phone number)
        var type = formInput.getAttribute('type').trim();
        let pattern;
        // declare regex expression based on the type of input
        switch (type) {
            case 'text':
                pattern = /^[a-zA-Z\s]*$/;
                break;
            case 'email':
                pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                break;
            case 'tel':
                pattern = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
                break;
        }
        // if the input matches the regex, hide the error message
        if (value.match(pattern) && value !== '') {
            $(formInput).siblings(errorLabels).hide();
            return true;
        } else {
            $(formInput).siblings(errorLabels).show();
            return false;
        }
    }

    // create event listener for each input and call validation function
    formInputs.each(function () {
        $(this).focusout(function () {
            var value = $(this).val().trim();
            $(this).val(value);
            var valid = validate(this, value);
        })
    })

    // run function when each of the multi-step form buttons are clicked
    buttons.click(function () {
        // get a reference to the current button's cb-card and generate a list of the inputs within it
        var cbForm = $(this).closest(cbForms),
            needValidating = $(cbForm).find(formInputs);
        // declare boolean for whether or not to move on
        var nextStep = true;
        // run function for each of the form inputs
        needValidating.each(function () {
            // get the value of the input and check it for validity
            var value = $(this).val();
            var valid = validate(this, value);
            // if it's not valid, change the nextStep variable to false
            if (valid !== true) {
                nextStep = false;
            }
        })
        // get the index of the button and, therefore, the cbForm
        var index = buttons.index(this);
        // if nextStep is true and this is not the final step, show the next step
        if (nextStep === true && index !== buttons.length - 1) {
            cbForm.hide();
            cbForms.eq(index + 1).show();
        } else if (nextStep === true && index === buttons.length - 1) {
            $('.is--cb-submit').click();
            var firstName = $("input[name*='First Name']");
        }
    })

    // when a back button is clicked
    backBtns.click(function () {
        // get a reference to the current button's cb-card and find it's index
        var cbForm = $(this).closest(cbForms),
            index = cbForms.index(cbForm);
        // hide the current cbForm and show the previous one
        cbForm.hide();
        cbForms.eq(index - 1).show();
    })
})

















// // when the form's submit button is clicked 
// $('.hack29-email-form').submit(function () {
//     // get reference to name field
//     const $name = $('#hack29-name-input');
//     // if the name field has a value
//     if ($.trim($name.val())) {
//         // find .hack28-custom-message and add this text 
//         $('.hack29-custom-message').text('Thank you ' + $name.val() + '!');
//         // then submit the form
//         return true;
//     }
//     else {	// else if no value
//         // enter default success message
//         $('.hack29-custom-message').text('Thank you! Your submission has been received!');
//         // then submit the form
//         return true;
//     }
// });