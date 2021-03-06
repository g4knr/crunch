/* CRUNCH */

/*
**********
RTAP PREP
**********
*/

$(function () {
  const rTapDetails = $(".rtap-details"),
    rTapType = $(rTapDetails).attr("data-rtap-type"),
    rTapId = $(rTapDetails).attr("data-rtap-id"),
    rTapFallback = $(rTapDetails).attr("data-rtap-fallback"),
    toSearch = $(".hero__rte, #footer-rtap, .rtap__nav, .standard__rte"); // .is--cta-block

  // loop through elements which need to be searched
  $(toSearch).each(function () {
    // if dynamic, replace placeholder with the dynamic class and fallback num
    // if not, replace with the num set on page and wrap in <a> tag
    if (rTapType === "Dynamic") {
      $(this).html(function (_, html) {
        return html.replace(
          /(0333 311 0800)/g,
          `<span class="rTapNumber${rTapId}">${rTapFallback}</span>`
        );
      });
    } else if (rTapType === "Static") {
      $(this).html(function (_, html) {
        return html.replace(
          /(0333 311 0800)/g,
          `<a href="tel:${rTapFallback}" rel="noopener">${rTapFallback}</a>`
        );
      });
    }
  });
});
/* END */

/*
**********
TABLET MENU
**********
*/

function isTablet() {
  const userAgent = navigator.userAgent.toLowerCase();
  let isScreen = window.matchMedia("(min-width: 992px)").matches;

  if (isScreen) {
    if (userAgent.indexOf("Safari") > -1) {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      );
    } else {
      const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
        userAgent
      );
      return isTablet;
    }
  }
}

let listen = false;

const dropdowns = $(".nav__dropdown");

function updateNav() {
  let proceed = isTablet();

  if (proceed) {
    $(".nav__dropdown-link").click(function (e) {
      e.preventDefault();
    });

    for (let i = 0; i < 2; i++) {
      const dropdown = dropdowns[i];
      const toggle = $(dropdown).find(".nav__dropdown-toggle a");
      const href = $(toggle).attr("href");
      const text = $(toggle).text();

      const dropdownItem = $(dropdown)
        .find(".nav__dropdown-list a")
        .eq(0)
        .clone();
      $(dropdownItem).attr("href", href).text(text);
      $(".nav__dropdown-list").eq(i).prepend(dropdownItem);
    }

    listen = true;
  } else if (listen) {
    $(".nav__dropdown-link").unbind("click").click();

    for (let i = 0; i < 2; i++) {
      const dropdown = dropdowns[i];
      $(dropdown).find(".nav__dropdown-list a").eq(0).remove();
    }

    listen = false;
  }
}

updateNav();

window.addEventListener("resize", updateNav);
/* END */

/*
**********
HERO 3
**********
*/

// determine the hight of the wave for 'hero3'
function heroThree(isMobile) {
  const heroShape = $(".hero3__shape");
  if (isMobile.matches) {
    let newHeight = $(heroShape)
      .siblings(".hero__wrapper")
      .find(".hero__content")
      .height();
    $(heroShape).css("height", `calc(${newHeight}px + 12em - 2px)`);
  }
}

// find the viewport size and whether the page includes 'hero3'
var isMobile = window.matchMedia("(max-width: 767px)");
const hero3 = $(".hero3__shape");

// if its included, run function and listen out for change in screen size
if (hero3.length > 0) {
  heroThree(isMobile); // Call function at start
  isMobile.addListener(heroThree); // Attach listener function on state changes
}
/* END */

/*
**********
CALLBACK FORMS
**********
*/

$(function () {
  // cycle through the modal wrappers (normally just one but there are multiple on some pages)
  $(".modal__wrapper").each(function () {
    // find the ID of the form and check if it has the class 'is--main'
    let formId = $(this).find("form").attr("id"),
      modalClass = $(this).hasClass("is--main"),
      callbackClass = "";

    // if it has 'is--main' the trigger must have the class 'is--callback'
    // if not, it has class 'is--sub-callback'
    switch (modalClass) {
      case true:
        callbackClass = $(".is--callback");
        break;
      case false:
        callbackClass = $(".is--sub-callback");
        break;
      default:
        break;
    }

    // apply the gtm attribute to the triggers
    $(callbackClass).each(function () {
      $(this).attr("data-gtm-select", formId);
    });
  });
});

$(function () {
  // declare variables
  // get a list of all error labels and needed form inputs
  const cbFormClass = ".callback-form",
    cbForms = $(cbFormClass),
    errorLabels = $(".form__lbl-wrapper.is--error"),
    formInputs = $(`${cbFormClass} .form__input`),
    radioGroups = $(".radio__group"),
    radioElement = $(".form__radio-element"),
    buttons = $(`${cbFormClass} .button.is--validate`),
    cbCards = $(".cb-card"),
    backBtns = $('a:contains("Back")').filter(function (index) {
      return $(this).text() === "Back";
    });

  // hide all cbCards but the first one
  cbForms.each(function () {
    const formCards = $(this).find(cbCards);
    formCards.each(function (index) {
      if (index > 0) {
        $(this).hide();
      }
    });
  });

  // hide all error labels
  errorLabels.each(function () {
    $(this).hide();
  });

  // ensure the inputs linked to radio buttons are hidden and not required
  radioGroups.each(function () {
    var input = $(this).find(".form__input-wrapper");
    $(input).hide();
    $(input).find("input").prop("required", false);
  });

  // when a radio element is clicked, hide the error labels relating to the group, hide any text inputs and set them to not required
  $(radioElement).click(function () {
    var parentGroup = $(this).closest(radioGroups);
    $(parentGroup).siblings(errorLabels).hide();
    var radioInputWrapper = $(parentGroup).find(".form__input-wrapper"),
      radioInput = $(radioInputWrapper).find("input");
    $(radioInputWrapper).hide();
    $(radioInput).prop("required", false);

    // get the element proceeding the clicked radio button and, if it's a text input, show it and set it to required
    var nextEl = $(this).next();
    if ($(nextEl).hasClass("form__input-wrapper")) {
      $(nextEl).find(".form__input").prop("required", true);
      $(nextEl).show();
    }
  });

  // create a function to show the button loading animation
  function loadingAnim(button, action) {
    // declare the base values
    let text = "0",
      loading = "1",
      buttonOpacity = "0.8",
      events = "none";

    // if the function should hide the animation, update the values

    if (action === "hide") {
      text = "1";
      loading = "0";
      buttonOpacity = "1";
      events = "auto";
    }

    // apply the values
    $(button).find(".button__text").css("opacity", text);
    $(button).find(".button__loading").css("opacity", loading);
    $(button).css("opacity", buttonOpacity).css("pointer-events", events);
  }

  // create a function to validate the form inputs
  function validateInputs(formInput, value) {
    // find out the type of input (e.g. text, email, phone number)
    var type = formInput.getAttribute("type"),
      required = $(formInput).prop("required");
    let pattern;
    // declare regex expression based on the type of input
    switch (type) {
      case "text":
        // can include anything
        pattern = /^(?!\s*$).+/;
        break;
      case "email":
        // pulled from https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
        pattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        break;
      case "tel":
        // pulled from https://stackoverflow.com/questions/11518035/regular-expression-for-gb-based-and-only-numeric-phone-number#:~:text=Also%20note%20you%20have%20got,should%20always%20be%20a%200.&text=UK%20phone%20numbers%20usually%20have,code%20or%20%2B44%20country%20code.
        pattern = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
        break;
      case "textarea":
        // can inlcude anything
        pattern = /^(?!\s*$).+/;
        break;
      default:
        // default to anything
        pattern = /^(?!\s*$).+/;
        break;
    }

    if (value.match(pattern) && value !== "") {
      // if the input matches the regex, hide the error message and return true
      $(formInput).siblings(errorLabels).hide();
      return true;
    } else if (value === "" && required === false) {
      // if the value is empty but it's not required, hide the error message and return true
      $(formInput).siblings(errorLabels).hide();
      return true;
    } else {
      // for anything else, show the error message and return false
      $(formInput).siblings(errorLabels).show();
      return false;
    }
  }

  // create a function to validate the radio inputs
  function validateRadios(radioGroup) {
    if ($(radioGroup).find(".w--redirected-checked").length === 0) {
      // if there is no option selected, show an error and return false
      $(radioGroup).siblings(errorLabels).show();
      return false;
    } else {
      // hide any errors and return true
      $(radioGroup).siblings(errorLabels).hide();
      return true;
    }
  }

  // create a function to check the reCAPTCHA has been completed
  function verifyRecaptcha(recaptchaId) {
    var response = grecaptcha.getResponse(recaptchaId);
    let proceed = false;
    if (response !== "") {
      proceed = true;
    }

    return proceed;
  }

  // create event listener for each input and call validation function whenever the user leaves the input
  formInputs.each(function () {
    $(this).focusout(function () {
      var value = $(this).val().trim();
      $(this).val(value);
      validateInputs(this, value);
    });
  });

  // run function when each of the multi-step form buttons are clicked
  buttons.click(function () {
    // show the loading anim
    loadingAnim(this, "show");

    // get a reference to the current button's cb-card and generate a list of the inputs within it
    var cbCard = $(this).closest(cbCards),
      inputsToValidate = $(cbCard)
        .find(formInputs)
        .filter("[required]:visible"),
      radiosToValidate = $(cbCard).find(radioGroups);

    // declare boolean for whether or not to move on, default to true
    var nextStep = true;

    // run a function for each of the form inputs
    inputsToValidate.each(function () {
      // get the value of the input and check it for validity
      var value = $(this).val();
      var inputValid = validateInputs(this, value);
      // if it's not valid, set the nextStep variable to false
      if (inputValid !== true) {
        nextStep = false;
      }
    });

    // if there are any radio groups, look through each group and validate it
    if (radiosToValidate.length !== 0) {
      $(radioGroups).each(function () {
        var radioValid = validateRadios(this);

        // if it's not valid, set the nextStep variable to false
        if (radioValid !== true) {
          nextStep = false;
        }
      });
    }

    // get a reference to the reCAPTCHA element
    var recaptcha = $(".g-recaptcha");

    // if the current step includes a reCAPTCHa, verify that it has been completed and not timed out
    if ($(cbCard).find(recaptcha).length !== 0) {
      var recaptchaResponse = verifyRecaptcha();

      // if it's true, hide it's error label
      // if it's false, show the error label and set nextStep to false
      if (recaptchaResponse === true) {
        $(recaptcha).siblings(errorLabels).hide();
      } else {
        $(recaptcha).siblings(errorLabels).show();
        nextStep = false;
      }
    }

    // get the index of the button and, therefore, the cbCard
    var currentForm = $(this).closest("form"),
      formBtns = $(currentForm).find(buttons),
      index = $(formBtns).index(this);

    if (nextStep === true && index !== formBtns.length - 1) {
      // if nextStep is true and this is not the final step, show the next step
      cbCard.hide();
      cbCard.closest(".form__step").next().find(cbCards).show();
      // hide the loading anim
      loadingAnim(this, "hide");
    } else if (nextStep === true && index === formBtns.length - 1) {
      // otherwise, if nextStep is true and it is the final step

      // format the checkboxes for Pardot
      const formCheckboxes = $(currentForm).find(".form__checkbox-wrapper");

      formCheckboxes.each(function () {
        let cbId = $(this).attr("id"),
          cbInput = $(this).next(".form__hidden-input").find("input"),
          status = $(this).find("input").is(":checked");
        if (cbId !== "") {
          $(cbInput).attr("id", cbId).val(status);
        }

        $(this).attr("id", "");
        $(this).find("input").attr("id", "");
      });

      // format the radio groups for Pardot
      $(radioGroups).each(function () {
        let selectedRadio = $(this).find(":checked"),
          radioId = $(selectedRadio).attr("id"),
          hiddenInput = $(this).siblings(".form__radio-submit").find("input");
        $(hiddenInput).attr("id", radioId).attr("name", radioId);
      });

      // find the _gotcha field and determine next steps
      const userName = $(cbCard).find("input[name=name]");

      if ($(userName).val() !== "") {
        $(currentForm).attr(
          "action",
          "https://www.crunch.uk/l/264772/2021-07-22/rhnlf"
        );
      }

      // submit the form
      $(this).siblings(".is--cb-submit").click();
    } else {
      // verification failed
      loadingAnim(this, "hide");
    }
  });

  // when a back button is clicked
  backBtns.click(function () {
    // get a reference to the current button's cb-card and find it's index
    var cbCard = $(this).closest(cbCards),
      index = cbCards.index(cbCard);
    // hide the current cbCard and show the previous one
    cbCard.hide();
    cbCards.eq(index - 1).show();
  });
});
/* END */

/*
**********
NEWSLETTER FORMS
**********
*/

const newsletterForm = $(".email__form"),
  newsletterSubmit = $(".email__form .is--submit");

// when the button is clicked
$(newsletterSubmit).click(function (e) {
  e.preventDefault();

  // find the _gotcha field and determine next steps
  const userName = $(this).prev().find("input");
  if ($(userName).val() !== "") {
    $(this)
      .closest(newsletterForm)
      .attr("action", "https://www.crunch.uk/l/264772/2021-07-22/rhnlf")
      .submit();
  } else {
    $(this).closest(newsletterForm).submit();
  }
});
/* END */

/*
**********
MENU OPEN
**********
*/

// disable scroll on menu open
$(".is--callback").click(function () {
  $("body").addClass("overflow-hidden");
});

// enable scroll on close
$(".modal__close, .modal__x").click(function () {
  $("body").removeClass("overflow-hidden");
});
/* END */

/*
**********
TRUSTPILOT WIDGET
**********
*/

function trustpilotResize() {
  const reviews = $(".trustpilot__review"),
    sizer = $(".trustpilot__sizer").height();

  $(reviews).each(function () {
    if ($(this).height() > sizer) {
      $(this).addClass("line-clamp3");
      $(this).siblings(".trustpilot__more").removeClass("is--hidden");
    }
  });
}

trustpilotResize();

$(".trustpilot__more").click(function () {
  switch ($(this).text()) {
    case "More":
      $(this).text("Less");
      break;
    case "Less":
      $(this).text("More");
      break;
    default:
      break;
  }

  $(this).siblings(".trustpilot__review").toggleClass("line-clamp3");
});
/* END */

/*
**********
ACCORDIONS
**********
*/

$(function () {
  // get a reference to the accordion groups
  const accordionGroups = $(".accordions");

  // format the accordions
  $(accordionGroups).each(function () {
    if (!$(this).hasClass("is--experts")) {
      $(this).children(":first").toggleClass("is--active");
    }
  });

  // when the user clicks on the headers
  var accordions = $(".accordion__header");
  $(accordions).click(function () {
    if ($(this).closest(".accordion__item").hasClass("is--active")) {
      $(this).closest(".accordion__item").removeClass("is--active");
    } else {
      $(this).closest(".accordion__item").siblings().removeClass("is--active");
      $(this).closest(".accordion__item").addClass("is--active");
    }
  });
});
/* END */

/*
**********
CARD LINKS
**********
*/

$(function () {
  // find all instances of the embeds with the links within
  $(".card__link").each(function () {
    let cardLink = $(this).text();

    // find all sibling links which don't have a destination and apply the link
    let siblingLinks = $(this).closest(".card").find("a");
    $(siblingLinks).each(function () {
      if ($(this).attr("href") === "#" || $(this).attr("href") === "") {
        $(this).attr("href", cardLink);
      }
    });
  });
});
/* END */

/*
**********
LINK TO TABS
**********
*/

$(function () {
  // if the page url has a query string
  if (window.location.search) {
    // get all url search params from the query string
    const urlParams = new URLSearchParams(window.location.search);
    // get the value of the 'tab' search param and assign it to the 'tab' variable
    const tab = urlParams.get("tab");

    $(`#${tab}`).click();
  }
});
/* END */

/*
**********
LINKS
**********
*/

$(function () {
  // find all links going to an external URL and apply the 'rel=noopener' attribute
  $("a").each(function () {
    if (location.hostname !== this.hostname || !this.hostname.length) {
      $(this).attr("rel", "noopener");
    }
  });
});
/* END */
