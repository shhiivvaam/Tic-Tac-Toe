const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// creating a function to initialize the game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // ui par boxes empty kr rhe hai
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        // one more thing is missing - find   { Green Color BackGround se Hatana Hoga -> After the Game is Over}
        // simply apply all the default CSS Properties

        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();


boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        handleClick(index);
    });
});

function handleClick(index) {
    // Placing the Inital Current Player
    if(gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;

        // not very Important  { simply we are applying diabling cursor: pointer; where we have filled the values }
        boxes[index].style.pointerEvents = "none";            

        // swapping the turn between the players
        swapTurn();

        // checking if the Game has Ended or Not(i.e, is there any winner after the turn or not)
        checkGameOver();
    }
}

function swapTurn(){
    if(currentPlayer === "X") currentPlayer = "O";
    else currentPlayer = "X";

    gameInfo.innerText = `CurrentPlayer - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    // all the three boxes are non-empty and contains exactly the same value or the same Player
    winningPositions.forEach((position) => {
        if(
            (gameGrid[position[0]] != "" && gameGrid[position[1]] != "" && gameGrid[position[2]] != "")
            && 
            (gameGrid[position[0]] == gameGrid[position[1]] && gameGrid[position[1]] == gameGrid[position[2]])
        ) {
            if(gameGrid[position[0]] == "X") answer = "X";
            else answer = "O";

            // disbale pointer events -> To prevent mouse from clicking to the box
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know who is winner in X or O and the answer is stored in the answer variable
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }

        // if we have reached hers, it means we have found the winner
        if(answer != "") {
            gameInfo.innerText = `Winner Player - ${currentPlayer}`;
            newGameBtn.classList.add("active");
            return;
        }

        // if we have reached here, it means that there is no winner
        // ans possibly there is a posiibility of the game being a TIE

        let fillCount = 0;
        gameGrid.forEach((box) => {
            if(box != "") fillCount++;
        })

        if(fillCount === 9) {
            gameInfo.innerText = "Game Tied !";
            newGameBtn.classList.add("active");
        }
    });
}

newGameBtn.addEventListener("click", initGame);