//todo: fazer um if timeMemo < 50
const workTime = 10;
let timePassed = 0;
let timeLeft = workTime; 
let timerInterval = null;

let timeMemo = 0;
let timeLeftBeforePause = 0;
let timePassedBeforePause = 0;
let wasPaused = false;
let wasStarted = false;

const reset = () => {

    timePassed = 0;
    timeLeft = workTime;
    timeLeftBeforePause = 0;
    timePassedBeforePause = 0;
    wasPaused = false;
    wasStarted = false;
    clearInterval(timerInterval);
    document.getElementById("display").innerHTML = formatTimeLeft(workTime);
}

const formatTimeLeft = time => {
    
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    
    return `${minutes}:${seconds}`;
};

function startTimer() {

    if (!wasStarted) {

        wasStarted = true;

        if (wasPaused) {

            timePassed = timePassedBeforePause;
            timeLeft = timeLeftBeforePause;
            wasPaused = false;
        }

        timerInterval = setInterval(() => {
            
            if (timeLeft > 0 ) {

                timePassed += 1;
                timeLeft = workTime - timePassed;
                document.getElementById("display").innerHTML = formatTimeLeft(timeLeft);
            }
            if (timeLeft === 0) {

                reset();
                timeMemo += workTime;
                console.log(`good job! you have worked for ${timeMemo} minutes. Time for a break?`);
            }
        }, 1000);

        
    }
};

function pauseTimer() {

    timeLeftBeforePause = timeLeft;
    timePassedBeforePause = timePassed;
    document.getElementById("display").innerHTML = formatTimeLeft(timeLeftBeforePause);
    clearInterval(timerInterval);
    wasPaused = true;
    wasStarted = false;
}

//Breaks
const smallBreak = 5;
const bigBreak = 10;
