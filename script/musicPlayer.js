export const musicPlayerInit = () => {
    
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed']; //список пісень(необмежиний)

    let trackIndex = 1; //вказує з котрої пісні почнеться відтворення

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    const addZero = n => n < 10 ? '0' + n : n;


    audioNavigation.addEventListener('click', event => {  //ф-ція керування плеєром
        const target = event.target;  //елемент на який натиснули

        if (target.classList.contains('audio-button__play')) { //метод contains провіряє чи є потрібний нам клас, якщо так повертає true
            audio.classList.toggle('play'); //метод toggle провіряє чи є клас в audio, якщо не має тоді добавляє, якщо є він його забере
            audioButtonPlay.classList.toggle('fa-play');  // -//-
            audioButtonPlay.classList.toggle('fa-pause'); // -//-

            if (audioPlayer.paused) {  //умова запуску музики, якщо він на паузі
                audioPlayer.play();   //тоді грати
            } else {
                audioPlayer.pause();  //якщо ні тоді пауза
            }

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }

    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondPassed = Math.floor(currentTime % 60) || '0';

        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondPassed)}`
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
    });

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

};