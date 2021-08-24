"use strict";

/** Game Data */
let secretNum = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

/** DOM elements */
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".highscore");
let userGuessInput = document.querySelector(".guess");
let body = document.querySelector("body");
let secretNumElement = document.querySelector(".number");
let message = document.querySelector(".message");

document.querySelector(".check").addEventListener("click", function () {
  let guessElement = document.querySelector(".guess");
  let guess = Number(guessElement.value);
  processInput(guess);
});

// Reset score and HTML content.
// Invoked by the .again button.
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".guess").value = "";
  document.querySelector(".score").textContent = score;
});

function processInput(input) {
  // Check if entry is valid first. Check for empty or null input.
  let sanity =
    !input || input === "" || input === null
      ? "Please input something"
      : input < 0 || input > 20
      ? "Between 1 and 20!"
      : "";
  messageElement.textContent = sanity;

  // When guess is correct.
  if (input === secretNum) {
    youWon();

    // When guess is wrong
  } else if (input !== secretNum) {
    if (score > 1) {
      document.querySelector("body").style.backgroundColor = "#222";
      let message = input < secretNum ? "Too low" : "Too high";
      score--;
      messageElement.textContent = message;
    } else {
      youLost();
    }
    scoreElement.textContent = score;
  }
}

// Sets UI and score to show a loss
function youLost() {
  score = 0;
  document.querySelector(".message").textContent = "You lose..";
  document.querySelector(".number").textContent = secretNum;
  document.querySelector("body").style.backgroundColor = "#ff0000";
  document.querySelector(".number").style.width = "30rem";
}

// Sets UI and score to show a win. Also includes check for highscore.
// Reset secretNumber after for a new session
function youWon() {
  score++;

  // Update UI
  scoreElement.textContent = score;
  messageElement.textContent = "Correct!";
  numberElement.textContent = secretNum;
  document.querySelector("body").style.backgroundColor = "#60b347";
  document.querySelector(".number").style.width = "30rem";

  // Check for high sore and display high score
  if (score > highScore) highScore = score;
  highScoreElement.textContent = highScore;

  // Reset secret number once it's guessed
  secretNum = Math.trunc(Math.random() * 20) + 1;
}
