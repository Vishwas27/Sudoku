// Sudoku board (0 represents an empty cell)
const initialBoard = [
    [0, 0, 0, 0, 7, 5, 9, 4, 3],
    [4, 2, 3, 0, 6, 0, 0, 1, 5],
    [9, 0, 7, 0, 0, 0, 0, 0, 8],
    [3, 0, 1, 7, 0, 0, 0, 0, 0],
    [0, 0, 0, 5, 0, 0, 0, 8, 4],
    [6, 4, 5, 0, 1, 9, 2, 3, 0],
    [0, 0, 0, 0, 8, 0, 0, 0, 9],
    [0, 0, 9, 0, 0, 7, 0, 6, 0],
    [0, 0, 8, 6, 0, 0, 0, 5, 2]
  ];

  const solutionBoard = [
    [8, 1, 6, 2, 7, 5, 9, 4, 3],
    [4, 2, 3, 9, 6, 8, 7, 1, 5],
    [9, 5, 7, 3, 4, 1, 6, 2, 8],
    [3, 8, 1, 7, 2, 4, 5, 9, 6],
    [7, 9, 2, 5, 3, 6, 1, 8, 4],
    [6, 4, 5, 8, 1, 9, 2, 3, 7],
    [5, 6, 4, 1, 8, 2, 3, 7, 9],
    [2, 3, 9, 4, 5, 7, 8, 6, 1],
    [1, 7, 8, 6, 9, 3, 4, 5, 2]
  ];
  
  function createBoard(board) {
    const table = document.getElementById('sudoku-board');
    for (let i = 0; i < 9; i++) {
      const row = table.insertRow(i);
      for (let j = 0; j < 9; j++) {
        const cell = row.insertCell(j);
        const value = board[i][j];
        if (value !== 0) {
          cell.innerHTML = value;
          cell.classList.add('initial');
        } else {
          const input = document.createElement('input');
          input.type = 'text';
          input.maxLength = 1;
          input.addEventListener('input', validateInput);
          cell.appendChild(input);
        }
      }
    }
  }
  
  function validateInput() {
    const inputs = document.querySelectorAll('input');
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.disabled = !isBoardComplete(inputs) || hasInvalidInput(inputs);
  }
  
  function isBoardComplete(inputs) {
    return Array.from(inputs).every((input) => input.value !== '');
  }
  
  function hasInvalidInput(inputs) {
    return Array.from(inputs).some((input) => input.classList.contains('invalid'));
  }
  
  function checkSolution() {
    const inputs = document.querySelectorAll('input');
    const isCorrect = isBoardComplete(inputs) 
    && !hasInvalidInput(inputs) && isSudokuCorrect(inputs);
  
    if (isCorrect) {
      document.getElementById('result').innerText = 'You WIN!';
   ;
    } else {
      document.getElementById('result').innerText = 'Keep going!';
    }
  }
  
  function isSudokuCorrect(inputs) {
    let inputIndex = 0;  // To keep track of the index in the NodeList

    // Copy the values from initialBoard
    const currentBoard = initialBoard.map(row => row.slice());
  
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        // Update 0 values with the numbers from the inputs NodeList
        if (currentBoard[i][j] === 0) {
          const inputValue = parseInt(inputs[inputIndex++].value) || 0;
          currentBoard[i][j] = inputValue;
        }
      }
    }
  
    console.log(currentBoard)
    console.log(initialBoard)
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] !== solutionBoard[i][j]) {
          console.log("NOT solved")


          return false;
        }
      }
    }
    console.log("solved")
 // <-- Set it to block
        // highlightCells(vertical,horizontal);
        highlightCells(2,0);
        highlightCells(3,0);
        highlightCells(4,0);
        highlightCells(2,8);
        highlightCells(3,8);
        highlightCells(4,8);

        highlightCells(1,1);
        highlightCells(5,1);
        highlightCells(1,7);
        highlightCells(5,7);

        highlightCells(0,2);
        highlightCells(6,2);
        highlightCells(0,6);
        highlightCells(6,6);

        highlightCells(1,3);
        highlightCells(7,3);
        highlightCells(1,5);
        highlightCells(7,5);

        highlightCells(2,4);
        highlightCells(8,4);
    triggerAnimation();


    return true;
  }

  function triggerAnimation() {
    const animationBox = document.getElementById('YES_NO');
    const animationBox2 = document.getElementById('PANDA_CUTE');

    var T = document.getElementById("flip-card-back");
    T.style.display = "block"; 

    animationBox.classList.add('swing-in-bottom-fwd'); 
     // Add your animation class
      
    animationBox2.classList.add('vibrate-1'); 
  }


  function clearAllInputs() {
    const inputs = document.querySelectorAll('input');
  
    inputs.forEach((input) => {
      input.value = '';
      input.classList.remove('invalid');
    });
  
    document.getElementById('result').innerText = '';
    document.getElementById('submit-btn').disabled = true;

  }
  
  createBoard(initialBoard);


  // FUNCTION FOR PANDA

// get both pupils
const pupils = document.querySelectorAll(".eye .pupil");
window.addEventListener("mousemove", (e) => {
  pupils.forEach((pupil) => {
    // get x and y postion of cursor
    var rect = pupil.getBoundingClientRect();
    var x = (e.pageX - rect.left) / 50 + "px";
    var y = (e.pageY - rect.top) / 50 + "px";
    pupil.style.transform = "translate3d(" + x + "," + y + ", 0px)";
  });
});


function highlightCells(row, col) {
  const table = document.getElementById('sudoku-board');

  if (table.rows[row] && table.rows[row].cells[col]) {
    const cell = table.rows[row].cells[col];

    // Resetting the border color to the default
    cell.style.border = '1px solid black';

    // Set the background color to red
    cell.style.backgroundColor = 'red';

    // If there's an input inside the cell, set its background color to red
    const input = cell.querySelector('input');
    if (input) {
      input.style.backgroundColor = 'red';
    }
  }

}

function showAnotherBox(show) {

  if (show) {
    document.querySelectorAll(".FINAL").forEach(a=>a.style.display = "initial");  // Make the box visible
  } 
}
