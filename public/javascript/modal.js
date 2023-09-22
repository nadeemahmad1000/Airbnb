// adding function to display modal on elements which contains show-modal class

const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementsByClassName('show-modal');

for (const element of modal) {
    element.onclick = () => {
        displayModal();
    };
}

// functions to display or hide modal as when required

const validationForm = document.getElementById('validation-form');

const displayModal = () => {
    modalOverlay.classList.remove('hide');
    document.getElementsByTagName('header')[0].style.pointerEvents = 'none';
    document.getElementsByTagName('main')[0].style.pointerEvents = 'none';
    document.getElementsByTagName('footer')[0].style.pointerEvents = 'none';
};

const closeModal = () => {
    hideErrorText(0, email, emailBox, emailIcon);
    validationForm.reset();
    modalOverlay.classList.add('hide');
    document.getElementsByTagName('header')[0].style.pointerEvents = 'all';
    document.getElementsByTagName('main')[0].style.pointerEvents = 'all';
    document.getElementsByTagName('footer')[0].style.pointerEvents = 'all';
};

// adds event listener to each input box to highlight box on focused state

const input = document.querySelectorAll('.input-box > input');
const inputBox = document.getElementsByClassName('input-box');

for (let i = 0; i < input.length; i ++) {
    input[i].addEventListener('focusin', () => {
        inputBox[i].classList.add('active');
    });

    input[i].addEventListener('focusout', () => {
        inputBox[i].classList.remove('active');
    });
}

// functions to highlight input boxes when input is invalid

const showError = (inputBox, inputIcon) => {
    inputBox.classList.add('incorrect');
    inputIcon.style.color = '#c13515';
};

const hideError = (inputBox, inputIcon) => {
    inputBox.classList.remove('incorrect');
    inputIcon.style.color = '#222222';
};

// functions to show / hide error text as when required

const errorText = document.getElementsByClassName('error');

const showErrorText = (i, input, inputBox, inputIcon) => {
    input.focus();
    errorText[i].classList.remove('hide');
    showError(inputBox, inputIcon);
};

const hideErrorText = (i, input, inputBox, inputIcon) => {
    errorText[i].classList.add('hide');
    hideError(inputBox, inputIcon);
};

// functions to enable / disable form submit buttons as when required

const disableButton = (button) => {
    button.disabled = true;
    button.innerHTML = `<div class="loading-dot"></div>`;
    button.classList.remove('activate');
    button.classList.add('deactivate');
};

const enableButton = (button, buttonText) => {
    button.disabled = false;
    button.innerHTML = buttonText;
    button.classList.remove('deactivate');
    button.classList.add('activate');
};

const loginOrSignup = document.getElementById('login-or-signup');
const addSignupInfo = document.getElementById('add-signup-info');
const verify = document.getElementById('verify');
const loginInfo = document.getElementById('login-info');

// email input validation with frequent input checks & regex matching

const email = document.getElementById('email');
const emailBox = document.getElementById('email-box');
const emailIcon = document.getElementsByClassName('fa-envelope')[0];

const regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

email.oninput = () => {
    email.value = email.value.replace(/\s/g, '').trim().toLowerCase();

    if (email.value.length === 0 || email.value.match(regex)) {
        hideError(emailBox, emailIcon);
    } else {
        showError(emailBox, emailIcon);
    }
};

// adding function to on-click event of continue button of email validator form

const _continue = document.getElementById('continue');

_continue.onclick = async () => {
    if (email.value.length === 0 || !email.value.match(regex)) return false;

    hideErrorText(0, email, emailBox, emailIcon);
    disableButton(_continue);

    // api call to validate email & check if user is already registered & then navigate user to signup or login page accordingly

    let result = await fetch(`/api/validateEmail`, {
        method: 'POST',
        body: JSON.stringify({ 'email': email.value }),
        headers: { 'Content-Type': 'application/json' }
    });

    result = await result.json();

    if (result.valid === false) {
        // display error text if email is invalid

        showErrorText(0, email, emailBox, emailIcon);
    } else {

        loginOrSignup.style.display = 'none';

        if (result.found === false) {
            // display signup form if email not found in database

            addSignupInfo.style.display = 'flex';
            signupEmail.value = email.value;
        } else {
            // display login form if email exists in database

            loginInfo.style.display = 'flex';
            loginEmail.value = email.value;
        }
    }

    enableButton(_continue, `Continue`);
};

// signup form validation code

// name, date & password input field validator functions

const validateName = () => {
    return (_name.value.length > 3);
};

const validateDate = () => {
    return (date.value);
};

const validatePassword = () => {
    const pass = password.value;

    return (pass.length >= 8 && /\d/.test(pass) && /[a-zA-Z]/.test(pass) && /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pass));
};

// name input field validation with frequent checks

const _name = document.getElementById('name');
const nameBox = document.getElementById('name-box');
const nameIcon = document.getElementsByClassName('fa-user-tie')[0];

if (_name !== null) {
    _name.oninput = () => {
        _name.value = _name.value.replace(/[^a-zA-Z\s]/g, '');
        _name.value = _name.value.replace(/\s+/g, ' ');

        if (_name.value.length === 0 || validateName()) {
            hideError(nameBox, nameIcon);
        } else {
            showError(nameBox, nameIcon);
        }
    };
}

// setting min & max dates allowed to fill in signup form

const date = document.getElementById('date');
const dateBox = document.getElementById('date-box');
const dateIcon = document.getElementsByClassName('fa-calendar-days')[0];

if (date !== null) {
    let currentDate = new Date();

    currentDate.setFullYear(currentDate.getFullYear() - 18);

    date.max = currentDate.toISOString().split('T')[0];

    currentDate = new Date();

    currentDate.setFullYear(currentDate.getFullYear() - 75);

    date.min = currentDate.toISOString().split('T')[0];
}

// setting email value from previous email input field

const signupEmail = document.getElementById('signup-email');
const signupEmailBox = document.getElementById('signup-email-box');

// password input field validation with frequent checks ensuring password contains at least 8 characters with alphabets, digits & symbols

const password = document.getElementById('password');
const passwordBox = document.getElementById('password-box');
const passwordIcon = document.getElementsByClassName('fa-lock')[0];

password.oninput = () => {
    password.value = password.value.replace(/\s/g, '');

    if (password.value.length === 0 || validatePassword()) {
        hideError(passwordBox, passwordIcon);
    } else {
        showError(passwordBox, passwordIcon);
    }
};

// function to show / hide password as when required

const passwordEye = document.getElementsByClassName('eye')[0];

passwordEye.addEventListener('click', () => {
    if (password.type === 'password') password.type = 'text';
    else password.type = 'password';

    passwordEye.classList.toggle('fa-eye');
    passwordEye.classList.toggle('fa-eye-slash');

    password.focus();
});

// adding function to Agree and Continue button of signup form

const agreeAndContinue = document.getElementById('agree-and-continue');

agreeAndContinue.onclick = async () => {
    // validating all input fields before sending form info to server

    if (!validateName()) {
        showErrorText(1, _name, nameBox, nameIcon);
        return false;
    } else {
        hideErrorText(1, _name, nameBox, nameIcon);
    }

    if (!validateDate()) {
        showErrorText(2, date, dateBox, dateIcon);
        return false;
    } else {
        hideErrorText(2, date, dateBox, dateIcon);
    }

    if (!validatePassword()) {
        showErrorText(3, password, passwordBox, passwordIcon);
        event.preventDefault();
        return false;
    } else {
        hideErrorText(3, password, passwordBox, passwordIcon);
    }

    disableButton(agreeAndContinue);

    // api call to server to submit form data & send OTP to user email

    let result = await fetch(`/api/sendOTP`, {
        method: 'post',
        body: JSON.stringify({
            'name': _name.value,
            'dateOfBirth': date.value,
            'email': signupEmail.value,
            'password': password.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    result = await result.json();

    // displaying OTP input field after submitting signup form to verify user

    if (result.emailSent) {
        addSignupInfo.style.display = 'none';
        verify.style.display = 'flex';
        otpEmail.value = signupEmail.value;
    }

    enableButton(agreeAndContinue, `<i class="fa-solid fa-handshake"></i> Agree and continue`);
};

// OTP verification form

const otpEmail = document.getElementById('otp-email');

const otp = document.getElementById('otp');
const otpBox = document.getElementById('otp-box');
const otpIcon = document.getElementsByClassName('fa-key')[0];

otp.oninput = () => {
    otp.value = otp.value.replace(/[^0-9]/g, '').trim().toLowerCase();
};

// adding function to OTP verification / signup button click event

const signup = document.getElementById('signup');

signup.onclick = async () => {
    if (otp.value.length < 6 || otp.value.length > 6) return false;

    hideErrorText(4, otp, otpBox, otpIcon);
    disableButton(signup);

    // api call to validate OTP submitted by user

    let result = await fetch(`/login`, {
        method: 'post',
        body: JSON.stringify({
            'email': signupEmail.value,
            'otp': otp.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // return back if OTP is Incorrect

    if (!result.ok) {
        showErrorText(4, otp, otpBox, otpIcon);
        enableButton(signup, `<i class="fa-solid fa-right-to-bracket"></i> Signup`);
    } else {
        // reload page if OTP matches & login is successfull

        localStorage.setItem('login', 'true');
        location.reload();
    }
};

// Password matching & Login form

const loginEmail = document.getElementById('login-email');

const loginPassword = document.getElementById('login-password');
const loginPasswordBox = document.getElementById('login-password-box');
const loginPasswordIcon = document.getElementsByClassName('fa-lock')[1];

// function to show / hide password as when required

const loginPasswordEye = document.getElementsByClassName('eye')[1];

loginPasswordEye.addEventListener('click', () => {
    if (loginPassword.type === 'password') loginPassword.type = 'text';
    else loginPassword.type = 'password';

    loginPasswordEye.classList.toggle('fa-eye');
    loginPasswordEye.classList.toggle('fa-eye-slash');

    password.focus();
});

const loginButton = document.getElementById('login-button');

loginButton.onclick = async () => {
    hideErrorText(5, loginPassword, loginPasswordBox, loginPasswordIcon);
    disableButton(loginButton);

    // api call to validate password entered by user from database

    let result = await fetch(`/login`, {
        method: 'POST',
        body: JSON.stringify({
            'email': loginEmail.value,
            'password': loginPassword.value
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // return back if password is incorrect

    if (!result.ok) {
        showErrorText(5, loginPassword, loginPasswordBox, loginPasswordIcon);
        enableButton(loginButton, `<i class="fa-solid fa-right-to-bracket"></i> Login`);
    } else {
        // reload page if password matches & login is successful

        localStorage.setItem('login', 'true');
        location.reload();
    }
};

// Closing modal & navigating back functions

// Closing Modal => Modal -> main screen

const closeModalButton = document.getElementById('close');

closeModalButton.onclick = () => {
    closeModal();
};

// Navigating back => from Signup form -> Email validator form

const signupForm = document.getElementById('signup-form');
const backToLoginOrSignup = document.getElementById('back-to-login-or-signup');

backToLoginOrSignup.onclick = () => {
    hideErrorText(1, _name, nameBox, nameIcon);
    hideErrorText(2, date, dateBox, dateIcon);
    hideErrorText(3, password, passwordBox, passwordIcon);
    signupForm.reset();
    addSignupInfo.style.display = 'none';
    loginOrSignup.style.display = 'flex';
};

// Navigating back => from OTP form -> to Signup form

const otpForm = document.getElementById('otp-form');
const backToSignupInfo = document.getElementById('back-to-signup-info');

backToSignupInfo.onclick = () => {
    hideErrorText(4, otp, otpBox, otpIcon);
    otpForm.reset();
    verify.style.display = 'none';
    addSignupInfo.style.display = 'flex';
};

// Navigating back => from Login form -> to Email Validator form

const passwordForm = document.getElementById('password-form');
const backFromLoginInfo = document.getElementById('back-from-login-info');

backFromLoginInfo.onclick = () => {
    hideErrorText(5, loginPassword, loginPasswordBox, loginPasswordIcon);
    passwordForm.reset();
    loginInfo.style.display = 'none';
    loginOrSignup.style.display = 'flex';
};