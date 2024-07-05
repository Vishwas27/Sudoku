function solveSudoku() {
  const inputs = document.querySelectorAll('input');
  const currentBoard = Array.from(inputs).map((input) => parseInt(input.value) || 0);

  if (solveSudokuRecursive(currentBoard)) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        inputs[i * 9 + j].value = currentBoard[i * 9 + j];
      }
    }

    document.getElementById('result').innerText = 'Sudoku Solved!';
  } else {
    document.getElementById('result').innerText = 'No solution found.';
  }

  document.getElementById('submit-btn').disabled = true;
}

function solveSudokuRecursive(board) {
  const emptyCell = findEmptyCell(board);

  if (!emptyCell) {
    return true; // Sudoku is solved
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      board[row * 9 + col] = num;

      if (solveSudokuRecursive(board)) {
        return true;
      }

      board[row * 9 + col] = 0; // Backtrack
    }
  }

  return false; // No solution found
}

function findEmptyCell(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i * 9 + j] === 0) {
        return [i, j];
      }
    }
  }
  return null; // No empty cell found
}

function isValidMove(board, row, col, num) {
  return (
    !isInRow(board, row, num) &&
    !isInCol(board, col, num) &&
    !isInBox(board, row - (row % 3), col - (col % 3), num)
  );
}

function isInRow(board, row, num) {
  for (let col = 0; col < 9; col++) {
    if (board[row * 9 + col] === num) {
      return true;
    }
  }
  return false;
}

function isInCol(board, col, num) {
  for (let row = 0; row < 9; row++) {
    if (board[row * 9 + col] === num) {
      return true;
    }
  }
  return false;
}

function isInBox(board, startRow, startCol, num) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[(startRow + i) * 9 + startCol + j] === num) {
        return true;
      }
    }
  }
  return false;
}
