// Javascript for RGB Colour Guessing Game
// HTML Elements
const rgbValue = document.getElementById('rgbValue');
const colorOptions = document.getElementById('colorOptions');
const message = document.getElementById('message');
const livesDisplay = document.getElementById('lives');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');

// Game State
let lives = 3;
let score = 0;
let correctColor = '';

// Generate a random RGB color
function generateRandomRGB() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Start or reset the game
function startGame() {
  lives = 3;
  score = 0;
  restartBtn.style.display = 'none';
  updateStatus();
  newRound();
}

// Start a new round
function newRound() {
  // Generate the correct color
  correctColor = generateRandomRGB();
  rgbValue.textContent = correctColor;

  // Determine position of correct color in options
  const correctIndex = Math.floor(Math.random() * 3);
  const colors = [];

  for (let i = 0; i < 3; i++) {
    if (i === correctIndex) {
      colors.push(correctColor);
    } else {
      let color;
      // Ensure incorrect colors aren't same as correct
      do {
        color = generateRandomRGB();
      } while (color === correctColor);
      colors.push(color);
    }
  }

  renderOptions(colors);
}

// Render color option buttons
function renderOptions(colors) {
  colorOptions.innerHTML = ''; // Clear old options

  colors.forEach((color) => {
    const div = document.createElement('div');
    div.classList.add('option');

    const innerDiv = document.createElement('div');
    innerDiv.classList.add('option-inner');
    innerDiv.style.backgroundColor = color;

    // Add click event listener
    div.addEventListener('click', () => handleGuess(color));

    div.appendChild(innerDiv);
    colorOptions.appendChild(div);
  });
}

// Handle user guess
function handleGuess(selectedColor) {
  if (selectedColor === correctColor) {
    message.textContent = 'Correct!';
    score++;
  } else {
    message.textContent = 'Wrong!';
    lives--;
  }

  updateStatus();

  if (lives > 0) {
    setTimeout(newRound, 1000);
  } else {
    endGame();
  }
}

// Update lives and score display
function updateStatus() {
  livesDisplay.textContent = lives;
  scoreDisplay.textContent = score;
}

// End the game
function endGame() {
  message.textContent = `Game Over! Final Score: ${score}`;
  restartBtn.style.display = 'inline-block';
}

// Restart button event
restartBtn.addEventListener('click', startGame);

// Start the game on page load
startGame();
