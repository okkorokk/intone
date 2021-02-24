let inputName = document.querySelector('#input-name');
let inputPhone = document.querySelector('#input-phone');
let inputEmail = document.querySelector('#input-email');

inputPhone.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
})

let submitBtn = document.querySelector('#submit-button');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll('.main__form-input');
    if (!checkEmptyValue (inputName) || !checkEmptyValue(inputPhone) || !checkEmptyValue(inputEmail)) {
        return
    }
    if (!checkEmail(inputEmail.value)) {
        return
    }


})

function checkEmptyValue (item) {
    if (item.value == "") {
        let elem = document.createElement('div');
        elem.innerHTML = "*Поле не заполнено";
        elem.classList.add('wrong-input');
        item.parentNode.append(elem);
        setTimeout(() => {
            elem.remove();
        }, 3000)
        return false
    } else {
        return true
    }
}
function checkEmail(email) {
    let pattern  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!pattern.test(email)) {
        let elem = document.createElement('div');
        elem.innerHTML = "*Неверный E-mail";
        elem.classList.add('wrong-input');
        inputEmail.parentNode.append(elem);
        setTimeout(() => {
            elem.remove();
        }, 3000)
        return false
    } else {
        return true
    }
}