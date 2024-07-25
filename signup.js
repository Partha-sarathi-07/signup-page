let validator = new Validation();
let dom_references = {};

let isValid = {
    fullname: false, 
    email: false, 
    dateofbirth: true,
    contact: false, 
    password: false, 
    confirm_password: false,
    pin: false,
    confirm_pin: false
}

let isClicked = {
    show_password: false,
    show_pin: false
}


document.addEventListener("DOMContentLoaded", () => {

    initializeDomReferences();
    setMaxDobToday();
    bindAllEventListeners();
    
});


function initializeDomReferences() {
    dom_references.signup_form = document.querySelector("#signup-container > #signup-form");
    dom_references.personal_details = dom_references.signup_form.querySelector("#personal-details");
    dom_references.fullname_input = dom_references.personal_details.querySelector("#fullname > #input-and-msg > input");
    dom_references.fullname_status_icon = dom_references.personal_details.querySelector("#fullname > #input-and-msg > span");
    dom_references.fullname_msg = dom_references.personal_details.querySelector("#fullname > #input-and-msg > p");
    dom_references.email_input = dom_references.personal_details.querySelector("#email > #input-and-msg > input");
    dom_references.email_status_icon = dom_references.personal_details.querySelector("#email > #input-and-msg > span");
    dom_references.email_msg = dom_references.personal_details.querySelector("#email > #input-and-msg > p");
    dom_references.dob_input = dom_references.personal_details.querySelector("#date-of-birth > #input-and-msg > input");
    dom_references.dob_status_icon = dom_references.personal_details.querySelector("#date-of-birth > #input-and-msg > span");
    dom_references.dob_msg = dom_references.personal_details.querySelector("#date-of-birth > #input-and-msg > p");
    dom_references.contact_input = dom_references.personal_details.querySelector("#contact-number > #input-and-msg > input");
    dom_references.contact_status_icon = dom_references.personal_details.querySelector("#contact-number > #input-and-msg > span");
    dom_references.contact_msg = dom_references.personal_details.querySelector("#contact-number > #input-and-msg > p");
    dom_references.password_details = dom_references.signup_form.querySelector("#password-details");
    dom_references.password_input = dom_references.password_details.querySelector("#password > #create-password > #input-and-msg > input");
    dom_references.show_password = dom_references.password_details.querySelector("#password > #create-password > #input-and-msg > #show-password");
    dom_references.password_status_icon = dom_references.password_details.querySelector("#password > #create-password > #input-and-msg > span");
    dom_references.password_tooltip = dom_references.password_details.querySelector("#password > #create-password > #input-and-msg > #tooltip");
    dom_references.password_requirements = dom_references.password_tooltip.querySelector("#password-requirements");
    dom_references.confirm_password_input = dom_references.password_details.querySelector("#password > #confirm-password > #input-and-msg > input");
    dom_references.confirm_password_status_icon = dom_references.password_details.querySelector("#password > #confirm-password > #input-and-msg > span");
    dom_references.password_mismatch_msg = dom_references.password_details.querySelector("#password > #confirm-password > #input-and-msg > p");
    dom_references.pin_inputs = dom_references.password_details.querySelectorAll("#pin > #create-pin > #input-and-msg > #pin-inputs-container input");
    dom_references.show_pin = dom_references.password_details.querySelector("#pin > #create-pin > #input-and-msg > #show-pin");
    dom_references.confirm_pin_inputs = dom_references.password_details.querySelectorAll("#pin > #confirm-pin > #input-and-msg > #pin-inputs-container input");
    dom_references.confirm_pin_status_icon = dom_references.password_details.querySelector("#pin > #confirm-pin > #input-and-msg > span");
    dom_references.pin_mismatch_msg = dom_references.password_details.querySelector("#pin > #confirm-pin > #input-and-msg > p");
    dom_references.signup_btn = dom_references.signup_form.querySelector("#signup-btn");
}


function setMaxDobToday() {
    let today = new Date().toISOString().split('T')[0];
    dom_references.dob_input.setAttribute('max', today);
}

function bindAllEventListeners() {


    // Fullname warning and error
    dom_references.fullname_input.addEventListener("focus", function() {
        hideError(dom_references.fullname_input, dom_references.fullname_msg); 
        hideValidStatus(dom_references.fullname_status_icon);

        let entered_name = dom_references.fullname_input.value;
        if (!validator.validateFullname(entered_name) && (entered_name.length > 0)) {
            showWarning(dom_references.fullname_status_icon, dom_references.fullname_msg);
        }
    });


    dom_references.fullname_input.addEventListener("input", function() {

        let entered_name = dom_references.fullname_input.value;
        
            if (entered_name.length > 0 && !validator.validateFullname(entered_name)) { 
                showWarning(dom_references.fullname_status_icon, dom_references.fullname_msg);
                isValid.fullname = false;
            }
            else {
                hideWarning(dom_references.fullname_status_icon, dom_references.fullname_msg);
                if (entered_name.length > 2) {
                    isValid.fullname = true;
                }
                else {
                    isValid.fullname = false;
                }
            }
            validateAndToggleSignupButton();
    });


    dom_references.fullname_input.addEventListener("blur", function() {

        let entered_name = dom_references.fullname_input.value;
        if (entered_name.length > 0) {

            if (!isValid.fullname || entered_name.length < 3) {

                hideWarning(dom_references.fullname_status_icon, dom_references.fullname_msg);
                showError(dom_references.fullname_input, dom_references.fullname_msg);
            }
            else  {
                showValidStatus(dom_references.fullname_status_icon); 
            }
        }
    })

    
    //Email warning and error
    dom_references.email_input.addEventListener("focus", function() {

        hideValidStatus(dom_references.email_status_icon);
        hideError(dom_references.email_input, dom_references.email_msg);

        if (!validator.validateEmailSymbols(dom_references.email_input.value)) {
            showWarning(dom_references.email_status_icon, dom_references.email_msg);
        } 
    })


    dom_references.email_input.addEventListener("input", function() {

        let entered_email = dom_references.email_input.value;
        if (!validator.validateEmail(entered_email)) {
            isValid.email = false;
            if (!validator.validateEmailSymbols(entered_email)) {
                showWarning(dom_references.email_status_icon, dom_references.email_msg);
            }
            else {
                hideWarning(dom_references.email_status_icon, dom_references.email_msg);
            } 
        }
        else {
            isValid.email = true;
            hideWarning(dom_references.email_status_icon, dom_references.email_msg);
        }
        validateAndToggleSignupButton();
    });


    dom_references.email_input.addEventListener("blur", function() {
        
        let entered_email = dom_references.email_input.value;
        if(entered_email.length > 0) {

            if (!isValid.email) {

                hideWarning(dom_references.email_status_icon, dom_references.email_msg);
                showError(dom_references.email_input, dom_references.email_msg);
            }
            else {
                showValidStatus(dom_references.email_status_icon);
            }
        }
    })


    //Date of birth
    dom_references.dob_input.addEventListener("focus", function() {
        hideError(dom_references.dob_input, dom_references.dob_msg);
        showDOBValidStatus();
    })

    dom_references.dob_input.addEventListener("input", function() {

        if (dom_references.dob_input.value === "") {
            isValid.dateofbirth = false;
        }
        else {
            isValid.dateofbirth = true;
        }

        showDOBValidStatus();
        validateAndToggleSignupButton();
    })

    dom_references.dob_input.addEventListener("blur", function() {
        hideDOBWarning();

        if (!isValid.dateofbirth) {
            showError(dom_references.dob_input, dom_references.dob_msg);
        } 
        else {
            hideError(dom_references.dob_input, dom_references.dob_msg);
        }
    });


    //Contact Field
    dom_references.contact_input.addEventListener("focus", function() {
        hideError(dom_references.contact_input, dom_references.contact_msg);
    })

    dom_references.contact_input.addEventListener("keydown",(event) => {
        if (!validator.validateIsNumber(event)) {
            hideNonNumbers(event);
        }
        setTimeout(() => {
            if (dom_references.contact_input.value.length === 10) {
                showValidStatus(dom_references.contact_status_icon);
                isValid.contact = true;
            }
            else {
                hideValidStatus(dom_references.contact_status_icon);
                isValid.contact = false;
            }
            validateAndToggleSignupButton();
        },10)
    });


    dom_references.contact_input.addEventListener("blur", function() {

        let entered_contact = dom_references.contact_input.value;
        if (!isValid.contact && entered_contact.length > 0) {
            showError(dom_references.contact_input, dom_references.contact_msg);
        }
    })


    // password validation
    dom_references.password_input.addEventListener("focus", function() {

        if (!validator.validatePassword(dom_references.password_input.value)) {
            console.log("true");
            showTooltip();
        }
        else {
            hideTooltip();
        }
    })


    dom_references.password_input.addEventListener("input", function() {

        let entered_password = dom_references.password_input.value;
        let entered_confirm_password = dom_references.confirm_password_input.value;
        
        if (!validator.validatePassword(entered_password)) {
            isValid.password = false;
            hidePasswordValidStatus();
            showTooltip();
            handleValidPasswordRequirements();
        }
        else {
            isValid.password = true;
            hideTooltip();
            showPasswordValidStatus();
        }

        if (entered_confirm_password.length > 0) {
            if (!validator.validatePasswordMatch(entered_password, entered_confirm_password)) {
                isValid.confirm_password = false;
                hideValidStatus(dom_references.confirm_password_status_icon);
                showError(dom_references.confirm_password_input, dom_references.password_mismatch_msg);
            }
            else {
                isValid.confirm_password = true;
                hideError(dom_references.confirm_password_input, dom_references.password_mismatch_msg);
                showValidStatus(dom_references.confirm_password_status_icon);
            }
        }
        
        validateAndToggleSignupButton();
    })


    dom_references.password_input.addEventListener("blur", function() {

        if (!isClicked.show_password) {
            let entered_password = dom_references.password_input.value;
            if (entered_password.length > 0 && !isValid.password) {
                showTooltip();
                handleInvalidPasswordRequirements();
            }
            else {
                hideTooltip();
            }
        }
        else {
            dom_references.password_input.focus();
            isClicked.show_password = false;
        }
    })


    dom_references.show_password.addEventListener("mousedown",() => {
        isClicked.show_password = true;
        togglePasswordVisibility(dom_references.password_input, dom_references.show_password);
    });


    //Confirm password
    dom_references.confirm_password_input.addEventListener("focus", () => {
        let entered_password = dom_references.password_input.value;
        let entered_confirm_password = dom_references.confirm_password_input.value;
        hideError(dom_references.confirm_password_input, dom_references.password_mismatch_msg);
        if (!validator.validatePasswordMatchOnInput(entered_password, entered_confirm_password)) {
            showWarning(dom_references.confirm_password_status_icon, dom_references.password_mismatch_msg);
        }
        else {
            hideWarning(dom_references.confirm_password_status_icon, dom_references.password_mismatch_msg);
            if (entered_password.length === entered_confirm_password.length && entered_confirm_password.length > 0)
                showValidStatus(dom_references.confirm_password_status_icon);
        }
    })


    dom_references.confirm_password_input.addEventListener("input", () => {

        let entered_password = dom_references.password_input.value;
        let entered_confirm_password = dom_references.confirm_password_input.value;
        if (!validator.validatePasswordMatchOnInput(entered_password, entered_confirm_password)) {
            isValid.confirm_password = false;
            showWarning(dom_references.confirm_password_status_icon, dom_references.password_mismatch_msg);
        }
        else {
            hideWarning(dom_references.confirm_password_status_icon, dom_references.password_mismatch_msg);
            if (entered_password.length === entered_confirm_password.length && entered_confirm_password.length > 0) {
                showValidStatus(dom_references.confirm_password_status_icon);
                isValid.confirm_password = true;
            }
            else {
                isValid.confirm_password = false;
                hideValidStatus(dom_references.confirm_password_status_icon);
            }
        }
        validateAndToggleSignupButton();
    })


    dom_references.confirm_password_input.addEventListener("blur", function() {

        
        let confirm_password = dom_references.confirm_password_input.value;
        if (!isValid.confirm_password &&  confirm_password.length > 0) {

            hideWarning(dom_references.confirm_password_status_icon, dom_references.password_mismatch_msg);
            showError(dom_references.confirm_password_input, dom_references.password_mismatch_msg);
        } 
    })


    //Manage pin input for create pin
    dom_references.pin_inputs.forEach((input, index) => {

        input.addEventListener("keydown", (event) => {

            let show_pin_and_focus = true;
            let pin_inputs = dom_references.pin_inputs;
            if (validator.validateIsNumber(event)) {
                if (!isClicked.show_pin) {
                    showInputTemporarily(input);
                    focusNextPin(pin_inputs, input, index, show_pin_and_focus);
                }
                else {
                    focusNextPin(pin_inputs, input, index, !show_pin_and_focus);
                }
                enableSignupButtonOnValidPin(); 
            }
            else if (event.key == "Backspace") {
                focusPreviousPin(pin_inputs, event, input, index);
                enableSignupButtonOnValidPin();
            }
            else {
                hideNonNumbers(event);
            }
            onInputValidateConfirmPin();
        });
    });


    dom_references.show_pin.addEventListener("mousedown", () => {
        togglePinVisibility();
    })


    //Managin pin input for confirm pin  
    dom_references.confirm_pin_inputs.forEach((input, index) => {
        
        input.addEventListener("focus", () => {
            hidePinMismatchError();
            let entered_pin = getEnteredPin(dom_references.pin_inputs);
            let entered_confirm_pin = getEnteredPin(dom_references.confirm_pin_inputs);
            if (!validator.validatePasswordMatchOnInput(entered_pin, entered_confirm_pin)) {
                showWarning(dom_references.confirm_pin_status_icon, dom_references.pin_mismatch_msg);
            } 
            else if (entered_confirm_pin.length === 6) {
                showValidStatus(dom_references.confirm_pin_status_icon);
            }
        })


        input.addEventListener("keydown", (event) => {

            let show_pin_and_focus = true;
            if (validator.validateIsNumber(event)) {
                showInputTemporarily(input);
                focusNextPin(dom_references.confirm_pin_inputs, input, index, show_pin_and_focus);
            }
            else if (event.key === "Backspace") {
                focusPreviousPin(dom_references.confirm_pin_inputs, event, input, index);
            }
            else {
                hideNonNumbers(event);
            }
            validatePinMatchAndShowStatus();
        });


        input.addEventListener("blur", () => {

            let entered_confirm_pin = getEnteredPin(dom_references.confirm_pin_inputs);

            if (entered_confirm_pin.length > 0 && !isValid.confirm_pin) {
                hideWarning(dom_references.confirm_pin_status_icon, dom_references.pin_mismatch_msg);
                showPinMismatchError();
            }
        })
        
    })


    //show successfull registration on submit
    dom_references.signup_form.addEventListener("submit", function(event) {
        event.preventDefault();
        showSuccessfullSignup();
    })
}


// Utility Functions
function showValidStatus(input_status_icon) {
    input_status_icon.innerHTML = "check_circle";
    input_status_icon.classList.add("show");
    input_status_icon.classList.remove("hide");
    input_status_icon.classList.add("correct");
}


function hideValidStatus(input_status_icon) {
    input_status_icon.classList.remove("show");
    input_status_icon.classList.add("hide");
    input_status_icon.classList.remove("correct");
}


function showWarning(input_status_icon, validation_msg) {
    input_status_icon.innerHTML = "warning";
    input_status_icon.classList.add("show");
    input_status_icon.classList.remove("hide");
    input_status_icon.classList.add("warning");
    validation_msg.classList.add("show");
    validation_msg.classList.add("warning");
    validation_msg.classList.remove("hide");
}


function hideWarning(input_status_icon, validation_msg) {
    input_status_icon.classList.remove("show");
    input_status_icon.classList.add("hide");
    input_status_icon.classList.remove("warning");
    validation_msg.classList.remove("show");
    validation_msg.classList.remove("warning");
    validation_msg.classList.add("hide");
}


function showError(input_field, validation_msg) {
    input_field.classList.add("error-border");
    validation_msg.classList.add("show");
    validation_msg.classList.add("error");
    validation_msg.classList.remove("hide"); 
}


function hideError(input_field, validation_msg) {
    input_field.classList.remove("error-border");
    validation_msg.classList.remove("show");
    validation_msg.classList.remove("error");
    validation_msg.classList.add("hide"); 
}


//function to validate and toggle signup button
function validateAndToggleSignupButton() {
    if (isValid.fullname && isValid.email && isValid.dateofbirth && isValid.contact && isValid.password && isValid.confirm_password && isValid.pin && isValid.confirm_pin) {
        dom_references.signup_btn.disabled = false;
    }
    else {
        dom_references.signup_btn.disabled = true;
    }
}


function showDOBValidStatus() {

    let entered_dob = dom_references.dob_input.value.split("-");
    let dob_year = entered_dob[0];
    let dob_month = entered_dob[1];
    let dob_date = entered_dob[2];
    let current_year = new Date().getFullYear();
    let current_month = new Date().getMonth() + 1;
    let current_date = new Date().getDate();

    if ((dob_year > current_year) ||
        (dob_year == current_year && dob_month > current_month) ||
        (dob_year == current_year && dob_month == current_month && dob_date > current_date)) {
        showDOBWarning();
        isValid.dateofbirth = false;
    }
    else {
        hideDOBWarning();
        isValid.dateofbirth = true;
    }
}

function showDOBWarning() {
    dom_references.personal_details.querySelector("#date-of-birth > #input-and-msg").classList.add("dob-warning");
    showWarning(dom_references.dob_status_icon, dom_references.dob_msg)
}

function hideDOBWarning() {
    dom_references.personal_details.querySelector("#date-of-birth > #input-and-msg").classList.remove("dob-warning");
    hideWarning(dom_references.dob_status_icon, dom_references.dob_msg);
}

//To show the tooltip
function showTooltip(){
    dom_references.password_tooltip.classList.remove("hide");
    dom_references.password_tooltip.classList.add("show");
}


//To hide the tooltip
function hideTooltip() {
    dom_references.password_tooltip.classList.add("hide");
    dom_references.password_tooltip.classList.remove("show");
}


function showPasswordValidStatus() {
    dom_references.show_password.classList.add("move-show-password");
    showValidStatus(dom_references.password_status_icon);
}


function hidePasswordValidStatus() {
    dom_references.show_password.classList.remove("move-show-password");
    hideValidStatus(dom_references.password_status_icon);
}


//Dynamic validation in password tooltip

function handleValidPasswordRequirements() {

    let entered_password = dom_references.password_input.value;
    let password_requirements = dom_references.password_requirements;
    handleValidTooltipMessage(validator.validatePasswordLength(entered_password), password_requirements.querySelector("#one > div"), password_requirements.querySelector("#one > p"));
    handleValidTooltipMessage(validator.validateOneUppercase(entered_password), password_requirements.querySelector("#two > div"), password_requirements.querySelector("#two > p"));
    handleValidTooltipMessage(validator.validateOneLowercase(entered_password), password_requirements.querySelector("#three > div"), password_requirements.querySelector("#three > p"));
    handleValidTooltipMessage(validator.validateOneNumber(entered_password), password_requirements.querySelector("#four > div"), password_requirements.querySelector("#four > p"));
    handleValidTooltipMessage(validator.validateOneSymbol(entered_password), password_requirements.querySelector("#five > div"), password_requirements.querySelector("#five > p"));
}

function handleInvalidPasswordRequirements() {
    let entered_password = dom_references.password_input.value;
    let password_requirements = dom_references.password_requirements;
    handleInvalidTooltipMessage(validator.validatePasswordLength(entered_password), password_requirements.querySelector("#one > div"), password_requirements.querySelector("#one > p"));
    handleInvalidTooltipMessage(validator.validateOneUppercase(entered_password), password_requirements.querySelector("#two > div"), password_requirements.querySelector("#two > p"));
    handleInvalidTooltipMessage(validator.validateOneLowercase(entered_password), password_requirements.querySelector("#three > div"), password_requirements.querySelector("#three > p"));
    handleInvalidTooltipMessage(validator.validateOneNumber(entered_password), password_requirements.querySelector("#four > div"), password_requirements.querySelector("#four > p"));
    handleInvalidTooltipMessage(validator.validateOneSymbol(entered_password), password_requirements.querySelector("#five > div"), password_requirements.querySelector("#five > p"));
}

function handleValidTooltipMessage(condition, bullet_point, tooltip_msg) {
    if (condition) {
        showValidTooltipMsg(bullet_point, tooltip_msg);
    }
    else {
        showDefaultTooltipMsg(bullet_point, tooltip_msg);
    }
}


function handleInvalidTooltipMessage(condition, bullet_point, tooltip_msg) {
    if (condition) {
        showValidTooltipMsg(bullet_point, tooltip_msg);
    }
    else {
        showInvalidTooltipMsg(bullet_point, tooltip_msg);
    }
}


function showDefaultTooltipMsg(bullet_point, error_msg) {
    bullet_point.classList.remove("correct-bullet-point");
    bullet_point.classList.remove("error-bullet-point");
    bullet_point.classList.add("default-bullet-point");
    error_msg.classList.remove("error-msg");
    error_msg.classList.remove("correct-msg");
    error_msg.classList.add("default-msg");
}

function showValidTooltipMsg(bullet_point, error_msg) {
    bullet_point.classList.remove("error-bullet-point");
    bullet_point.classList.remove("default-bullet-point");
    bullet_point.classList.add("correct-bullet-point");
    error_msg.classList.remove("error-msg");
    error_msg.classList.remove("default-msg");
    error_msg.classList.add("correct-msg");
}

function showInvalidTooltipMsg(bullet_point, error_msg) {
    showTooltip();
    bullet_point.classList.remove("default-bullet-point");
    bullet_point.classList.remove("correct-bullet-point")
    bullet_point.classList.add("error-bullet-point");
    error_msg.classList.remove("default-msg")
    error_msg.classList.remove("correct-msg");
    error_msg.classList.add("error-msg");
}


function togglePasswordVisibility(password_input, show_password) {

    if (password_input.type === "password") {
        password_input.type = "text";
        show_password.innerHTML = "visibility_off"
    }
    else {
        password_input.type = "password";
        show_password.innerHTML = "visibility"
    }
}


function showPasswordMatchError() {
    dom_references.password_mismatch_msg.classList.remove("hide");
    dom_references.password_mismatch_msg.classList.add("show");
    dom_references.confirm_password_input.classList.add("error-border");
}


function hidePasswordMatchError() {
    dom_references.password_mismatch_msg.classList.add("hide");
    dom_references.password_mismatch_msg.classList.remove("show");
    dom_references.confirm_password_input.classList.remove("error-border");
}


function showInputTemporarily(input) {
    input.type = "text";
    setTimeout(() => {
        input.type = "password";
    }, 400)
}


function focusNextPin(pin_inputs, input, index, showAndMove){
    if (!showAndMove) {
        setTimeout(() =>{
            if (input.value.length === 1 && index < pin_inputs.length - 1) {
                pin_inputs[index + 1].focus();
            }
        },10);
    }
    else {
        setTimeout(() => {
            if (input.value.length === 1 && index < pin_inputs.length - 1) {
                pin_inputs[index + 1].focus();
            }
        },400);
    }
    
}


function focusPreviousPin(pin_inputs, event, input, index) {
    if (input.value.length === 0 && index > 0) {
        pin_inputs[index - 1].focus();
        event.preventDefault();
    }
}


function hideNonNumbers(event) {
    let controlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];

    if (!controlKeys.includes(event.key)) {
        event.preventDefault();
    }
}


function enableSignupButtonOnValidPin() {
    setTimeout(() => {
        let entered_pin = getEnteredPin(dom_references.pin_inputs);
        if (entered_pin.length === 6) {
            isValid.pin = true;
        }
        else {
            isValid.pin = false;
        }
        validateAndToggleSignupButton();
    },10);
}


function onInputValidateConfirmPin() {
    setTimeout(() => {
        let entered_pin = getEnteredPin(dom_references.pin_inputs);
        let entered_confirm_pin = getEnteredPin(dom_references.confirm_pin_inputs);
        if (entered_confirm_pin.length > 0) {
            if (!validator.validatePasswordMatch(entered_pin, entered_confirm_pin)) {
                hideValidStatus(dom_references.confirm_pin_status_icon);
                showPinMismatchError();
                isValid.confirm_pin = false;
            }
            else {
                hidePinMismatchError();
                if (entered_confirm_pin.length === 6) {
                    isValid.confirm_pin = true;
                    showValidStatus(dom_references.confirm_pin_status_icon);
                }
                else {
                    hideValidStatus(dom_references.confirm_pin_status_icon);
                }
            }
        }
        validateAndToggleSignupButton();
    },10)     
}


function togglePinVisibility() {
    dom_references.pin_inputs.forEach((input) => {
        if (input.type === "password") {
            input.type = "text";
            dom_references.show_pin.innerHTML = "visibility_off";
            isClicked.show_pin = true;
        }
        else {
            input.type = "password";
            dom_references.show_pin.innerHTML = "visibility";
            isClicked.show_pin = false;
        }
    })
}


function validatePinMatchAndShowStatus() {
    setTimeout(() => {
        let entered_pin = getEnteredPin(dom_references.pin_inputs);
        let entered_confirm_pin = getEnteredPin(dom_references.confirm_pin_inputs);

        if (!validator.validatePasswordMatchOnInput(entered_pin, entered_confirm_pin)) {
            isValid.confirm_pin = false;
            showWarning(dom_references.confirm_pin_status_icon, dom_references.pin_mismatch_msg);
        }
        else {
            hideWarning(dom_references.confirm_pin_status_icon, dom_references.pin_mismatch_msg);
            if (entered_confirm_pin.length === 6) {
                isValid.confirm_pin = true;
                showValidStatus(dom_references.confirm_pin_status_icon);
            }
            else {
                isValid.confirm_pin = false;
                hideValidStatus(dom_references.confirm_pin_status_icon);
            }
        }
        validateAndToggleSignupButton();
    },10);
}


//method to retrieve the user entered pin
function getEnteredPin(pin_inputs) {
    let pin = '';
    pin_inputs.forEach((input) => {
        pin += input.value;
    });
    return pin;
}


function showPinMismatchError() {
    dom_references.confirm_pin_inputs.forEach((input) => {
        input.classList.add("error-border");
        dom_references.pin_mismatch_msg.classList.add("show");
        dom_references.pin_mismatch_msg.classList.add("error");
        dom_references.pin_mismatch_msg.classList.remove("hide");
    })
}


function hidePinMismatchError() {
    dom_references.confirm_pin_inputs.forEach((input) => {
        input.classList.remove("error-border");
        dom_references.pin_mismatch_msg.classList.remove("show");
        dom_references.pin_mismatch_msg.classList.remove("error");
        dom_references.pin_mismatch_msg.classList.add("hide");
    })
}


function showSuccessfullSignup() {
        window.alert("Login to continue");
        location.replace("./login.html");
}
