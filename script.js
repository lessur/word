
const words = ["apple", "table", "crane", "plant", "smile", "glide", "flame", "stone", "drink", "light"];
const targetWord = words[Math.floor(Math.random() * words.length)];
let currentRow = 0;

function submitGuess() {
  const input = document.getElementById("guess-input");
  const guess = input.value.toLowerCase();
  const board = document.getElementById("game-board");
  const message = document.getElementById("message");

  if (guess.length !== 5 || !words.includes(guess)) {
    message.textContent = "Enter a valid 5-letter word.";
    return;
  }

  message.textContent = "";

  const rowDiv = document.createElement("div");
  rowDiv.className = "row";

  const result = getFeedback(guess, targetWord);

  for (let i = 0; i < 5; i++) {
    const tile = document.createElement("div");
    tile.className = "tile " + result[i];
    tile.textContent = guess[i];
    rowDiv.appendChild(tile);
  }

  board.appendChild(rowDiv);
  input.value = "";
  currentRow++;

  if (guess === targetWord) {
    message.textContent = "🎉 You guessed it!";
    input.disabled = true;
  } else if (currentRow >= 6) {
    message.textContent = `😢 Out of guesses! Word was: ${targetWord.toUpperCase()}`;
    input.disabled = true;
  }
}

function getFeedback(guess, target) {
  const result = Array(5).fill("absent");
  const targetArray = target.split("");

  for (let i = 0; i < 5; i++) {
    if (guess[i] === target[i]) {
      result[i] = "correct";
      targetArray[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "correct") continue;
    const index = targetArray.indexOf(guess[i]);
    if (index !== -1) {
      result[i] = "present";
      targetArray[index] = null;
    }
  }

  return result;
}
