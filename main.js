let gameBoard = (() => {
    let a1 = document.querySelector("[data-id='0']");
    let a2 = document.querySelector("[data-id='1']");
    let a3 = document.querySelector("[data-id='2']");
    let b1 = document.querySelector("[data-id='3']");
    let b2 = document.querySelector("[data-id='4']");
    let b3 = document.querySelector("[data-id='5']");
    let c1 = document.querySelector("[data-id='6']");
    let c2 = document.querySelector("[data-id='7']");
    let c3 = document.querySelector("[data-id='8']");

    let gameboard = ['', '', '', '', '', '', '', '', ''];

    return { gameboard, a1, a2, a3, b1, b2, b3, c1, c2, c3 };
})();

let displayController = () => {
    gameBoard.a1.innerText = gameBoard.gameboard[0];
    gameBoard.a2.innerText = gameBoard.gameboard[1];
    gameBoard.a3.innerText = gameBoard.gameboard[2];
    gameBoard.b1.innerText = gameBoard.gameboard[3];
    gameBoard.b2.innerText = gameBoard.gameboard[4];
    gameBoard.b3.innerText = gameBoard.gameboard[5];
    gameBoard.c1.innerText = gameBoard.gameboard[6];
    gameBoard.c2.innerText = gameBoard.gameboard[7];
    gameBoard.c3.innerText = gameBoard.gameboard[8];
};

const Players = (name, choice) => {
    return { name, choice };
};

let human = Players('You', null);

let cyborg = Players('Cyborg', null);

const xButton = document.querySelector("[data-id='leftButton']");
const oButton = document.querySelector("[data-id='rightButton']");

xButton.addEventListener('click', () => {
    xButton.classList.add('playerChoice');
    oButton.classList.remove('playerChoice');
    human.choice = 'X';
    cyborg.choice = 'O';
    gameBoard.gameboard = ['', '', '', '', '', '', '', '', ''];
    displayController();
});

oButton.addEventListener('click', () => {
    oButton.classList.add('playerChoice');
    xButton.classList.remove('playerChoice');
    human.choice = 'O';
    cyborg.choice = 'X';
    gameBoard.gameboard = ['', '', '', '', '', '', '', '', ''];
    displayController();
});

let gameTable = document.getElementById('gameTable');

let randomNumberGenerator = () => {
    let number = Math.floor(Math.random() * 9);
    return number;
};

let gamePlay = (() => {
    let cyborgPlay = () => {
        let number = randomNumberGenerator();
        if (gameBoard.gameboard[number] === '') {
            gameBoard.gameboard[number] = cyborg.choice;
        } else {
            cyborgPlay();
        }
        displayController();
    };

    let humanPlay = () => {
        gameTable.addEventListener('click', (e) => {
            if (gameBoard.gameboard[e.target.dataset.id] === '') {
                gameBoard.gameboard[e.target.dataset.id] = human.choice;

                let found = gameBoard.gameboard.find((x) => x === '');
                if (found !== undefined) {
                    cyborgPlay();
                }
                displayController();
                declareWinner('X');
                declareWinner('O');
            }
        });
    };

    let declareWinner = (tag) => {
        if (
            (gameBoard.gameboard[0] === tag &&
                gameBoard.gameboard[1] === tag &&
                gameBoard.gameboard[2] === tag) ||
            (gameBoard.gameboard[3] === tag &&
                gameBoard.gameboard[4] === tag &&
                gameBoard.gameboard[5] === tag) ||
            (gameBoard.gameboard[6] === tag &&
                gameBoard.gameboard[7] === tag &&
                gameBoard.gameboard[8] === tag) ||
            (gameBoard.gameboard[0] === tag &&
                gameBoard.gameboard[3] === tag &&
                gameBoard.gameboard[6] === tag) ||
            (gameBoard.gameboard[1] === tag &&
                gameBoard.gameboard[4] === tag &&
                gameBoard.gameboard[7] === tag) ||
            (gameBoard.gameboard[2] === tag &&
                gameBoard.gameboard[5] === tag &&
                gameBoard.gameboard[8] === tag) ||
            (gameBoard.gameboard[2] === tag &&
                gameBoard.gameboard[4] === tag &&
                gameBoard.gameboard[6] === tag) ||
            (gameBoard.gameboard[0] === tag &&
                gameBoard.gameboard[4] === tag &&
                gameBoard.gameboard[8] === tag)
        ) {
            //Game is over, declare winner
            let resultDisplay = document.getElementById('resultDisplay');
            resultDisplay.classList.remove('invisible');
            console.log(tag)
            let winner = document.getElementById('winner');
            winner.innerText = tag;
        }
    };

    return { humanPlay, declareWinner, resultDisplay };
})();

gamePlay.humanPlay();

let restart = document.getElementById('restart');

restart.addEventListener('click', () => {
    gameBoard.gameboard = ['', '', '', '', '', '', '', '', ''];
    displayController();
    gamePlay.resultDisplay.classList.add('invisible');
});

// 1, 2, 3          0, 1, 2
// 4, 5, 6          3, 4, 5
// 7, 8, 9          6, 7, 8

// 1, 4, 7          0, 3, 6
// 2, 5, 8          1, 4, 7
// 3, 6, 9          2, 5, 8

// 3, 5, 7          2, 4, 6
// 1, 5, 9          0, 4, 8
