const cells = Array.from({ length: 30 });
const gridElement = document.querySelector(".grid");
cells.forEach((cell, index) => {
  const cellElement = document.createElement("div");
  cellElement.classList.add("cell");
  cellElement.textContent = index;
  gridElement.appendChild(cellElement);
});


const gridCells = document.querySelectorAll(".cell");

let frogPosition = 25;

let logPosition = 10;

gridCells[frogPosition].classList.add("frog");
gridCells[logPosition].classList.add("log");




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
}

let logInterval = setInterval(moveLog, 1000);

function checkIfFrogIsOnLog() {
  const frogIsInWater =
    frogPosition !== logPosition && frogPosition >= 10 && frogPosition <= 19;

  if (frogIsInWater) {
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
    }, 0);
  }
}
function endGame() {
  clearInterval(logInterval);
  document.removeEventListener("keydown", handleKeydown);
  setTimeout(() => {
    alert("You have lost!");
  }, 0);
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




document.addEventListener("keydown", handleKeydown);


