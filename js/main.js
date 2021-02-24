let inputName = document.querySelector('#input-name'),
    inputPhone = document.querySelector('#input-phone'),
    inputEmail = document.querySelector('#input-email');
let formsValid = false;
let anchors = document.querySelectorAll('a[href*="#"]');
anchors.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = item.getAttribute('href');
        document.querySelector('' + blockID).scrollIntoView({
            behavior:"smooth",
            block:"start"
        })
    })
})



inputPhone.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^\d]/g, '');
})

let submitBtn = document.querySelector('#submit-button');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll('.main__form-input');

    inputs.forEach(item => {
        checkEmptyValue(item);
    })
    checkEmail(inputEmail.value);

    if(!formsValid) {
        console.log('error');
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
        formsValid = false;
    } else {
        formsValid = true
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
        formsValid = false;
    } else {
        formsValid = true;
    }
}