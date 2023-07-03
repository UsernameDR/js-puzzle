const cells = [...document.querySelectorAll('td')]

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue
  }
  return array;
}

function setCells() {
  console.log('loaded');
  const numbers = [...Array(15).keys()].map(x => x + 1);
  numbers.push('');
  shuffle(numbers);
  cells.forEach( (cell, index) => {
    cell.textContent = numbers[index];
    if (cell.textContent === '') {
      cell.classList.add('empty');
    }
  })
}

setCells();

const cellPos = (cell) => {
  return [cell.cellIndex, cell.parentElement.rowIndex];
}

const isNeighbour = (cell1, cell2) => {
  if ((cell1[0] === cell2[0] && Math.abs(cell1[1] - cell2[1]) === 1) ||
      (cell1[1] === cell2[1] && Math.abs(cell1[0] - cell2[0]) === 1)) {
    return true;
  }
  return false
}

const moveCells = (cell, empty) => {
  empty.textContent = cell.textContent;
  cell.textContent = '';
  empty.classList.remove('empty');
  cell.classList.add('empty');
}

const winningCondition = () => {
  newCells = [...document.querySelectorAll('td')]
  for (let index = 0; index < newCells.length - 1; index++) {
    const element = newCells[index];
    if (parseInt(element.textContent) != index + 1) {
      return false;
    }
  }
  return true;
}

const displayWin = () => {
  window.alert('You win!');
  cells.forEach( tile => {tile.removeEventListener('click', checkMove);tile.classList.add('win')})
}

const checkMove = (event) => {
  const clickedCell = event.target;
  const emptyCell = document.querySelector('.empty');
  if (isNeighbour(cellPos(clickedCell), cellPos(emptyCell))) {
    moveCells(clickedCell, emptyCell);
    if (winningCondition()) {
      window.setTimeout(displayWin, 30);
      // need 10 sec delay to allow the last move to be displayed
    };
  }
}

cells.forEach( tile => tile.addEventListener('click', checkMove))


document.querySelector("#show-hint").addEventListener("click", (event) => {
  document.querySelector(".hint").classList.toggle("active");
});
