export const radioPlayerInit = () => {
    
    //отримуємо елементи ↓↓↓
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');

    const audio = new Audio(); //створює новий обєкт на основі конструктора 'new Audio'
    audio.type = 'audio/acc';  //задаємо тип audio, може бути mp3 і т.д.

    radioStop.disabled = true; //блокуємо кнопку play

    const changeIconPlay = () => {  
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }


    radioNavigation.addEventListener('change', event => {  //ф-ція вибору радіостанцій
        const target = event.target;                        //зробимо константу для зручності, для подальшого дублювання
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;


        radioStop.disabled = false;        
        audio.src = target.dataset.radioStantion;   //при кліку на радіо активуємо 
        audio.play();
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

};