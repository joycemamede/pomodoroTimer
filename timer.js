

//todo: fazer um if timeMemo < 50
const work = 15;
const smallBreak = 5;
const bigBreak = 10;
let timePassed = 0;
let timeLeft = 0; 
let timerInterval = null;
let timeMemo = 0;
let timeLeftBeforePause = 0;
let timePassedBeforePause = 0;
let wasPaused = false;
let wasStarted = false;
let activity;

//User activity input
const activitySelection = document.querySelector('select');
activitySelection.addEventListener('change', (event) => {
    activity = event.target.value;
    switch (activity) {
        case "work":
            activity = work;
            document.getElementById("display").innerHTML = formatTime(activity);
            break;
        case "smallBreak":
            activity = smallBreak;
            document.getElementById("display").innerHTML = formatTime(activity);
            break;
        case "bigBreak":
            activity = bigBreak;
            document.getElementById("display").innerHTML = formatTime(activity);
            break;
        default:
            activity = work;
            document.getElementById("display").innerHTML = formatTime(activity);
            break;     
    }
    reset();

    return activity;
    
})

const reset = () => {

    timePassed = 0;
    timeLeft = work;
    timeLeftBeforePause = 0;
    timePassedBeforePause = 0;
    wasPaused = false;
    wasStarted = false;
    clearInterval(timerInterval);
    //document.getElementById("display").innerHTML = formatTime(work);
}

const formatTime = time => {
    
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    
    return `${minutes}:${seconds}`;
};


function Timer(activity) {

    if (!wasStarted) {

        console.log("comecei o ciclo, started = false");

        if (!wasStarted && !wasPaused) {
            timeLeft = activity;
            console.log("dei o valor de activity para timeLeft");
        }

        if (wasPaused) {
            console.log("pausei e dei o valor antes da pausa a timeLeft");
            timePassed = timePassedBeforePause;
            wasPaused = false;
        }

        wasStarted = true;

        timerInterval = setInterval(() => {

            if (timeLeft > 0) {
                console.log("valor de timeLeft no loop", timeLeft);
                timePassed += 1;
                timeLeft = activity - timePassed;
                console.log("valor de timeLeft depois da conta", timeLeft);
                document.getElementById("display").innerHTML = formatTime(timeLeft);
            }
            if (timeLeft === 0) {

                if (activity > 10) {
                    timeMemo += activity;
                    console.log(`good job! you have worked for ${formatTime(timeMemo)} minutes. Time for a break?`);
                }
                
                reset();   
            }
        }, 1000);

        
    }
};

function pauseTimer() {
    
    timeLeftBeforePause = timeLeft;
    timePassedBeforePause = timePassed;
    document.getElementById("display").innerHTML = formatTime(timeLeftBeforePause);
    clearInterval(timerInterval);
    wasPaused = true;
    wasStarted = false;
}



