// Variables used to keep track of modes and colors
let numSquares = 6;
let colors = [];
let pickedColor;

// Selectors for elements
let squares = document.querySelectorAll(".square");
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let resetButton = document.querySelector("#reset");
let h1 = document.querySelector("h1");
let modes = document.querySelectorAll(".mode");

init();

// Set up listeners for buttons and squares
function init() {

    setUpModeButtons();
    setUpSquares();
    resetButton.addEventListener("click", reset);

    reset();

}

// Set up the listeners for the mode buttons
function setUpModeButtons() {
    for (let i = 0; i < modes.length; i++) {
        modes[i].addEventListener("click", function() {
            modes[0].classList.remove("selected");
            modes[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent === "Easy") {
                numSquares = 3;
            } else {
                numSquares = 6;
            }
            reset();
        })
    }
}

// Set up listeners for the squares
function setUpSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            let clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Play Again?";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again";
            }
        })
    }
}

// Set up resetting
function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for (let i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

    h1.style.backgroundColor = "steelblue";
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
}

// Change the colors of the squares using colors array
function changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

// Pick a random color from the colors array
function pickColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// Generate random colors for the color array
function generateRandomColors(num) {
    let colors = [];

    for (let i = 0; i < num; i++) {
        colors.push(randomColor());
    }

    return colors;
}

// Generate a random color
function randomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}