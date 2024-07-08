const visualConsole = document.querySelector(".console");
const buttons = document.querySelectorAll("button");

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
        /*if(board[row][column].getValue != 0) {
            printLine(board[row][column].Cell.getValue);
            alert("Space is taken");
            return;
        }*/

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

    const UpdateButtons = () => {
        buttons.forEach(btn => {
            btn.innerText = btn.className;
            btn.innerText = board.getBoard()[GetGridCoords(parseInt(btn.className))[0]][GetGridCoords(parseInt(btn.className))[1]].getValue();
            
            /*if(board[btn.className].token === 0) {
                
            }*/
    
            /*btn.innerText = board[btn.className].token === 0 ? "" : 
                btn.innerText = board[btn.className].token === 1 ? "O" : "X";*/
            
        });
    };

    buttons.forEach(btn => {

        UpdateButtons();
        btn.addEventListener("click", () => {
            printLine(board.getBoard()[0][0].getValue());
            printLine(board.printBoard());
            
            //printLine(GetGridCoords(parseInt(btn.className)));

            playRound(GetGridCoords(parseInt(btn.className))[0],
                        GetGridCoords(parseInt(btn.className))[1]);
            //check if cell free
            //place token
        })
    });

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
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {

        console.log(`${getActivePlayer().name}'s turn.`);
      };

    const playRound = (row, column) => {
        
        board.placeToken(row, column, getActivePlayer().token);
        UpdateButtons();
        switchPlayerTurn();
    };

    

    return {
        playRound,
        getActivePlayer
    };
}

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

const game = GameplayLoop();

function checkForWinner() {
    //Check if 3 matching symbols in row0
    //Check if 3 matching symbols in row1
    //Check if 3 matching symbols in row2
    //Check if 3 matching symbols in row0[0], row1[0], row2[0]
    //Check if 3 matching symbols in row0[1], row1[1], row2[1]
    //Check if 3 matching symbols in row0[2], row1[2], row2[2]
    //Check if 3 matching symbols in row0[0], row1[1], row2[2]
    //Check if 3 matching symbols in row0[2], row1[1], row2[0]
    //else next turn
}


function printLine (output) {
    newLine = document.createElement("p");
    newLine.innerText = output;
    visualConsole.appendChild(newLine);
}