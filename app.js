const cells = Array.from({ length: 30 });
const gridElement = document.querySelector(".grid");

cells.forEach((cell, index) => {
  const cellElement = document.createElement("div");
  cellElement.classList.add("cell");
  cellElement.textContent = index;
  gridElement.appendChild(cellElement);
});

// to restart game when losing or winning
// create a function to start the game which includes creating grid + frog/logPositions & logInterval
// i can then call this @endGame & @checkForWin
let frogPosition = 25;
let logPosition = 10;
const gridCells = document.querySelectorAll(".cell");
let logInterval;

function startGame() {
  frogPosition = 25;
  logPosition = 10;
  document.addEventListener("keydown", handleKeydown);
  gridCells[frogPosition].classList.add("frog");
  gridCells[logPosition].classList.add("log");
  logInterval = setInterval(moveLog, 1000);
}

function moveLog() {
  if (logPosition % 10 === 9) {
    gridCells[logPosition].classList.remove("log");
    logPosition = 10;
    gridCells[logPosition].classList.add("log");
  } else {
    gridCells[logPosition].classList.remove("log");
    if (frogPosition === logPosition) {
      moveFrogRight();
    }
    logPosition = logPosition + 1;
    gridCells[logPosition].classList.add("log");
  }
  checkIfFrogIsOnEdge();
}

function checkIfFrogIsOnLog() {
  const frogIsInWater =
    frogPosition !== logPosition && frogPosition >= 10 && frogPosition <= 19;

  if (frogIsInWater) {
    endGame();
  } else {
    checkForWin();
  }
}

function checkIfFrogIsOnEdge() {
  const frogIsOnEdge = frogPosition === logPosition && frogPosition % 10 === 9;
  if (frogIsOnEdge) {
    endGame();
  } else {
    checkForWin();
  }
}

function checkForWin() {
  if (frogPosition <= 9) {
    clearInterval(logInterval);
    setTimeout(() => {
      alert("You have won!");
    }, 100);
  }
}
function endGame() {
  clearInterval(logInterval);
  document.removeEventListener("keydown", handleKeydown);

  setTimeout(() => {
    gridCells.forEach((cell) => cell.classList.remove("frog", "log"));
    const playAgain = prompt("Play again? Y");
    console.log(playAgain);
    // if user want to play again then start game if not then display thanks
    if (playAgain === "Y" || playAgain === "y") {
      startGame();
    } else {
      alert("Thanks for Playing!");
      console.log("Thanks for playing!");
    }
  }, 500);
}

function moveFrogUp() {
  gridCells[frogPosition].classList.remove("frog");
  frogPosition = frogPosition - 10;
  gridCells[frogPosition].classList.add("frog");
}

function moveFrogDown() {
  gridCells[frogPosition].classList.remove("frog");
  frogPosition = frogPosition + 10;
  gridCells[frogPosition].classList.add("frog");
}

function moveFrogLeft() {
  gridCells[frogPosition].classList.remove("frog");
  frogPosition = frogPosition - 1;
  gridCells[frogPosition].classList.add("frog");
}

function moveFrogRight() {
  gridCells[frogPosition].classList.remove("frog");
  frogPosition = frogPosition + 1;
  gridCells[frogPosition].classList.add("frog");
}
// moves the frog using Arrowkeys
async function handleKeydown(event) {
  if (event.key === "ArrowDown" && !(frogPosition >= 20)) {
    moveFrogDown();
  } else if (event.key === "ArrowUp" && !(frogPosition <= 9)) {
    moveFrogUp();
  } else if (event.key === "ArrowLeft" && !(frogPosition % 10 === 0)) {
    moveFrogLeft();
  } else if (event.key === "ArrowRight" && !(frogPosition % 10 === 9)) {
    moveFrogRight();
  }

  checkIfFrogIsOnLog();
}

document.addEventListener("DOMContentLoaded", startGame);
