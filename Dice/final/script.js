'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score0, score1, currentScore, activePlayer, playing;

const init = function () {
  score0 = 0;
  score1 = 0;
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  switch (activePlayer) {
    case 0:
      activePlayer = 1;
      player0El.classList.remove('player--active');
      player1El.classList.add('player--active');
      break;
    case 1:
      activePlayer = 0;
      player1El.classList.remove('player--active');
      player0El.classList.add('player--active');
      break;
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    if (activePlayer === 0) {
      score0 += currentScore;
      score0El.textContent = score0;
      if (score0 >= 10) {
        playing = false;
        diceEl.classList.add('hidden');
        player0El.classList.add('player--winner');
        player0El.classList.remove('player--active');
      } else {
        switchPlayer();
      }
    } else {
      score1 += currentScore;
      score1El.textContent = score1;
      if (score1 >= 10) {
        playing = false;
        diceEl.classList.add('hidden');
        player1El.classList.add('player--winner');
        player1El.classList.remove('player--active');
      } else {
        switchPlayer();
      }
    }
  }
});

btnNew.addEventListener('click', init);
