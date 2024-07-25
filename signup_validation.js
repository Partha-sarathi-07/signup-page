class Validation {

    validateFullname(entered_name) {
        let fullname_regex = /^[A-Za-z\s]+$/;
        return fullname_regex.test(entered_name);
    }

    validateEmail(entered_email) {
        let email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return email_regex.test(entered_email);    
    }

    validateEmailSymbols(entered_email) {
        let email_symbols_regex =  /^[a-zA-Z0-9@.]*$/;
        return email_symbols_regex.test(entered_email);
    }

    validateIsNumber(event) {
        return /^\d$/.test(event.key);
    }

    validateContact(entered_contact) {
        let contact_regex = /^\d{10}$/;
        return contact_regex.test(entered_contact);
    }

    validatePassword(entered_password) {
        let password_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+-=_])[A-Za-z\d@$!%*?&+-=_]{8,}$/;
        return password_regex.test(entered_password);
    }

    validatePasswordLength(entered_password) {
        return entered_password.length >= 8;    
    }

    validateOneUppercase(entered_password) {
        let one_uppercase_regex = /[A-Z]/;
        return one_uppercase_regex.test(entered_password);
    }

    validateOneLowercase(entered_password) {
        let one_lowercase_regex = /[a-z]/;
        return one_lowercase_regex.test(entered_password);
    }

    validateOneNumber(entered_password) {
        let one_number_regex = /[0-9]/;
        return one_number_regex.test(entered_password);
    }

    validateOneSymbol(entered_password) {
        let one_symbol_regex = /[!@#$%^&*(),.?":{}|<>]/;
        return one_symbol_regex.test(entered_password);
    }

    validatePasswordMatchOnInput(entered_password, entered_confirm_password) {
        for (let index = 0; index < entered_confirm_password.length; index++) {
            if (entered_password.charAt(index) !== entered_confirm_password.charAt(index)) {
                return false;
            }
        } 
        return true;
    }

    validatePasswordMatch(entered_password, entered_confirm_password) {
        return entered_password === entered_confirm_password;
    }
}