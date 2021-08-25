"use strict";

/** Game Data */
let secretNum = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

/** DOM elements */
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".highscore");
let userGuessInput = document.querySelector(".guess");
let body = document.querySelector("body");
let secretNumElement = document.querySelector(".number");
let message = document.querySelector(".message");

function processInput(input) {
  // Convert string to number, just in case
  input = Number(input);

  // Check if entry is valid first. Check for empty or null input.
  if (!input) message.textContent = "Please input something";

  // Only execute if users guess is between 1 and 20
  if (input <= 20 && input >= 1) {
    // When guess is correct.
    if (input === secretNum) {
      score++;
      message.innerHTML = "You Win!";
      secretNumElement.style.width = "30rem";
      body.style.backgroundColor = "#60b347";

      // Check for highscore and set
      if (score > highScore) highScore = score;

      // When guess is incorrect
    } else if (input !== secretNum) {
      if (score > 1) {
        score--;
        message.innerHTML = input > secretNum ? "Too high" : "Too low";
      } else {
        score = 0;
        message.innerHTML = "You lost";
        body.style.backgroundColor = "red";
      }
    }
  } else {
    message.innerHTML = "Between 1 and 20";
  }
  scoreElement.innerHTML = score;
  highScoreElement.innerHTML = highScore;
}

document.querySelector(".check").addEventListener("click", function () {
  let guess = userGuessInput.value;
  processInput(guess);
});

// Reset score and HTML content.
// Invoked by the .again button.
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNum = Math.trunc(Math.random() * 20) + 1;

  body.style.backgroundColor = "#222";
  secretNumElement.textContent = "?";
  message.textContent = "Start guessing...";
  userGuessInput.value = "";
  secretNumElement.style.width = "15rem";
  scoreElement.textContent = score;
});
