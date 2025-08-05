const state = {
    viwes:{
        game__boardSquare: document.querySelectorAll(".game__board-square"),
        top__scoreCounter: document.getElementById("top__score-counter"),
        timer__timeCounter: document.getElementById("timer__time-counter"),
        lives__liveCounter: document.getElementById("lives__live-counter"),
        screen__endGame: document.getElementById("screen__end-game"),
        final__totalScore: document.getElementById("final__total-score"),
        final__totalLive: document.getElementById("final__total-live"),
    },
    values:{
        randomSquareId: null,
        lastRandomSquareId: null,
        currentPosition: null,
        totalScore: 0,
        gameTime: 59, //considering the 1s as the game starts
        gameLives: 3,
        timeInterval: 2000,
        ralphHitcontroller: true,
    },
    actions:{
        currentTime: setInterval(gameTimeHandler, 1000),
    }
}


let RandomSquareForRalph = () => Math.floor(Math.random() * 9);
let clearSquareClassFocus = () => state.viwes.game__boardSquare.forEach(square =>{ square.classList.remove("game__board-focus"); });

let intervalId = null;
let MoveRalphInsertion = () => {
    //Clear setInterval on click
    intervalId !== null ? clearInterval(intervalId) : "";
    RalphInsertion();
    intervalId = setInterval(RalphInsertion, state.values.timeInterval);
}

let RandomSquareClassInsertion = () => {
    let randomSquare = RandomSquareForRalph();
    let loopControler = randomSquare === state.values.lastRandomSquareId ? true : false;

    //Make sure Ralph won't be at the same square twice in a roll
    while (loopControler) {
        randomSquare = RandomSquareForRalph();
        loopControler = randomSquare === state.values.lastRandomSquareId ? true : false;
    }
    state.viwes.game__boardSquare[randomSquare].classList.add("game__board-focus");
    state.values.lastRandomSquareId = randomSquare;
    state.values.currentPosition = randomSquare;
}   

let RalphInsertionController = true;
let RalphInsertion = () => {
    clearSquareClassFocus();

    //Controlling the life cicle at each time Ralph change square
    if(RalphInsertionController){
        RandomSquareClassInsertion();
        RalphInsertionController = false;
    }else{
        state.values.ralphHitcontroller === true ? lifeHandler() : "";
        RandomSquareClassInsertion();
        state.values.ralphHitcontroller = true;

    }
}

let scoreHandler = (points) =>{
    state.values.totalScore += points;
    state.viwes.top__scoreCounter.innerText = state.values.totalScore;
}

let lifeHandler = () =>{
    if(state.values.gameLives > 0){
        state.values.gameLives -= 1;
        state.viwes.lives__liveCounter.innerText = state.values.gameLives;
    }else{
        state.viwes.lives__liveCounter.innerText = '0';
        
    }
    
}

let audioPlay = (soundName, volume, currentTime) =>{
    let hitSound = new Audio(`./assets/audios/${soundName}`);
    hitSound.volume = volume;
    hitSound.currentTime = currentTime;
    hitSound.play();
}

// Set as a standard function for hoisting function as is 
// being called on const state at the beginning of the file 
function gameTimeHandler () {
        if(state.values.gameTime > -1){
            state.viwes.timer__timeCounter.innerText = state.values.gameTime;
            state.values.gameTime -= 1;
            finalGameHandler();
        }
}

let finalGameHandler = () => {
    if(state.values.gameLives <= 0 || state.values.gameTime === -1){ 
        let screen__endGame = document.getElementById("screen__end-game");
        state.viwes.final__totalScore.innerText = state.values.totalScore;
        state.viwes.final__totalLive.innerText = state.values.gameLives <= 1 ? 0 : state.values.gameLives ;
        screen__endGame.classList.remove("display_none"); 
    }
}

//Handles the visual score feedback for user on click
let handlesScoreVisual = (squareHTML, vald, score) =>{
    let Addscore = `<p class="score-manage score-add">+${score}</p>`;
    let loseScore = `<p class="score-manage score-minus">-${score}</p>`
    vald ? squareHTML.innerHTML = Addscore : squareHTML.innerHTML = loseScore;
}

let handlerCursorMov = (square) => {
    setTimeout(() => {
        square.style.setProperty('cursor', 'url("./assets/images/cursor-hit.svg"), auto');
    }, 5);

    setTimeout(() => {
        square.style.setProperty('cursor', 'url("./assets/images/SVGRepo_iconCarrier.svg"), auto');
    }, 200);

}

//Add logic on square click
let AddListenerForSquare = () => {
    state.viwes.game__boardSquare.forEach((square) => {
        square.addEventListener("click", (event) =>{
            event.stopImmediatePropagation();
            handlerCursorMov(square);

            //Add or subtract points from total score
            //Controll Ralph's position on click
            if(parseInt(square.id) === state.values.currentPosition ){
                state.values.ralphHitcontroller = false;
                handlesScoreVisual(square, true, 10);
                audioPlay("punch-sound.mp3", 0.3, 0.32);
                MoveRalphInsertion();
                scoreHandler(10);
            }else{
                scoreHandler(-10);
                handlesScoreVisual(square, false, 10);
                audioPlay("wrong-sound.mp3", 0.3, 0.1);
            }
        });
    });
};


function main(){
    AddListenerForSquare();
    MoveRalphInsertion();
}

main();

