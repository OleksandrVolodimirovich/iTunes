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

    const changeIconPlay = () => {  //зміна іконки
        if (audio.paused) {  //якщо пауза тоді
            radio.classList.remove('play'); //видалення анімації(крутиться логотип)
            radioStop.classList.add('fa-play'); //добавляти клас fa-play
            radioStop.classList.remove('fa-stop'); //удаляти клас fa-stop
        } else {  //інакше
            radio.classList.add('play'); //добавленнялення анімації(крутиться логотип)
            radioStop.classList.add('fa-stop'); //добавляти fa-stop
            radioStop.classList.remove('fa-play'); //удаляти клас fa-play
        }
    };

    const selectItem = elem => { //ф-ція запуску select
        radioItem.forEach(item => item.classList.remove('select')); //при зміні радіостанції видаляє сіру оводку навколо логотипу
        elem.classList.add('select'); //добавляє сіру оводку навколо логотипу
    }


    radioNavigation.addEventListener('change', event => {  //ф-ція вибору радіостанцій
        const target = event.target;   //зробимо константу для зручності, для подальшого дублювання
        const parrent = target.closest('.radio-item'); //шукає потрібний нам клас в цілому документі
        selectItem(parrent); //виклик сіру оводку

        const title = parrent.querySelector('.radio-name').textContent; //отримуємо текст назву радіостанції
        radioHeaderBig.textContent = title;  //текст 'вибір радіостанції' змінюєм на назву радіостанції 

        const urlImg = parrent.querySelector('.radio-img').src; //отримуєму картинку радіостанції
        radioCoverImg.src = urlImg; //змінюємо анімаційну картинку на картинку радіо


        radioStop.disabled = false;    //розблокуємо кнопку play для вітворення    
        audio.src = target.dataset.radioStantion;   //при кліку на радіо активуємо 
        audio.play(); //запуск play
        changeIconPlay(); //виклик ф-ції для зміни іконки
    });

    radioStop.addEventListener('click', () => {  //ф-ція для стоп радіо
        if (audio.paused) {  //умова паузи
            audio.play();  //якщо музика на паузі тоді play
        } else {
            audio.pause(); //якщо ні тоді pause
        }
        changeIconPlay(); //виклик ф-ції для зміни іконки
    });

};