let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset_btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");
let newBtn = document.querySelector(".new_btn");
let mssge = document.querySelector(".msgge");

let turn0 = true;
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Event listener for each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");

        if (box.innerText === "") { // Check if the box is empty
            if (turn0) {
                box.innerText = "O";
                turn0 = false;
            } else {
                box.innerText = "X";
                turn0 = true;
            }

            box.disabled = true;
            checkGameStatus();
        }
    });
});

// Event listener for reset button
resetBtn.addEventListener("click", () => {
    resetGame();
});

// Event listener for new game button
newBtn.addEventListener("click", () => {
    resetGame();
});

// Function to reset the game
const resetGame = () => {
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    turn0 = true;
    msgContainer.classList.add("hide");
};

// Function to check if there's a winner or draw
const checkGameStatus = () => {
    if (checkWinner()) {
        showWinner(turn0 ? "X" : "O"); // Display winner
    } else if (checkDraw()) {
        showDraw();
    }
};

// Function to check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
            return true; // Found a winner
        }
    }
    return false; // No winner found
};

// Function to check for a draw
const checkDraw = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            return false; // If any box is empty, game is not a draw
        }
    }
    return true; // All boxes filled and no winner found, it's a draw
};

// Function to show winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
};

// Function to show draw message
const showDraw = () => {
    mssge.innerText = "It's a draw!";
    msgContainer.classList.remove("hide");
};
