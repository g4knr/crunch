console.log("codesandbox");

/* CRUNCH */

/*
**********
PARDOT FORMS
WEBFLOW
**********
*/

// check if the page has a pardot form on it
const pardotForms = document.querySelectorAll(".modal__wrapper iframe");

if (pardotForms.length > 0) {
	// there is a pardot form
	// add a listener for the message
	window.addEventListener(
		"message",
		(event) => {
			if (
				event.origin.includes("https://www.crunch.uk") ||
				event.origin.includes("https://www.crunch.co.uk") ||
				event.origin.includes("https://crunch-2021.webflow.io")
			) {
				const pardotMessage = event.data;

				if (pardotMessage.name === "pardotFormSuccess") {
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({
						event: "pardotFormSuccess",
						pardotForm: pardotMessage.formName
					});
				}
			}
		},
		false
	);
}

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
		if (userAgent.indexOf("safari") > -1) {
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
EXTERNAL SCRIPTS
**********
*/

const loadJs = function (url, implementationCode, location) {
	//url is URL of external file, implementationCode is the code
	//to be called from the file, location is the location to
	//insert the <script> element

	const scriptTag = document.createElement("script");
	scriptTag.src = url;

	scriptTag.onload = implementationCode;
	scriptTag.onreadystatechange = implementationCode;

	location.appendChild(scriptTag);
};

function loadLink(href) {
	const tag = document.createElement("link");
	tag.rel = "stylesheet";
	tag.href = href;
	document.head.appendChild(tag);
}

function createCode(type, code) {
	let tag;

	if (type === "css") {
		tag = document.createElement("style");
		tag.innerHTML = code;
		document.head.appendChild(tag);
	} else if (type === "script") {
		tag = document.createElement("script");
		tag.innerHTML = code;
		document.body.appendChild(tag);
	}
}

function loadScript(codeLocation, src, script) {
	const tag = document.createElement("script");
	tag.src = src;
	if (script !== null) {
		tag.onload = function () {
			createCode("script", script);
		};
	}

	if (codeLocation === "head") {
		document.head.appendChild(tag);
	} else {
		document.body.appendChild(tag);
	}
}

function memberQuote() {
	const quotes = document.getElementsByClassName("splide is--quotes");
	if (quotes.length > 0) {
		const script = function () {
			let quotes = $(".splide");
			for (let i = 0, quotesNum = quotes.length; i < quotesNum; i++) {
				new Splide(quotes[i], {
					perPage: 3,
					perMove: 1,
					focus: "center",
					type: "loop",
					gap: "4em",
					fixedWidth: "39em",
					arrows: !1,
					pagination: "slider",
					speed: 350,
					dragAngleThreshold: 30,
					autoWidth: !1,
					rewind: !0,
					rewindSpeed: 700,
					waitForTransition: !1,
					updateOnMove: !0,
					trimSpace: !1,
					breakpoints: {
						767: { perPage: 1 },
						479: { perPage: 1, fixedWidth: "90vw" }
					}
				}).mount();
			}
		};
		loadLink(
			"https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/css/splide.min.css"
		);
		createCode(
			"css",
			`.splide__pagination__page{background:#BFC6CB!important;width:10px;height:10px}.splide__pagination__page.is-active{background:#FC125E!important;transform:scale(1)}`
		);
		loadJs(
			"https://cdn.jsdelivr.net/npm/@splidejs/splide@latest/dist/js/splide.min.js",
			script,
			document.body
		);
	}
}

document.addEventListener("DOMContentLoaded", function () {
	memberQuote();
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
FAB & LIVEAGENT
**********
*/

function fab() {
	const fabWrapper = document.getElementsByClassName("fab__wrapper")[0];
	const fab = document.getElementsByClassName("fab")[0];
	const fabItem = document.getElementsByClassName("fab__item");
	const fabClose = document.getElementsByClassName("fab__close")[0];
	const fabPhone = document.getElementById("fab-phone");
	const fabChat = document.getElementById("fab-chat");

	function fabRTap() {
		const rTapDetails = $(".rtap-details"),
			rTapType = $(rTapDetails).attr("data-rtap-type"),
			rTapId = $(rTapDetails).attr("data-rtap-id"),
			rTapFallback = $(rTapDetails).attr("data-rtap-fallback");

		if (rTapType === "Dynamic") {
			$(fabPhone).click(function () {
				rTapClickToCall(rTapId);
			});
		} else {
			$(fabPhone).click(function () {
				window.open(`tel:${rTapFallback}`);
			});
		}
	}

	fabRTap();

	$(fab).click(function () {
		$(fabWrapper).toggleClass("is--open");
	});

	$(fabClose).click(function () {
		$(fabWrapper).toggleClass("is--open");
	});

	$(fabItem).click(function () {
		$(fabWrapper).toggleClass("is--open");
	});
}

fab();

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

/*
**********
CALLBACK FORMS
**********
*/

/*
function to format callback triggers for google analytics
*/

function formatCallbackTriggers() {
	// find all modal wrappers and loop through them
	const modalWrappers = document.querySelectorAll(".modal__wrapper");
	modalWrappers.forEach((modalWrapper) => {
		// find the name of the form and what level of form it is
		// e.g. main or sub
		const modalFormSelector = modalWrapper.querySelector("form")
				? "form"
				: "iframe",
			gtmSelectSelector =
				modalFormSelector === "form" ? "data-name" : "data-gtm-select";

		const modalForm = modalWrapper.querySelector(modalFormSelector),
			gtmSelect = modalForm.getAttribute(gtmSelectSelector),
			isMain = modalWrapper.classList.contains("is--main"),
			isFooter = modalWrapper.classList.contains("is--footer"),
			callbackClass = isMain
				? ".is--callback"
				: isFooter
				? ".is--footer-callback"
				: ".is--sub-callback";

		// find all items with the 'is--callback' or 'is--sub-callback'
		// append the gtm select attribute
		document.querySelectorAll(callbackClass).forEach((item) => {
			item.setAttribute("data-gtm-select", gtmSelect);
		});
	});
}

/*
function to prepare the forms
*/

function crunchForms() {
	// declare selectors
	const modalWrapperSelector = ".modal__wrapper",
		callbackFormSelector = ".callback-form",
		formStepsSelector = `${callbackFormSelector}__step`,
		errorLabelsSelector = ".form__lbl-wrapper.is--error",
		formInputsSelector = `${callbackFormSelector} .form__input`,
		radioGroupsSelector = `${callbackFormSelector} .radio__group`,
		radioElementsSelector = `${callbackFormSelector} .form__radio-element`,
		validateButtonsSelector = `${callbackFormSelector} .button.is--validate`,
		backButtonsSelector = `${callbackFormSelector} [data-form-el="back-button"]`,
		inputWrapperClass = "form__input-wrapper",
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
		const errorLabel = formInput.parentElement.querySelector(
			errorLabelsSelector
		);

		if (valid && errorLabel) {
			errorLabel.style.display = "none";
		} else {
			errorLabel.style.removeProperty("display");
		}
	}

	// function to reset a given radio group
	function resetRadioGroup(radioGroup) {
		const radioGroupParent = radioGroup.parentElement;
		const radioGroupErrors = radioGroupParent.querySelectorAll(
			errorLabelsSelector
		);

		// hide the error labels
		radioGroupErrors.forEach((errorLabel) => {
			errorLabel.style.display = "none";
		});

		// hide the linked text input if there is one
		const radioInputs = radioGroup.querySelectorAll(inputWrapperSelector);
		if (radioInputs.length !== 0) {
			radioInputs.forEach((radioInput) => {
				radioInput.style.display = "none";
				radioInput.querySelector("input").required = false;
			});
		}
	}

	// function to show the loading animation
	function loadingAnim(button, show) {
		// declare the values
		const text = show ? "0" : "1",
			loading = show ? "1" : "0",
			buttonOpacity = show ? "0.8" : "1",
			events = show ? "none" : "auto";

		// apply the values
		button.querySelector(".button__text").style.opacity = text;
		button.querySelector(".button__loading").style.opacity = loading;
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
			step.style.display = "none";
		}
	});

	// hide all error labels
	errorLabels.forEach((errorLabel) => {
		errorLabel.style.display = "none";
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
				nextEl.querySelector("input").required = true;
				nextEl.style.removeProperty("display");
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
			const radioError = radioGroup.parentElement.querySelector(
				errorLabelsSelector
			);
			radioError.style.display = "none";
		} else {
			radioError.style.removeProperty("display");
		}

		return checked;
	}

	/*
	run the form validation
	*/

	// validate when the user leaves inputs
	formInputs.forEach((formInput) => {
		formInput.addEventListener("focusout", (event) => {
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

			const currentForm = button.closest("form"),
				currentFormButtons = Array.from(
					currentForm.querySelectorAll(validateButtonsSelector)
				),
				index = currentFormButtons.indexOf(button);

			// either show the next form step or send the form
			if (validationPassed && index !== currentFormButtons.length - 1) {
				// inputs have passed validation and this is not the final form step
				formStep.style.display = "none";
				formStep.nextElementSibling.style.removeProperty("display");
				loadingAnim(button, false);
			} else if (validationPassed && index === currentFormButtons.length - 1) {
				// inputs have passed validation and this is the final form step
				// format the checkboxes for pardot if there are any
				const formCheckboxes = currentForm.querySelectorAll(
					".form__checkbox-wrapper"
				);
				if (formCheckboxes.length !== 0) {
					formCheckboxes.forEach((formCheckbox) => {
						// get the id and status of the checkbox
						const checkboxId = formCheckbox.id,
							checkboxInput = formCheckbox.nextElementSibling.querySelector(
								"input"
							),
							checkboxStatus = formCheckbox.querySelector(
								'input[type="checkbox"]:checked'
							);

						// assign the values to the text input
						if (checkboxId !== "") {
							checkboxInput.id = checkboxId;
							checkboxInput.value = checkboxStatus;
						}

						// remove the id from the checkbox to ensure it isn't submitted
						formCheckbox.querySelector("input").id = "";
					});
				}

				// format the radio groups for pardot if there are any
				const formRadioGroups = currentForm.querySelectorAll(
					radioGroupsSelector
				);
				if (formRadioGroups.length !== 0) {
					formRadioGroups.forEach((formRadioGroup) => {
						// get the id of the selected radio
						const selectedRadio = formRadioGroup.querySelector(":checked"),
							radioGroupInput = formRadioGroup
								.closest(inputWrapperSelector)
								.querySelector(".form__radio-submit input");

						console.log(selectedRadio);

						// assign the values to the text input
						radioGroupInput.id = selectedRadio.getAttribute("data-name");
						radioGroupInput.name = selectedRadio.getAttribute("data-name");
						radioGroupInput.value = selectedRadio.value;

						console.log(radioGroupInput);
						console.log(radioGroupInput.id);
						console.log(radioGroupInput.value);

						// reset the selected radio
						selectedRadio.removeAttribute("name");
						selectedRadio.removeAttribute("id");
						selectedRadio.removeAttribute("value");
					});
				}

				// find the name field and determine the next step
				const userName = currentForm.querySelector('input[name="name"]');
				if (userName.value !== "") {
					currentForm.method = "get";
					currentForm.submit();
					return;
				}

				// get and decode the p-end attribute
				const pEnd = atob(
					currentForm.closest("[data-p-end]").getAttribute("data-p-end")
				);

				console.log(pEnd);

				currentForm.method = "post";
				currentForm.action =
					currentForm.action === window.location.href
						? pEnd
						: currentForm.action;
				// currentForm.submit();
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
				currentForm.style.display = "none";
				currentForm.previousElementSibling.style.removeProperty("display");
			};
		});
	}
}

if (document.readyState !== "loading") {
	formatCallbackTriggers();
	crunchForms();
} else {
	document.addEventListener("DOMContentLoaded", function () {
		formatCallbackTriggers();
		crunchForms();
	});
}
