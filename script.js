const wordsAndHints = {
  "javascript": "A programming language for web development.",
  "hangman": "A word guessing game.",
  "coding": "The process of writing computer programs.",
  "html": "The standard markup language for creating web pages.",
  "css": "A style sheet language used for describing the presentation of a document.",
  "python": "A high-level programming language.",
  "react": "A JavaScript library for building user interfaces.",
  "typescript": "A typed superset of JavaScript.",
  "bootstrap": "A front-end framework for developing responsive websites.",
  "jquery": "A fast, small, and feature-rich JavaScript library."
};

const maxAttempts = 6;
let selectedWord, guessedLetters, wrongAttempts, hintShown;

function initGame() {
  selectedWord = Object.keys(wordsAndHints)[Math.floor(Math.random() * Object.keys(wordsAndHints).length)];
  guessedLetters = [];
  wrongAttempts = 0;
  hintShown = false; // Track if the hint has been shown

  document.getElementById('wrong-attempts').innerText = wrongAttempts;
  document.getElementById('message').innerText = '';
  document.getElementById('reset-btn').style.display = 'none';

  createWordDisplay();
  createAlphabetButtons();
  updateHangmanDrawing();
  document.getElementById('hint-btn').style.display = 'inline-block'; // Show hint button
}

function createWordDisplay() {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = selectedWord.split('').map(letter => 
    guessedLetters.includes(letter) ? `<span class="reveal">${letter}</span>` : '_').join(' ');
}

function createAlphabetButtons() {
  const alphabetContainer = document.getElementById('alphabet-container');
  alphabetContainer.innerHTML = '';

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i).toLowerCase();
    const button = document.createElement('button');
    button.innerText = letter;
    button.addEventListener('click', () => handleGuess(letter));
    alphabetContainer.appendChild(button);
  }
}

// Hint function
function showHint() {
  if (!hintShown) {
    document.getElementById('message').innerText = `Hint: ${wordsAndHints[selectedWord]}`;
    hintShown = true; // Set hint as shown
  }
}

function handleGuess(letter) {
  if (guessedLetters.includes(letter)) return;

  guessedLetters.push(letter);

  if (selectedWord.includes(letter)) {
    createWordDisplay();
    checkGameStatus();
  } else {
    wrongAttempts++;
    document.getElementById('wrong-attempts').innerText = wrongAttempts;
    updateHangmanDrawing();
    checkGameStatus();
  }
}

function updateHangmanDrawing() {
  const parts = document.querySelectorAll('.hangman-part');
  parts.forEach((part, index) => {
    part.style.display = index < wrongAttempts ? 'block' : 'none';
    part.style.transition = 'all 0.5s ease'; // Smooth transition for hangman parts
  });
}

function checkGameStatus() {
  checkWin();   // Check for a win
  checkLoss();  // Check for a loss
}

function checkWin() {
  if (!document.getElementById('word-container').innerText.includes('_')) {
    displayMessage("Congratulations! You won!", "celebrate");
    endGame();
  }
}

function checkLoss() {
  if (wrongAttempts >= maxAttempts) { // Adjust based on your max attempts
    displayMessage(`Sorry, you lost! The word was "${selectedWord}". Try again!`, "sad");
    endGame();
  }
}

function displayMessage(message, type) {
  const messageElement = document.getElementById('message');
  messageElement.innerText = message;
  messageElement.className = type; // Add class for styling based on type
}

function endGame() {
  document.getElementById('alphabet-container').innerHTML = '';
  document.getElementById('reset-btn').style.display = 'block';
  document.getElementById('hint-btn').style.display = 'none'; // Hide hint button at the end
}

document.getElementById('reset-btn').addEventListener('click', initGame);
document.getElementById('hint-btn').addEventListener('click', showHint); // Add event for hint button

// Initialize the game on load
initGame();
