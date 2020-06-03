var scores, roundScore, activePlayer, gamePlaying;

newGame();

var diceDom = document.querySelector(".dice");

// ************ New Game global Function Start *****************
function newGame() {
  // reset all to 0
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector("#score-0").textContent = "0";
  document.querySelector("#score-1").textContent = "0";
  document.querySelector("#current-0").textContent = "0";
  document.querySelector("#current-1").textContent = "0";
  document.querySelector(".dice").style.display = "none";
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
// ************ New Game global Function End *****************

// ************ NextPlayer Global Function Start *****************
function nextPlayer() {
  roundScore = 0;
  document.querySelector("#current-" + activePlayer).textContent = roundScore;

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  diceDom.style.display = "none";
}
// ************ NextPlayer Global Function End *****************

// ************ Roll Button Start *****************
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // display the result
    diceDom.style.display = "block";
    diceDom.src = "img/dice-" + dice + ".png";

    // update the round score if the rolled number is not 1
    if (dice !== 1) {
      // add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      // next player turn
      nextPlayer();
    }
  }
});
// ************ Roll Button End *****************

// ************Hold Button Start ****************
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // add to the global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    // check if the palyer wins
    if (scores[activePlayer] >= 20) {
      document.querySelector("#name-" + activePlayer).textContent = "WINNER!!";

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.toggle("winner");

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.toggle("active");

      diceDom.style.display = "none";

      gamePlaying = false;
    } else {
      // next palyer
      nextPlayer();
    }
  }
});
// ************Hold Button End ****************

// ************New Game Button Start ****************
document.querySelector(".btn-new").addEventListener("click", newGame);
// ************New Game Button End ****************
