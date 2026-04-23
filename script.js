let cells = document.querySelectorAll(".cell");
let currentPlayer = "X";

//  Winner Check
function checkWinner() {
    let winPatterns = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for (let pattern of winPatterns) {
        let a = cells[pattern[0]].innerText;
        let b = cells[pattern[1]].innerText;
        let c = cells[pattern[2]].innerText;

        if (a !== "" && a === b && b === c) {

            //  highlight winner
            cells[pattern[0]].style.backgroundColor = "lightgreen";
            cells[pattern[1]].style.backgroundColor = "lightgreen";
            cells[pattern[2]].style.backgroundColor = "lightgreen";

            setTimeout(() => {
                alert(a + " wins!");
            }, 100);

            return true;
        }
    }
    return false;
}

//  AI Move
function aiMove() {
    let emptyCells = [];

    cells.forEach((cell, index) => {
        if (cell.innerText === "") {
            emptyCells.push(index);
        }
    });

    if (emptyCells.length === 0) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    cells[randomIndex].innerText = "O";

    if (checkWinner()) return;

    currentPlayer = "X";
}

//  Reset Game
function resetGame() {
    cells.forEach(function(cell) {
        cell.innerText = "";
        cell.style.backgroundColor = "";
    });

    currentPlayer = "X";
}

//  Click Logic (Main Game)
cells.forEach(function(cell) {
    cell.addEventListener("click", function() {

        let mode = document.getElementById("mode").value;

        if (cell.innerText === "" && currentPlayer === "X") {

            cell.innerText = "X";

            if (checkWinner()) return;

            if (mode === "ai") {
                currentPlayer = "O";

                setTimeout(() => {
                    aiMove();
                }, 500);

            } else {
                currentPlayer = "O";
            }

        } else if (cell.innerText === "" && mode === "friend") {

            cell.innerText = currentPlayer;

            if (checkWinner()) return;

            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }

    });
});