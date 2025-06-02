const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const updateCell = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker;
        return true;
      }
      return false;
    };
  
    const reset = () => {
      board = ["", "", "", "", "", "", "", "", ""];
    };
  
    return { getBoard, updateCell, reset };
  })();
  
  const Player = (name, marker) => ({ name, marker });
  
  const GameController = (function () {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
  
    let currentPlayer = player1;
    let gameOver = false;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const playRound = (index) => {
      if (gameOver) {
        DisplayController.showMessage("Game over! Restart to play again.");
        return;
      }
  
      const success = Gameboard.updateCell(index, currentPlayer.marker);
      if (!success) {
        DisplayController.showMessage("That spot is already taken!");
        return;
      }
  
      if (checkWin()) {
        DisplayController.showMessage(`${currentPlayer.name} wins!`);
        gameOver = true;
      } else if (checkTie()) {
        DisplayController.showMessage("It's a tie!");
        gameOver = true;
      } else {
        switchPlayer();
        DisplayController.showMessage(`Next turn: ${currentPlayer.name}`);
      }
  
      DisplayController.render(); 
    };
  
    const checkWin = () => {
      const b = Gameboard.getBoard();
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      return winPatterns.some(pattern =>
        pattern.every(index => b[index] === currentPlayer.marker)
      );
    };
  
    const checkTie = () => {
      return Gameboard.getBoard().every(cell => cell !== "");
    };
  
    const restart = () => {
      Gameboard.reset();
      currentPlayer = player1;
      gameOver = false;
      DisplayController.showMessage("Game restarted! Player 1's turn.");
      DisplayController.render();
    };
  
    return { playRound, restart };
  })();
  
  const DisplayController = (function () {
    const boardContainer = document.getElementById("gameboard");
    const messageEl = document.getElementById("message");
    const restartBtn = document.getElementById("restart");
  
    const render = () => {
      boardContainer.innerHTML = "";
      const board = Gameboard.getBoard();
  
      board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => {
          GameController.playRound(index);
        });
        boardContainer.appendChild(cellDiv);
      });
    };
  
    const showMessage = (msg) => {
      messageEl.textContent = msg;
    };
  
    restartBtn.addEventListener("click", () => {
      GameController.restart();
    });
  
    return { render, showMessage };
  })();

  document.addEventListener("DOMContentLoaded", () => {
    DisplayController.render();
    DisplayController.showMessage("Welcome! Player 1 starts.");
  });
  