const app = () => {
    const song = document.querySelector('.song');
    const playBtn = document.getElementById('play-btn');
    const timeSelect = document.getElementById('time-select');
    const timeChosen = document.querySelector('.set-time h3');
    const circleProgress = document.getElementById('circle-progress');
    const circleLength = circleProgress.getTotalLength();
    const girl = document.querySelector('.girl svg');
    const soundBtns = document.querySelectorAll('.set-sound button');
    const timeDisplay = document.querySelector('.player h1');

    const setTimeDiv = document.querySelector('.set-time');
    const setSoundDiv = document.querySelector('.set-sound');
    const back = document.querySelector('.back');
    const aura = document.querySelector('.aura');

    back.classList.add('disabled');

    soundBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            song.src = btn.getAttribute('data-sound');
            song.currentTime = 0;
        })
    });

    let duration = 180;
    //changing duration
    timeSelect.onchange = () => {
        duration = timeSelect.value * 60;
        timeChosen.textContent = `${timeSelect.value} minutes`;
        song.currentTime = 0;
    }

    circleProgress.style.strokeDasharray = circleLength;
    circleProgress.style.strokeDashoffset = circleLength;

    //play song
    playBtn.addEventListener('click', () => {
        if (song.paused) {
            song.play();

            timeSelect.disabled = true;
            soundBtns.forEach(btn => btn.disabled = true);
            setTimeDiv.classList.add('disabled');
            setSoundDiv.classList.add('disabled');
            back.classList.remove('disabled');
            aura.classList.remove('no-display');

            playBtn.src = 'foundation_pause.svg';
            playBtn.classList.add('pause');
            girl.classList.add('animated-girl');
        } else {
            song.pause();

            timeSelect.disabled = false;
            soundBtns.forEach(btn => btn.disabled = false);
            setTimeDiv.classList.remove('disabled');
            setSoundDiv.classList.remove('disabled');
            back.classList.add('disabled');
            aura.classList.add('no-display');

            playBtn.src = 'bi_play.svg';
            playBtn.classList.remove('pause');
            girl.classList.remove('animated-girl');
        }
    });

    //animate progress circle and time display
    song.addEventListener('timeupdate', () => {
        let currentTime = song.currentTime;
        let timeLeft = duration - currentTime;
        let seconds = Math.floor(timeLeft % 60);
        let minutes = Math.floor(timeLeft / 60);

        let progress = circleLength - (currentTime / duration) * circleLength;
        circleProgress.style.strokeDashoffset = progress;

        if (seconds < 10) {
            timeDisplay.textContent = `${minutes}:0${seconds}`;
        } else {
            timeDisplay.textContent = `${minutes}:${seconds}`;
        }

        if (currentTime >= duration) {
            song.pause();
            song.currentTime = 0;
            playBtn.src = 'bi_play.svg';
        }
    });
}

app();