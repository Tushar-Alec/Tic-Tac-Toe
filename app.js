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
  
  const Player = (name, marker) => {
    return { name, marker };
  };

  
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
          console.log("Game over! Restart to play again.");
          return;
        }

   const success = Gameboard.updateCell(index, currentPlayer.marker);
    if (!success) {
      console.log("Cell already taken!");
      return;
    }

    printBoard();

    if (checkWin()) {
        console.log(`${currentPlayer.name} wins!`);
        gameOver = true;
      } else if (checkTie()) {
        console.log("It's a tie!");
        gameOver = true;
      } else {
        switchPlayer();
        console.log(`Next turn: ${currentPlayer.name}`);
      }
    };

    const checkWin = () => {
        const b = Gameboard.getBoard();
        const winPatterns = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
          [0, 4, 8], [2, 4, 6]             // diags
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
        console.log("Game restarted!");
        printBoard();
      };

      const printBoard = () => {
        const b = Gameboard.getBoard();
        console.log(`
         ${b[0] || 0} | ${b[1] || 1} | ${b[2] || 2}
        -----------
         ${b[3] || 3} | ${b[4] || 4} | ${b[5] || 5}
        -----------
         ${b[6] || 6} | ${b[7] || 7} | ${b[8] || 8}
        `);
      };
    
      return { playRound, restart };
    })();