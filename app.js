const cells = Array.from({ length: 100 });
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
let frogPosition = 95;
let logPositionRight = [80, 81, 70, 71, 50, 51, 52, 23, 24];
let logPositionLeft = [66, 67, 41, 42, 36, 37, 38, 12, 13, 14];
const gridCells = document.querySelectorAll(".cell");
let logInterval;

function startGame() {
  frogPosition = 95;
  logPositionRight = [80, 81, 70, 71, 50, 51, 52, 23, 24]; // defined as an array
  logPositionLeft = [66, 67, 41, 42, 36, 37, 38, 12, 13, 14];
  document.addEventListener("keydown", handleKeydown);
  gridCells[frogPosition].classList.add("frog");
  logPositionRight.forEach((position) =>
    gridCells[position].classList.add("log")
  ); // each posiiton in 'logPosition' is assigned the log class so that both appear when game starts
  // gridCells[logPosition].classList.add("log"); this was just one log
  logPositionLeft.forEach((position) =>
    gridCells[position].classList.add("log")
  );
  logInterval = setInterval(moveLog, 3000);
}

// to add different logs- create new array?

function moveLog() {
  console.log(logPositionRight, frogPosition,logPositionRight.includes(frogPosition) )

  if (logPositionRight.includes(frogPosition)) {
    moveFrogRight();
  } else if (logPositionLeft.includes(frogPosition)) {
    moveFrogLeft();
  }
  logPositionRight = logPositionRight.map((position) => {
    gridCells[position].classList.remove("log"); // this removes the logs from their positions.
    position = position % 10 === 9 ? position - 9 : position + 1;

    // if log is at right edge -9 so it is moved to the left.
    //if not at right edge, +1 to move one cell to the right
    return position;
  });

  logPositionLeft = logPositionLeft.map((position) => {
    gridCells[position].classList.remove("log");
    position = position % 10 === 9 ? position + 9 : position - 1;
    return position;
  });

  logPositionRight.forEach((position) =>
    gridCells[position].classList.add("log")
  ); // this adds the logs to the new position.
  logPositionLeft.forEach((position) =>
    gridCells[position].classList.add("log")
  );


  checkIfFrogIsOnEdge();
}

// function moveLog() {
//   if (logPosition % 10 === 9) {
//     gridCells[logPosition].classList.remove("log");
//     logPosition = 10;
//     gridCells[logPosition].classList.add("log");
//   } else {
//     gridCells[logPosition].classList.remove("log");
//     if (frogPosition === logPosition) {
//       moveFrogRight();
//     }
//     logPosition = logPosition + 1;
//     gridCells[logPosition].classList.add("log");
//   }
//   checkIfFrogIsOnEdge();
// }

function checkIfFrogIsOnLog() {
  console.log("frogPosition", frogPosition);

  const frogIsInWater =
    !logPositionRight.includes(frogPosition) &&
    !logPositionLeft.includes(frogPosition) &&
    frogPosition >= 10 &&
    frogPosition <= 89;

  console.log("frogIsInWater", frogIsInWater);

  if (frogIsInWater) {
    endGame();
  } else {
    checkForWin();
  }
}

function checkIfFrogIsOnEdge() {
  const frogIsOnEdge =
    logPositionLeft.includes(frogPosition) ||
    (logPositionRight.includes(frogPosition) && frogPosition % 10 === 9);
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
