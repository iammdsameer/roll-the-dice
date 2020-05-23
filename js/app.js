var scores, activePlayer, roundScore, state;

init();

// What's gonna happen on click Roll Dice
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (state) {
    var dice = Math.floor(Math.random() * 6) + 1;
    var htmlDice = document.querySelector(".dice");

    htmlDice.src = "img/dice-" + dice + ".png";
    htmlDice.style.display = "block";

    if (dice !== 1) {
      roundScore += dice;
      document.getElementById(
        "current-" + activePlayer
      ).textContent = roundScore;
    } else {
      swapPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (state) {
    scores[activePlayer] += roundScore;
    document.getElementById("score-" + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won.
    if (scores[activePlayer] >= 10) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!";
      document.querySelector(".dice").style.display = "none";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.toggle("active");

      state = false;
    } else {
      swapPlayer();
    }
  }
});

// New Game on click !

document.querySelector(".btn-new").addEventListener("click", init);

function swapPlayer() {
  roundScore = 0;

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.getElementById("current-" + activePlayer).textContent = roundScore;
  document.querySelector(".player-1-panel").classList.toggle("active");

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}

function init() {
  state = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  // Hide the dice before game starts.
  document.querySelector(".dice").style.display = "none";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  // Reset all values to zero before the game starts.
  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";

  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-1").textContent = "0";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
}
