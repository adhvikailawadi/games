const startButton = document.getElementById('startButton');
const gameArea = document.getElementById('gameArea');
const gameText = document.getElementById('gameText');

const games = [
  'Guess a number between 1 and 10.',
  'Try a memory challenge: remember this sequence.',
  'Build your own game by editing this page.',
  'Add a new level and start playing!',
];

let targetNumber = null;
let guessCount = 0;

function startGame() {
  if (!targetNumber) {
    targetNumber = Math.floor(Math.random() * 10) + 1;
    guessCount = 0;
    gameText.textContent = 'I am thinking of a number between 1 and 10. Enter your guess by refreshing the page and adding code!';
    gameArea.classList.remove('hidden');
    return;
  }
}

startButton.addEventListener('click', () => {
  const randomMessage = games[Math.floor(Math.random() * games.length)];
  gameText.textContent = randomMessage;
  gameArea.classList.remove('hidden');
  startGame();
});
