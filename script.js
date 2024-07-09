const visualConsole = document.querySelector(".console");
const buttons = document.querySelectorAll("#gridbutton");
const result = document.querySelector(".result");
const turnText = document.querySelector(".turn");
const replayButton = document.querySelector(".replay");

function Gameboard  () {
    const rows = 3;
    const columns = 3;
    const board = []; //Create empty array for rows

    for(i = 0; i < rows; i++) {
        board[i] = []; //Create empty array for columns

        for(j = 0; j < columns; j++) {
            board[i].push(Cell()); //Push cells into each empty array slot
        }
    }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        return boardWithCellValues;
    };
    
    const placeToken = (row, column, player) => {
        board[row][column].addToken(player);    
    };

    return { getBoard, placeToken, printBoard };
}

function Cell () {
    let value = 0;

    const addToken = (player) => {
        value = player;
    };

    const getValue = () => value;

    return { addToken, getValue };
}

function GameplayLoop (playerOneName = "Player One",
                       playerTwoName = "Player Two") {
    const board = Gameboard();
    let gameRunning = true;
    replayButton.style.visibility = "hidden";

    const players = [
        {
            name: playerOneName,
            token: 1
        },
        {
            name: playerTwoName,
            token: 2
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        turnText.innerText = `It's ${getActivePlayer().name}'s turn`;
    };

    const getActivePlayer = () => activePlayer;

    turnText.innerText = `It's ${getActivePlayer().name}'s turn`;

    function GetGridCoords(index) {
        if(index === 0) return [0,0];
        if(index === 1) return [1,0];
        if(index === 2) return [2,0];
        if(index === 3) return [0,1];
        if(index === 4) return [1,1];
        if(index === 5) return [2,1];
        if(index === 6) return [0,2];
        if(index === 7) return [1,2];
        if(index === 8) return [2,2];
    }

    const UpdateButtons = () => {
        buttons.forEach(btn => {
            if(board.getBoard()
                [GetGridCoords(parseInt(btn.className))[0]]
                [GetGridCoords(parseInt(btn.className))[1]]
                .getValue() === 0) {
                
                    btn.innerText = "";
            }
            else if(board.getBoard()
                [GetGridCoords(parseInt(btn.className))[0]]
                [GetGridCoords(parseInt(btn.className))[1]]
                .getValue() === 1) {

                    btn.innerText = "O";
            }
            else {
                btn.innerText = "X";
            }            
        });
    };

    function checkForWinner() {
        //Columns Checks
        if(board.getBoard()[0][0].getValue() != 0
            && board.getBoard()[0][0].getValue() == board.getBoard()[0][1].getValue()
            && board.getBoard()[0][0].getValue() == board.getBoard()[0][2].getValue()) {
            
                result.innerText = `${getActivePlayer().name} wins!`;
                gameRunning = false;
        } else if (board.getBoard()[1][0].getValue() != 0
        && board.getBoard()[1][0].getValue() == board.getBoard()[1][1].getValue()
        && board.getBoard()[1][0].getValue() == board.getBoard()[1][2].getValue()) {
            
            result.innerText = `${getActivePlayer().name} wins!`;
                gameRunning = false;
        } else if (board.getBoard()[2][0].getValue() != 0
        && board.getBoard()[2][0].getValue() == board.getBoard()[2][1].getValue()
        && board.getBoard()[2][0].getValue() == board.getBoard()[2][2].getValue()) {
            
            result.innerText = `${getActivePlayer().name} wins!`;
                gameRunning = false;
        }
        //Rows Checks
        else if (board.getBoard()[0][0].getValue() != 0
        && board.getBoard()[0][0].getValue() == board.getBoard()[1][0].getValue()
        && board.getBoard()[0][0].getValue() == board.getBoard()[2][0].getValue()) {
            
            result.innerText = `${getActivePlayer().name} wins!`;
                gameRunning = false;
        } else if (board.getBoard()[0][1].getValue() != 0
        && board.getBoard()[0][1].getValue() == board.getBoard()[1][1].getValue()
        && board.getBoard()[0][1].getValue() == board.getBoard()[2][1].getValue()) {
            
            result.innerText = `${getActivePlayer().name} wins!`;
                gameRunning = false;
        } else if (board.getBoard()[0][2].getValue() != 0
        && board.getBoard()[0][2].getValue() == board.getBoard()[1][2].getValue()
        && board.getBoard()[0][2].getValue() == board.getBoard()[2][2].getValue()) {
            
            result.innerText = `${getActivePlayer().name} wins!`;
                gameRunning = false;
        }
        //Diagonal Checks
        else if (board.getBoard()[0][0].getValue() != 0
        && board.getBoard()[0][0].getValue() == board.getBoard()[1][1].getValue()
        && board.getBoard()[0][0].getValue() == board.getBoard()[2][2].getValue()) {
            
            result.innerText = `${getActivePlayer().name} wins!`;
                gameRunning = false;
        } else if (board.getBoard()[0][2].getValue() != 0
        && board.getBoard()[0][2].getValue() == board.getBoard()[1][1].getValue()
        && board.getBoard()[0][2].getValue() == board.getBoard()[0][2].getValue()) {
            
            result.innerText = `${getActivePlayer().name} wins!`;
                gameRunning = false;
        }
    }

    buttons.forEach(btn => {

        UpdateButtons();
        
        btn.addEventListener("click", () => {
            playRound(GetGridCoords(parseInt(btn.className))[0],
                        GetGridCoords(parseInt(btn.className))[1]);
        })
    });

    const playRound = (row, column) => {
        
        if(!gameRunning) return;

        if(board.getBoard()[row][column].getValue() != 0) {
            alert("Space is taken");
            return;
        }

        board.placeToken(row, column, getActivePlayer().token);
        UpdateButtons();
        checkForWinner();

        if(gameRunning){
            switchPlayerTurn(); 
        } else {
            turnText.innerText = `Game Over! Play Again?`;
            showButton ();
            return;
        }
    };

    function showButton () {
        replayButton.style.visibility = "visible";
    }

    return {
        playRound,
        getActivePlayer
    };
}

const game = GameplayLoop();