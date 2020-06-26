let scores, activePlayer, roundScore, isPlaying;

function startGame() {
    // Resetting Values
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    isPlaying = true;


    // Setting Player Name
    document.querySelector(".player-title-0").textContent = "Player 1";
    document.querySelector(".player-title-1").textContent = "Player 2";

    // Resetting Global Label
    document.querySelector(".player-global-score-0").textContent = 0;
    document.querySelector(".player-global-score-1").textContent = 0;

    // Resetting Current labels
    document.querySelector(".round-score-number-0").textContent = 0;
    document.querySelector(".round-score-number-1").textContent = 0;

    // Removing Winner class
    document.querySelector(".player-title-0").classList.remove("winner");
    document.querySelector(".player-title-1").classList.remove("winner");

    // Making active classes
    document.querySelector(".player-0").classList.remove("active");
    document.querySelector(".player-1").classList.remove("active");
    document.querySelector(".player-0").classList.add("active");

    //   Making die invisable
    document.querySelector(".dice-icon").style.display = "None";
}

startGame();

let newGame = document.querySelector(".new-game-icon");
newGame.addEventListener("click", () => {
    startGame();
});

let rollButton = document.querySelector(".roll-button");

rollButton.addEventListener("click", () => {
    if (isPlaying) {
        //   Generate Random Number
        let diceRolled = Math.floor(Math.random() * 6) + 1;
        console.log("Dice rolled " + diceRolled);

        //   Make die visible
        document.querySelector(".dice-icon").style.display = "block";

        // Make die dynamic
        document.querySelector(
            ".dice-image"
        ).src = `assets/img/dice-${diceRolled}.png`;

        // Update roundScore
        if (diceRolled !== 1) {
            roundScore += diceRolled;
            document.querySelector(
                `.round-score-number-${activePlayer}`
            ).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //   Reset roundscore and label
    roundScore = 0;

    document.querySelector(
        `.round-score-number-${activePlayer}`
    ).textContent = roundScore;

    // Switiching active class
    document.querySelector(".player-0").classList.toggle("active");
    document.querySelector(".player-1").classList.toggle("active");

    // Swtiching active player
    activePlayer = activePlayer === 0 ? 1 : 0;

    //   Hiding die
    document.querySelector(".dice-icon").style.display = "none";
}

let holdButton = document.querySelector(".hold-button");

holdButton.addEventListener("click", () => {
    if (isPlaying) {
        //   Update scores and label
        scores[activePlayer] += roundScore;
        document.querySelector(`.player-global-score-${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 50) {
            // Activate Winner class
            document.querySelector(`.player-title-${activePlayer}`).textContent =
                "Winner";
            document
                .querySelector(`.player-title-${activePlayer}`)
                .classList.toggle("winner");
            // Changing Game state
            isPlaying = false;
        } else {
            nextPlayer();
        }
    }
});