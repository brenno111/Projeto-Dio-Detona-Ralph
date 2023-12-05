const state = {
    view: {
        squares:document.querySelectorAll(".square"),
        enemy:document.querySelector(".enemy"),
        timeleft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        timerId: setInterval(randomSquare,1000),
        CountDownTimerId: setInterval(CountDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result:0,
        currentTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare,1000),
        CountDownTimerId: setInterval(CountDown, 1000),
    }
};

function CountDown(){
    state.values.currentTime--;
    state.view.timeleft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.CountDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }

}

function PlaySound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}



function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown",() => {
            if(square.id === state.values.hitPosition){
              state.values.result++
              state.view.score.textContent = state.values.result;
              state.values.hitPosition = null;
              PlaySound("hit");
            }
        });
    });
}

function initialize(){

addListenerHitBox();
}


initialize();
