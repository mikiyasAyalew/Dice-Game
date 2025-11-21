'use strict';

// ===== SELECT ELEMENTS =====
const scoreEl = [document.getElementById('score--0'), document.getElementById('score--1')];
const currentEl = [document.getElementById('current--0'), document.getElementById('current--1')];
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGameBtn = document.querySelector('.btn--new');
const diceImg = document.querySelector('.dice');
const winnerMsg = document.querySelector('.winner-message');

// ===== GAME STATE =====
let scores, currentScore, activePlayer, playing;

function initGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Reset UI
  scoreEl[0].textContent = 0;
  scoreEl[1].textContent = 0;
  currentEl[0].textContent = 0;
  currentEl[1].textContent = 0;
  diceImg.classList.add('hidden');
  winnerMsg.classList.add('hidden');

  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
}

// ===== SWITCH PLAYER FUNCTION =====
function switchPlayer() {
  // Reset current score
  currentEl[activePlayer].textContent = 0;
  currentScore = 0;

  // Switch active player
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
}

// ===== DICE ROLL FUNCTION =====
function rollDiceNumber() {
  return Math.trunc(Math.random() * 6) + 1;
}

// ===== CONFETTI EFFECT =====
function confetti() {
  for (let i = 0; i < 150; i++) {
    const c = document.createElement("div");
    c.classList.add("confetti");
    c.style.left = Math.random() * 100 + "vw";
    c.style.setProperty("--hue", Math.random() * 360);
    c.style.animationDelay = Math.random() * 1 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2000);
  }
}

// ===== SHOW WINNER =====
function showWinner(player) {
  winnerMsg.textContent = `🎉 Player ${player + 1} Wins! 🎉`;
  winnerMsg.classList.remove('hidden');

  confetti();

  document.querySelector(`.player--${player}`).classList.add('player--winner');
  document.querySelector(`.player--${player}`).classList.remove('player--active');
}

// ===== EVENT LISTENERS =====

// Roll Dice
rollBtn.addEventListener('click', function () {
  if (!playing) return;

  const dice = rollDiceNumber();
  diceImg.classList.remove('hidden');
  diceImg.src = `dice-${dice}.png`;

  if (dice !== 1) {
    currentScore += dice;
    currentEl[activePlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
});

// Hold Score
holdBtn.addEventListener('click', function () {
  if (!playing) return;

  // Add current score to total
  scores[activePlayer] += currentScore;
  scoreEl[activePlayer].textContent = scores[activePlayer];

  // Check if player won
  if (scores[activePlayer] >= 100) {
    playing = false;
    showWinner(activePlayer);
    diceImg.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

// New Game
newGameBtn.addEventListener('click', initGame);

// ===== INITIALIZE GAME =====
initGame();
