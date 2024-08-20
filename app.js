const cells = Array.from({ length: 100 });
const gridElement = document.querySelector(".grid");
const soundtrack = document.getElementById("olaf-soundtrack");

cells.forEach((cell, index) => {
  const cellElement = document.createElement("div");
  cellElement.classList.add("cell");
  // cellElement.textContent = index;
  gridElement.appendChild(cellElement);
});

// to restart game when losing or winning
// create a function to start the game which includes creating grid + frog/logPositions & logInterval
// i can then call this @endGame & @checkForWin
let frogPosition = 95;
let logPositionRight = [50, 51, 52, 25, 26, 36, 37, 38];
let logPositionLeft = [66, 67, 41, 42];
let carPositionRight = [80, 86, 11, 16];
let carPositionLeft = [72, 75];
const gridCells = document.querySelectorAll(".cell");
let logInterval;

function startGame() {
  frogPosition = 95;
  logPositionRight = [50, 51, 52, 25, 26, 36, 37, 38]; // defined as an array
  logPositionLeft = [66, 67, 41, 42];
  carPositionRight = [80, 86, 11, 16];
  carPositionLeft = [72, 75];

  document.addEventListener("keydown", handleKeydown);
  gridCells[frogPosition].classList.add("frog");

  logPositionRight.forEach((position) =>
    gridCells[position].classList.add("log")
  ); // each posiiton in 'logPosition' is assigned the log class so that both appear when game starts
  // gridCells[logPosition].classList.add("log"); this was just one log
  logPositionLeft.forEach((position) =>
    gridCells[position].classList.add("log")
  );
  carPositionRight.forEach((position) =>
    gridCells[position].classList.add("car")
  );
  carPositionLeft.forEach((position) =>
    gridCells[position].classList.add("car")
  );
  logInterval = setInterval(moveLog, 3000);
  carInterval = setInterval(moveCars, 1000);

  // Correct way to select cells and add IDs or classes
  const cellsWithLogs = document.querySelectorAll(".grid .cell");

  cellsWithLogs.forEach((cell, index) => {
    if (index >= 20 && index <= 69) {
      // Using class for multiple cells
      cell.classList.add("special-background");
    }
  });
}

// to add different logs- create new array?

function moveLog() {
  console.log(
    logPositionRight,
    frogPosition,
    logPositionRight.includes(frogPosition)
  );

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
    position = position % 10 === 0 ? position + 9 : position - 1;
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

function moveCars() {
  carPositionRight = carPositionRight.map((position) => {
    gridCells[position].classList.remove("car"); // this removes the car from their positions.

    position = position % 10 === 9 ? position - 9 : position + 1;

    // if log is at right edge -9 so it is moved to the left.
    //if not at right edge, +1 to move one cell to the right
    if (position === frogPosition) {
      endGame();
    }

    return position;
  });

  carPositionLeft = carPositionLeft.map((position) => {
    gridCells[position].classList.remove("car");
    position = position % 10 === 0 ? position + 9 : position - 1;

    if (position === frogPosition) {
      endGame();
    }

    return position;
  });

  carPositionRight.forEach((position) =>
    gridCells[position].classList.add("car")
  ); // this adds the logs to the new position.
  carPositionLeft.forEach((position) =>
    gridCells[position].classList.add("car")
  );
}

function checkIfFrogIsOnLog() {
  console.log("frogPosition", frogPosition);

  const frogIsInWater =
    !logPositionRight.includes(frogPosition) &&
    !logPositionLeft.includes(frogPosition) &&
    frogPosition >= 10 &&
    frogPosition <= 69;

  console.log("frogIsInWater", frogIsInWater);

  if (frogIsInWater) {
    endGame();
  } else {
    checkForWin();
  }
}

function checkIfFrogIsOnEdge() {
  const frogIsOnEdge =
    (logPositionLeft.includes(frogPosition) && frogPosition % 10 === 0) ||
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
    clearInterval(carInterval);
    setTimeout(() => {
      alert("You have won!");
    }, 100);
  }
}

function checkFrogHitCar() {
  const frogIsOnRoad =
    carPositionRight.includes(frogPosition) ||
    (carPositionLeft.includes(frogPosition) &&
      frogPosition >= 70 &&
      frogPosition <= 89);

  console.log("frogIsOnRoad", frogIsOnRoad);

  if (frogIsOnRoad) {
    endGame();
  } else {
    checkForWin();
  }
}

function endGame() {
  // document.removeEventListener("keydown", handleKeydown);

  setTimeout(() => {
    gridCells.forEach((cell) => cell.classList.remove("frog", "log", "car"));
    frogPosition = 95;
    gridCells[frogPosition].classList.add("frog");
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
  soundtrack.play();

  if (event.key === "ArrowDown" && !(frogPosition >= 90)) {
    moveFrogDown();
  } else if (event.key === "ArrowUp" && !(frogPosition <= 9)) {
    moveFrogUp();
  } else if (event.key === "ArrowLeft" && !(frogPosition % 10 === 0)) {
    moveFrogLeft();
  } else if (event.key === "ArrowRight" && !(frogPosition % 10 === 9)) {
    moveFrogRight();
  }

  checkIfFrogIsOnLog();
  checkFrogHitCar();
}

document.addEventListener("DOMContentLoaded", startGame);
