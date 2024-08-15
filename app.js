const cells = Array.from({ length: 30 });

const gridElement = document.querySelector(".grid");

cells.forEach((cell, index) => {
  const cellElement = document.createElement("div");
  cellElement.classList.add("cell");
  cellElement.textContent = index;
  gridElement.appendChild(cellElement);
});

// everything below talks about the cells that we can see on the screen

const gridCells = document.querySelectorAll(".cell");

// Create and move the frog

// create the frog position. 
let frogPosition= 25
// create log position
let logPosition = 10


gridCells[frogPosition].classList.add("frog")
gridCells[logPosition].classList.add("log")


//Set Interval

function moveLog() {
  if ( logPosition %10 ===9 ){
    gridCells[logPosition].classList.remove('log') 
    logPosition = 10
    gridCells[logPosition].classList.add('log')
  } else {
    gridCells[logPosition].classList.remove('log')
  logPosition= logPosition +1
  gridCells[logPosition].classList.add('log')
  }
  }
  
  let logInterval = setInterval(moveLog, 1000);
  

function checkIfFrogIsOnLog () {
if (frogPosition !== logPosition && frogPosition >=10 &&  frogPosition <=19  ) {
clearInterval(logInterval)
}


  console.log(`frog is on the log ${frogPosition===logPosition}`)
  // the same as "frog is on the log" + frogPosition===logPosition

}

function handleKeydown(event){
  if (event.key === "ArrowDown" && !(frogPosition >= 20)){
    gridCells[frogPosition].classList.remove('frog')
    frogPosition= frogPosition +10
    gridCells[frogPosition].classList.add('frog')
  }
  else if (event.key === "ArrowUp" && !(frogPosition <= 9)){
    gridCells[frogPosition].classList.remove('frog')
    frogPosition= frogPosition -10
    gridCells[frogPosition].classList.add('frog')
  }
  else if (event.key === "ArrowLeft" && !(frogPosition%10===0)){
    gridCells[frogPosition].classList.remove('frog')
    frogPosition=frogPosition -1
    gridCells[frogPosition].classList.add('frog')
  }

  else if (event.key ==="ArrowRight" && !(frogPosition%10 ===9)){
    gridCells[frogPosition].classList.remove('frog')
    frogPosition= frogPosition +1
    gridCells[frogPosition].classList.add('frog')
  }
 
checkIfFrogIsOnLog()

// checkForWin() if frog Position is between 0 and 9 then you've won. 

} 
document.addEventListener('keydown', handleKeydown)

