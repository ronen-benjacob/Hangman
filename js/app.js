"use strict"

let game1;

const initTurn = () => {
    document.querySelector(".puzzle").innerHTML = "";
    document.querySelector(".guessedLetters").innerHTML = "";
    document.querySelector("#remainGuesses").textContent = game1.statusMessage;

    let letterElement;
    game1.puzzle.split("").forEach((letter) => {
        letterElement = document.createElement("span");
        letterElement.textContent = letter;
        document.querySelector(".puzzle").appendChild(letterElement);
    });

    if (game1.guessedLetters.length > 0) {
        letterElement = document.createElement("div");
        letterElement.textContent = "You already guessed these letters:";
        document.querySelector(".guessedLetters").appendChild(letterElement);
        game1.guessedLetters.forEach((letter) => {
            letterElement = document.createElement("span");
            letterElement.textContent = letter;
            document.querySelector(".guessedLetters").appendChild(letterElement);
        });
    };
};

const startGame = async () => {
    const puzzle = await getPuzzlePromiseChain();
    game1 = new Hangman(puzzle, (puzzle.split(" ").length) * 3);
    initTurn();
};

startGame();

// Add event listener to the guess text field keypress
document.querySelector("body").addEventListener("keypress", (event) => {

    // action to prevent page reload after form submit process
    //event.preventDefault();

    if (game1.status === "playing") {
        // Get the user's guess
        const userGuess = String.fromCharCode(event.charCode);
        game1.guessLetter(userGuess);
    } else {
        game1.status = "playing";
        game1.noOfAttempts = 10;
        game1.guessedLetters = [];
    };

    initTurn();

});

// Add event listener to the reset button click
document.querySelector("#resetGame").addEventListener("click", (event) => {
    if (confirm("Are you sure you want to reset the game?")) {
        startGame();
    }
});