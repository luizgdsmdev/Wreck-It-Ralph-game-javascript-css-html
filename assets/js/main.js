const state = {
    viwes:{
        game__boardSquare: document.querySelectorAll(".game__board-square"),
        timer__timeCounter: document.querySelectorAll(".timer__time-counter"),
        top__scoreCounter: document.querySelectorAll(".top__score-counter"),
        lives__liveCounter: document.querySelectorAll(".lives__live-counter")
    },
    values:{
        randomSquareId: null,
        lastRandomSquareId: null,
    }
}

let RandomSquareForRalph = () => Math.floor(Math.random() * 9);

let clearSquareClassFocus = () => state.viwes.game__boardSquare.forEach(square =>{ square.classList.remove("game__board-focus"); });

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
    
}   


let ralphInsertion = () =>{
    clearSquareClassFocus();
    RandomSquareClassInsertion();
}

function moveRalphInsertion(){
    state.values.randomSquareId = setInterval(ralphInsertion, 1000);
}



function AddListenerForSquare(){
    state.viwes.game__boardSquare.forEach((square) => {
        square.addEventListener("click", (event) =>{
            event.stopImmediatePropagation();
            
            
        });
    });
};

function main(){
AddListenerForSquare();
RandomSquareForRalph();
moveRalphInsertion();
}

main();

