let errors = [];

function checkValidity(input) {
    let validity = input.validity;

    if (validity.valueMissing) {
        errors.push('Поле ' + input.placeholder + ' не заполнено');
    }
}

function send() {
    errors = [];

    let inputs = document.querySelectorAll("input");

    for (let input of inputs) {
        checkValidity(input);
    }

    let name = document.getElementById('name').value;
    let surname = document.getElementById('surname').value;
    let login = document.getElementById('login').value;
    let password0 = document.getElementById('password0').value;
    let password1 = document.getElementById('password1').value;
    let select = document.getElementById('select');

    validateName(name, surname);
    validateLogin(login);
    validateEmail(document.getElementById("email").value);
    checkPassword(password0);
    comparePassword(password0, password1);
    checkRules(document.getElementById("checkbox"));
    validateSelect(select);

    document.getElementById('errorsInfo').innerHTML = errors.join('. <br>');

    let user = {
        name: name,
        surname: surname,
        login: login,
        select: select.value,
        email: document.getElementById("email").value,
        tel: document.getElementById("tel").value,
        password0: password0,
        password1: password1,
        checkbox: document.getElementById("checkbox")
    }

    fetch("https://httpbin.org/post", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
    })
    .then(response => response.json())
    .then(user => {
        console.log(user);
    })
    .catch(error => console.log(error));
}

function validateName(name, surname) {
    let nameFormat = /^[a-zA-Zа-яА-Я0-9]+$/;
    if (name.match(nameFormat)
        && surname.match(nameFormat)) {
        return true;
    } else {
        errors.push("Неверный формат имени или фамилии");
    }
}

function validateLogin(login) {
    let loginFormat = /^[a-z0-9_-]{3,16}$/;
    if (login.match(loginFormat)) {
        return true;
    }
    else {
        errors.push("Неверный формат логина");
    }
}

function validateEmail(emailField) {
    let mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (emailField.match(mailFormat)) {
        return true;
    } else {
        errors.push("Неверный формат email");
    }
}

function checkRules(checkbox) {
    if (checkbox.checked) {
        return true;
    } else {
        errors.push("Подтвердите согласие правилам");
    }
}

function checkPassword(password) {
    let passFormat = /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/;
    if (password.match(passFormat)) {
        return true;
    } else {
        errors.push("Пароль недостаточно надежный");
    }
}

function comparePassword(password, repeatPassword) {
    if (password != repeatPassword) {
        errors.push("Пароли не совпадают");
    }
}

function validateSelect(select) {
    if (select.value != "who") {
        return true;
    } else {
        errors.push("Выберите обращение");
    }
}