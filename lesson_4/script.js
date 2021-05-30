// let textWithOne = `'Прямая речь', aren't 'Прямая речь'`
// console.log(textWithOne);

// function ChangeMark(text) {
//     return text.replace(/\B'|'\B/g, '"');
// }

// console.log(ChangeMark(textWithOne));

// ------------------------

var form = document.forms.formRegister;
var spanErrorText = document.getElementsByClassName('error-text');

var clearErrorText = () => {
    for (let n = 0; n < spanErrorText.length; n++) {
        spanErrorText[n].innerText = '';
    }
};

var formValidate = function (e) {
    e.preventDefault();
    clearErrorText();

    let name = form.elements.name;
    let mail = form.elements.email;
    let phone = form.elements.phone;

    let result = true;

    if (!nameValid(name) || !mailValid(mail) || !phoneValid(phone))
        result = false;

    if (result)
        alert('Ваши данные приняты!');

    return result;
};

function nameValid(name) {
    let regexp = /\B[A-Za-zА-Яа-я]+$/;

    if (name.value.match(regexp)) {
        return true;
    } else {
        spanErrorText[0].innerText = 'Имя может содержать только буквы';
        name.focus();
        return false;
    }
};

function mailValid(mail) {
    let regexp = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/;

    if (mail.value.match(regexp)) {
        return true;
    } else {

        spanErrorText[1].innerText = 'Адрес эл. почты может содежрать латинские буквы (@, . - _)';
        mail.focus();
        return false;
    }
};

function phoneValid(phone) {
    let regexp = /^\+\d{1}\(\d{3}\)\d{3}-\d{4}$/;

    if (phone.value.match(regexp)) {
        return true;
    } else {
        spanErrorText[2].innerText = 'Телефон введите в формате +7(000)000-0000';
        phone.focus();
        return false;
    }
};
