let inputName = document.querySelector('#input-name'),
    inputPhone = document.querySelector('#input-phone'),
    inputEmail = document.querySelector('#input-email');
let popUp = document.querySelector('.form-popup');
let formsValid = false;
let loading = document.createElement('img');
loading.src= 'img/loading.gif';
loading.style.width = '30px';
loading.style.height = '30px';
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




let form = document.querySelector('#form');
console.log(form);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll('.main__form-input');
    inputs.forEach(item => {
        checkEmptyValue(item);
    })
    checkEmail(inputEmail.value);

    if(!formsValid) {
        console.log('error');
    } else {
        postData()
            .then((response) => {
                if (response.message == 'ok') {
                    popUp.firstElementChild.firstElementChild.firstElementChild.remove();
                    popUp.firstElementChild.firstElementChild.insertAdjacentHTML("afterbegin", `<div class="done">Готово!</div>
                    <div class="pop-up__message">
                    В течениие 15 минут чек-лист будет отправлен Вам на почту</div>`);
                    form.reset();
                } else if (response == "err"){
                    popUp.firstElementChild.firstElementChild.firstElementChild.remove();
                    popUp.firstElementChild.firstElementChild.insertAdjacentHTML("afterbegin", `<div class="done">Что-то пошло не так</div>`);
                }
                setTimeout(()=> {
                    popUp.firstElementChild.firstElementChild.innerHTML="";
                    popUp.style.display = 'none'
                    document.querySelector('html').style.overflowY = '';
                }, 3000);
            })
            .catch(err => console.log(err))
    }
})

async function postData() {
    let formData = new FormData(form);
    popUp.style.display = 'flex';
    popUp.firstElementChild.firstElementChild.appendChild(loading);
    document.querySelector('html').style.overflowY = 'hidden';
    let response = await fetch('sendmail.php', {
        method: "POST",
        body: formData
    })

    if (response.statusText == "OK") {
        return await response.json();
        // let result = await response.json();
        // form.reset();
        // alert(result);
    } else {
        return response.message = 'err';
    }
}
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