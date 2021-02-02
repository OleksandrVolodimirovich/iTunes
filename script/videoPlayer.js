export const videoPlayerInit = () =>{
    console.log('video Init');
//video-player
//video-button__play
//video-button__stop
//video-time__passed
//video-progress
//video-time__total
    
   const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    

    const toggleIcon = () => {           //функція toggleIcon буде запускатися  після запуску функції videoPlayer.addEventListener або при паузі.
        if (videoPlayer.paused) { //умова для toggleIcon
            videoButtonPlay.classList.remove('fa-pause'); //добавляє клас
            videoButtonPlay.classList.add('fa-play');     //видаляє клас
        } else {
            videoButtonPlay.classList.add('fa-pause');     //добавляє клас
            videoButtonPlay.classList.remove('fa-play'); //видаляє клас
        }
    }

    const togglePlay = () => {      //умова була в videoPlayer.addEventListener.Зробили окрему константу для зручності щоб не дублювати код  
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        //toggleIcon(); //активація функції перенесемо в окремий виклик
    };

    const stopPlay = () => {  //ф-ція кнопки стоп
        videoPlayer.pause();           //ставить на паузу
        videoPlayer.currentTime = 0;   //скидає відео на початок, тобто на 0
    };

    //(наз.Добавити 0) присвоїти(=) стрілочна ф-ція приймає число(n=>) 
    //провіряємо,якщо число(n) менше(<)10 тернарний оператор(?-виконується тоді коли >> (умова ? (умова правдива) : (умова брехня))
    //якщо виконується умова(n < 10) тоді на початок доб.'0'('0' + n)
    //якщо умова невиконується тоді(:), тобто число буде більше 9 тоді використовується поточне число (n)
    const addZero = n => n < 10 ? '0' + n : n;

    
    videoPlayer.addEventListener('click', togglePlay);      //активує по кліку відео(відео на екрані) через ф-цію togglePlay
    
    videoButtonPlay.addEventListener('click', togglePlay);  //активує по кліку(по кнопці) відео через ф-цію togglePlay

    
    videoPlayer.addEventListener('play', toggleIcon);  //активуємо play через toggleIcon
    videoPlayer.addEventListener('pause', toggleIcon); //активуємо pause через toggleIcon 

    
    videoButtonStop.addEventListener('click', stopPlay);  //активує кнопку стоп
   
    
    videoPlayer.addEventListener('timeupdate', () => {   //ф-ція запускає подію timeupdate для підрахунку часу в відео/аудіо
        const currentTime = videoPlayer.currentTime;     //поточний час
        const duration = videoPlayer.duration;           //загальна тривалість

        videoProgress.value = (currentTime / duration) * 100; //прокрутка відео >> поточний час ділимо на загальну тривалість і завкруглюємо помноживши на 100

        let minutePassed = Math.floor(currentTime / 60);  //ділимо час для того, щоб вийшла 1 хвилина
        let secondsPassed = Math.floor(currentTime % 60);  //отримуэмо залишок від ділення задопомогою (%) для секунд

        let minuteTotal = Math.floor(duration / 60); //ділимо час для того, щоб вийшла 1 хвилина
        let secondsTotal = Math.floor(duration % 60); //отримуэмо залишок від ділення задопомогою (%) для секунд

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`; //виводить поточну зміну хвилин, addZero добавляє '0'
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal);    //виводить загальну тривалість, addZero добавляє '0'
        
    });

    videoProgress.addEventListener('input', () => {     //videoProgress-це range(input) і в нього є change, але тут він не підходить тому вкажемо input
        const duration = videoPlayer.duration;
        const value = videoProgress.value;
        
        videoPlayer.currentTime = (value * duration) / 100;  //value-значення куди клікнули * duration-значення 
        //загальної тривалості відео / 100-для отримання значення в секундах куди має переключиися currentTime
})

};
