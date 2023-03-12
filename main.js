let startBtn = document.querySelector('.startBtn');
let number = document.getElementById('number');
let questionBtn = document.querySelector('.questionBtn');
let timeHTML = document.querySelector('.time');
let btnTrue = document.querySelector('.btnTrue');
let btnFalse = document.querySelector('.btnFalse');
let resetBtn = document.querySelector('.resetBtn');

let time;
let AnswerTrue = 0;
let AnswerFalse = 0;



startBtn.addEventListener('click', () => {
    let name = document.getElementById('name').value;
    let second = document.getElementById('second').value;
    timeHTML.innerHTML = second;
    localStorage.setItem('HTMLSecond', second);
    localStorage.setItem('HTMLName', name);
    time = localStorage.getItem('HTMLSecond');
    if (name == '' || second == '' || second <= 0) {
        alert('The Form was not filled out correctly! Please try again');
    } else if (name != '' || second != '' || second > 0) {
        document.querySelector('.firstBtn').setAttribute('disabled', 'disabled');
        number.removeAttribute('disabled');
        number.value = '';
        number.focus();
        kopaytirish();
        sendtelegram(`${name} to perform multiplication ${second} seconds chosen`);
    }
});

function kopaytirish() {
    let num1 = Math.floor(1 + Math.random() * 10);
    let num2 = Math.floor(1 + Math.random() * 10);
    localStorage.setItem('alicoderNum1', num1);
    localStorage.setItem('alicoderNum2', num2);
    questionBtn.innerHTML = `${num1} * ${num2} = ?`;
}

number.addEventListener("keypress", mykeypress);

// mykeypress function
function mykeypress(event) {
    if (event.key === "Enter" || event.keyCode === 13) {
        let localNum1 = localStorage.getItem('alicoderNum1');
        let localNum2 = localStorage.getItem('alicoderNum2');
        if (localNum1 * localNum2 == number.value) {
            AnswerTrue++;
            btnTrue.innerHTML = AnswerTrue;
            if (AnswerTrue == 1) {
                let localTime = localStorage.getItem('HTMLSecond');
                setInterval(timeFunction, 1000);
                setTimeout(StopMyKeypress, 1000 * localTime);
            }
            playOn();
        } else {
            playOff();
            AnswerFalse++;
            btnFalse.innerHTML = AnswerFalse;
        }
        kopaytirish();
        number.value = '';
    }
}

// stop mykeypress function
function StopMyKeypress() {
    number.removeEventListener('keypress', mykeypress);
    number.setAttribute('disabled', 'disabled');
    number.placeholder = 'The time ended ...';
    questionBtn.innerHTML = `Correct: ${AnswerTrue}; Incorrect: ${AnswerFalse}`;
    questionBtn.classList.add('col-12');
    let EndTime = localStorage.getItem('HTMLSecond');
    let EndName = localStorage.getItem('HTMLName');
    sendtelegram(`${EndName} in multiplication ${EndTime} seconds ${AnswerTrue} is correct and ${AnswerFalse} is incorrect`);
    resetBtn.classList.remove('d-none');
    document.querySelector('.AboutText').innerHTML = `${EndName} ${EndTime} for a second ${AnswerTrue} is correct and ${AnswerFalse} is answered incorrectly`;
}




// time function
function timeFunction() {
    if (time > 0) {
        --time;
    }
    timeHTML.innerHTML = time;
}

// Play audio
let playOn = () => new Audio("audio/on.mp3").play();
let playOff = () => new Audio("audio/off.mp3").play();


// sendtelegram
function sendtelegram(message) { let telegram_bot_id = "5140293099:AAGqaTJBYGLwDprRPyrbTL_piLg2ZGzZvxM";
let chat_id = 976376314; let settings = { "async": true, "crossDomain": true, "url": "https://api.telegram.org/bot" + telegram_bot_id + "/sendMessage", "method": "POST", "headers": { "Content-Type": "application/json", "cache-control": "no-cache" }, "data": JSON.stringify({ "chat_id": chat_id, "text": message }) }; $.ajax(settings).done(function (response) { }); };

// resetBtn
resetBtn.addEventListener('click', () => {
    location.reload();
});