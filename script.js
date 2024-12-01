let passwordInput = document.querySelector('.input_box input');
let copyIcon = document.querySelector('.input_box span');
let passIndicator = document.querySelector('.pass_indicator');
let lengthSlider = document.querySelector('.pass_length input');
let options = document.querySelectorAll('.option input');
let generateBtn = document.querySelector('.generate_password');
let counterSlider = document.querySelector('.pass_length span');


const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "^!$%&|[](){}:;.,*+-#@<>~",
}


let generatePassword = function () {

    let passLength = lengthSlider.value;
    let staticPassword = "";
    let DuplicateItem = false;
    let randomPassword = "";

    options.forEach(option => {
        if (option.checked) {
            if (option.id !== "duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id === "spaces") {
                staticPassword = staticPassword + ` ${staticPassword} `;
                console.log(staticPassword)
            } else {
                DuplicateItem = true
            }
        }
    })

    for (let i = 0; i < passLength; i++) {

        let randomCar = staticPassword[Math.floor(Math.random() * staticPassword.length)]

        // console.log(randomCar);
        // console.log(randomPassword);
        // console.log(randomPassword.includes(randomCar));
        // console.log(randomCar === " ");


        if (DuplicateItem) {
            !randomPassword.includes(randomCar) || randomCar === " " ? randomPassword+=randomCar : i--;
        } else {
            randomPassword+=randomCar;
        }


    }

    passwordInput.value=randomPassword;
}

const updatePasswordIndicator=function (){
    passIndicator.id=lengthSlider.value<=8 ? "weak" :
        lengthSlider.value<=16 ? "med" :"strong";
}

const updateSlider = function () {
    counterSlider.innerHTML = lengthSlider.value;
    updatePasswordIndicator();
    generatePassword();
}

updateSlider();

const copyPassword=function (){
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerHTML="کپی شد !";
    copyIcon.style.color="#0f0";
setTimeout(function (){
    copyIcon.innerHTML="کپی";
    copyIcon.style.color="#000";

},2000)
}


copyIcon.addEventListener('click', copyPassword)
generateBtn.addEventListener('click', generatePassword)
lengthSlider.addEventListener('input', updateSlider)
