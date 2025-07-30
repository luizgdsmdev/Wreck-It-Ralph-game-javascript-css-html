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
    }
}

let RandomSquareForRalph = () => Math.floor(Math.random() * 9);
let clearSquareClassFocus = () => state.viwes.game__boardSquare.forEach(square =>{ square.classList.remove("game__board-focus"); });
let MoveRalphInsertion = () => state.values.randomSquareId = setInterval(RalphInsertion, 2000);

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

let RalphInsertion = () => {
    clearSquareClassFocus();
    RandomSquareClassInsertion();
}

let scoreHandler = (points) =>{
    state.values.totalScore += points;
    state.viwes.top__scoreCounter.innerText = state.values.totalScore;
}





let AddListenerForSquare = () => {
    state.viwes.game__boardSquare.forEach((square) => {
        square.addEventListener("click", (event) =>{
            event.stopImmediatePropagation();
            
            if(parseInt(square.id) === state.values.currentPosition){
                scoreHandler(10);
            }else{
                scoreHandler(-10);
            }
            
        });
    });
};

function main(){
AddListenerForSquare();
RandomSquareForRalph();
MoveRalphInsertion();
}

main();

