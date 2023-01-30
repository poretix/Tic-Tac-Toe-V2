const gameboard = (function() {
    //array of board
    const boardStatus = ["", "", "", "", "", "", "", "", ""];

    //making the board
    const board = document.querySelector(".board");

    boardStatus.forEach((item) => {
        const tile = document.createElement('div');
        tile.classList.add("tile");
        board.appendChild(tile);
    })

    //selecting title for gameboard for later reference
    const title = document.querySelector(".title");

    //making an array of the tiles
    let tileArray = Array.from(board.children);
    //adding event listener to each and tying the tiles with boardStatus
    tileArray.forEach((item, index) => {
        item.addEventListener("click", function() {
            if (gameboard.boardStatus[index] === "" && game.status === true) {
                game.checkPlayer();
                gameboard.boardStatus[index] = game.symbol;
                item.textContent = gameboard.boardStatus[index];
                item.style.cursor = "default";
                title.textContent = `${game.nextplayer.name}'s Turn`;
                game.counter++;
                game.checkWinner();
            }
        })
    })

    return {
        boardStatus,
        board,
        tileArray,
        title,
    }
}());

//factory function to create player
function player(name, symbol, status) {
    return {
        name,
        symbol,
        status,
    };
}

const player1 = player("Player X", "X", true);
const player2 = player("Player O", "O", false);

const game = (function() {
    let counter = 0;
    let status = true;
    let symbol = "";
    let currentplayer = "";
    let nextplayer = "";

    //function to check for winner of game
    const checkWinner = function() {
        let winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        winningConditions.forEach((item) => {
            if (game.counter < 9 && gameboard.boardStatus[item[0]] !== "" && gameboard.boardStatus[item[0]] === gameboard.boardStatus[item[1]] && gameboard.boardStatus[item[1]] === gameboard.boardStatus[item[2]]) {
                gameboard.title.textContent = `${game.currentplayer.name} wins!`;
                game.status = false;
                gameboard.tileArray.forEach((item) => {
                    item.style.cursor = "default";
                })
            }
            else if (game.counter === 9) {
                gameboard.title.textContent = "It's a tie!";
                game.status = false;
                gameboard.tileArray.forEach((item) => {
                    item.style.cursor = "default";
                })
            }
        })
    }
    //function to get the symbol of the current player
    const checkPlayer = function() {
        if (player1.status === true) {
            game.symbol = player1.symbol;
            player1.status = false;
            player2.status = true;
            game.currentplayer = player1;
            game.nextplayer = player2;
        }
        else if (player2.status === true) {
            game.symbol = player2.symbol;
            player2.status = false;
            player1.status = true;
            game.currentplayer = player2;
            game.nextplayer = player1;
        }
    }

    return {
        symbol,
        currentplayer,
        nextplayer,
        checkPlayer,
        checkWinner,
        counter,
        status,
    }
}());

//function to restart the game
function restart() {
    gameboard.boardStatus = ["", "", "", "", "", "", "", "", ""];
    gameboard.tileArray.forEach((item, index) => {
        item.textContent = "";
    })
    gameboard.title.textContent = "Player X's Turn"
    game.counter = 0;
    game.status = true;
    game.symbol = "";
    game.currentplayer = "";
    game.nextplayer = "";
    player1.status = true;
    player2.status = false;
}
