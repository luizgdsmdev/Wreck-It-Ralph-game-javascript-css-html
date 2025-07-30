const state = {
    viwes:{
        game__boardSquare: document.querySelectorAll(".game__board-square"),
        top__scoreCounter: document.getElementById("top__score-counter"),
        timer__timeCounter: document.getElementById("imer__time-counter"),
        lives__liveCounter: document.getElementById("lives__live-counter"),
    },
    values:{
        randomSquareId: null,
        lastRandomSquareId: null,
        currentPosition: null,
        totalScore: 0,
        gameTime: 0,
        gameLives: 3,
        timeForChange: 2000,
        ralphHitcontroller: true,
    }
}

let RandomSquareForRalph = () => Math.floor(Math.random() * 9);
let clearSquareClassFocus = () => state.viwes.game__boardSquare.forEach(square =>{ square.classList.remove("game__board-focus"); });

let intervalId = null;
let MoveRalphInsertion = () => {
    //Clear setInterval on click
    intervalId !== null ? clearInterval(intervalId) : "";
    RalphInsertion();
    intervalId = setInterval(RalphInsertion, state.values.timeForChange);
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
    if(state.values.gameLives > 1){
        state.values.gameLives -= 1;
        state.viwes.lives__liveCounter.innerText = state.values.gameLives;
    }else{
        state.viwes.lives__liveCounter.innerText = '0';
        alert("Game over");
    }
    
}

//Add logic on square click
let AddListenerForSquare = () => {
    state.viwes.game__boardSquare.forEach((square) => {
        square.addEventListener("click", (event) =>{
            event.stopImmediatePropagation();
            
            //Add or subtract points from total score
            //Controll Ralph's position on click
            if(parseInt(square.id) === state.values.currentPosition ){
                state.values.ralphHitcontroller = false;
                MoveRalphInsertion();
                scoreHandler(10);
            }else{
                scoreHandler(-10);
            }

        });
    });
};

function main(){
AddListenerForSquare();
MoveRalphInsertion();
}

main();

