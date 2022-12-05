const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const timer = document.querySelector('#timer');

const kpp1Off = document.querySelector('#kpp1-off');
const kpp1On = document.querySelector('#kpp1-on');
const kpp2Off = document.querySelector('#kpp2-off');
const kpp2On = document.querySelector('#kpp2-on');

const eventList = document.querySelector('.kpp__events-list');

const kpp1 = document.querySelector('#kpp1-stat');
const kpp2 = document.querySelector('#kpp2-stat');
const kpp2car = document.querySelector('#kpp2-stat-car');
const kpprem = document.querySelector('#kpp-remont-stat');
const kppsbr = document.querySelector('#kpp-sbr-stat');

const remont_kpp1_button = document.querySelector('#kpp1-rem');
const sbr_kpp1_button = document.querySelector('#kpp1-sbr');
const remont_kpp2_button = document.querySelector('#kpp2-rem');
const sbr_kpp2_button = document.querySelector('#kpp2-sbr');

const sbr = document.querySelector('#sbr').value;
const remont = document.querySelector('#remont').value;


let kpp1error = false;
let kpp2error = false;
let kpp1sbrerror = false;
let kpp2sbrerror = false;

var process_interval;

startBtn.addEventListener('click', (e) => {
    e.currentTarget.disabled = true;
    stopBtn.disabled = false;

    let newMsg = document.createElement('p')
    newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: система реального времени управления КПП успешно запущена.`;
    eventList.appendChild(newMsg);

    process_interval = setInterval(()=>{
        imitation_process();
    }, 2500)
})

stopBtn.addEventListener('click', (e) => {
    e.currentTarget.disabled = true;
    startBtn.disabled = false;

    let newMsg = document.createElement('p')
    newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: система реального времени управления КПП остановлена.`;
    eventList.appendChild(newMsg);	

    clearInterval(process_interval);
})

setInterval(()=>{
    const date = new Date();
    timer.innerHTML=date.toLocaleTimeString();
},1000)

remont_kpp1_button.addEventListener('click', (e) => {
    if (kpp1error) {
        kpprem.innerHTML = parseInt(kpprem.textContent) + parseInt(remont);

        let newMsg = document.createElement('p')
        newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: на КПП#1 вызван мастер. Стоимость ремонта ${remont} руб. КПП#1 успешно запущено.`;
        eventList.appendChild(newMsg);
    
        kpp1On.style.display = 'block';
        kpp1Off.style.display = 'none';
		kpp1error = false;
    }
})

sbr_kpp1_button.addEventListener('click', (e) => {
    if (kpp1sbrerror) {
        kppsbr.innerHTML = parseInt(kppsbr.textContent) + parseInt(sbr);

        let newMsg = document.createElement('p')
        newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: на КПП#1 вызвана служба быстрого реагирования. Стоимость вызова ${sbr} руб. Ситуация разрешена, кпп работает.`;
        eventList.appendChild(newMsg);
    
        kpp1On.style.display = 'block';
        kpp1Off.style.display = 'none';
		kpp1sbrerror = false;
    }
    
})

remont_kpp2_button.addEventListener('click', (e) => {
    if (kpp2error) {
        kpprem.innerHTML = parseInt(kpprem.textContent) + parseInt(remont);

        let newMsg = document.createElement('p')
        newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: на КПП#2 вызван мастер. Стоимость ремонта ${remont} руб. КПП#2 успешно запущено.`;
        eventList.appendChild(newMsg);
    
        kpp2On.style.display = 'block';
        kpp2Off.style.display = 'none';
		kpp2error = false;
    }
    
})

sbr_kpp2_button.addEventListener('click', (e) => {
    if (kpp2sbrerror) {
        kppsbr.innerHTML = parseInt(kppsbr.textContent) + parseInt(sbr);

        let newMsg = document.createElement('p')
        newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: на КПП#2 вызвана служба быстрого реагирования. Стоимость вызова ${sbr} руб. Ситуация разрешена, кпп работает.`;
        eventList.appendChild(newMsg);
    
        kpp2On.style.display = 'block';
        kpp2Off.style.display = 'none';
		kpp2sbrerror = false;
    }
    
})

function getRandomArbitrary(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
  
function imitation_process(){
    let kppAdd = 1;
    let kppAdd2 = getRandomArbitrary(1, 4);
   
    if (!kpp1error && !kpp1sbrerror) {
        setTimeout(() => {
            kpp1.innerHTML = parseInt(kpp1.textContent) + kppAdd;
        }, 1000)

        kpp1error = getRandomArbitrary(1, 30) === 11 ? true : false;
        kpp1sbrerror = getRandomArbitrary(1, 30) === 4 ? true : false;

        if (kpp1error === true) {
            let newMsg = document.createElement('p')
            newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: нарушена работа КПП#1. Необходимо вызвать мастера.`;
            eventList.appendChild(newMsg);
            kpp1On.style.display = 'none';
            kpp1Off.style.display = 'block';
        }

        if (kpp1sbrerror === true) {
            let newMsg = document.createElement('p')
            newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: нештатная ситуация на КПП#1 . Необходимо срочно вызвать службу быстрого реагирования!`;
            eventList.appendChild(newMsg);
            kpp1On.style.display = 'none';
            kpp1Off.style.display = 'block';
        }
    }

    if (!kpp2error && !kpp2sbrerror) {
        setTimeout(() => {
            kpp2.innerHTML = parseInt(kpp2.textContent) + kppAdd2;
            kpp2car.innerHTML = parseInt(kpp2car.textContent) + 1;
        }, 1000)

        kpp2error = getRandomArbitrary(1, 30) === 4 ? true : false;
        kpp2sbrerror = getRandomArbitrary(1, 30) === 15 ? true : false;

        if (kpp2error === true) {
            let newMsg = document.createElement('p')
            newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: нарушена работа КПП#2. Необходимо вызвать мастера.`;
            eventList.appendChild(newMsg);
            kpp2On.style.display = 'none';
            kpp2Off.style.display = 'block';
        }

        if (kpp2sbrerror === true) {
            let newMsg = document.createElement('p')
            newMsg.innerHTML = `<b>[${(new Date).toLocaleTimeString()}]</b>: нештатная ситуация на КПП#2 . Необходимо срочно вызвать службу быстрого реагирования!`;
            eventList.appendChild(newMsg);
            kpp2On.style.display = 'none';
            kpp2Off.style.display = 'block';
        }
    }
	eventList.scrollTop = eventList.scrollHeight;
}
      

