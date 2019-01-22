//jshint esversion: 6

"use strict"
class Hangman {
    constructor(word, noOfAttempts) {
        this.word = word.toLowerCase().split("");
        this.noOfAttempts = noOfAttempts;
        this.guessedLetters = [];
        this.status = "playing";
    };

    isLetterExistInWord(letter) {
        return this.word.includes(letter)
    };

    calculateStatus() {
        let status = "";

        if (this.noOfAttempts == 0) {
            status = "failed";
        } else {
            const finished = this.word.every((letter) => {
                return (this.guessedLetters.includes(letter) || letter === " ");
            });
            // let noOfMatchLetters = 0;
            // this.word.forEach((letter) => {
            //     noOfMatchLetters = this.guessedLetters.includes(letter) || letter === " " ? (noOfMatchLetters + 1) : noOfMatchLetters;
            // });

            status = finished ? "finished" : "playing";
        }

        this.status = status;
    };

    get statusMessage() {
        let message = "";
        if (this.status === "playing") {
            message = `You have ${game1.noOfAttempts} left!`;
        } else if (this.status === "finished") {
            message = "Congratualations, you WIN!!!";
        } else {
            message = `Better luck next time :-((( The correct word was "${game1.word.join("")}"`;
        }

        return message;
    };

    guessLetter(letter) {
        const lowerCaseGuess = letter.toLowerCase();
        if (!this.guessedLetters.includes(lowerCaseGuess)) {

            // Add the new guess to the guessed letters array
            this.guessedLetters.push(lowerCaseGuess);

            // Check wether to reduce attempts counter
            if (!this.isLetterExistInWord(lowerCaseGuess)) {
                this.reduceUserAttempt();
            };

            this.calculateStatus();
        }
    };

    reduceUserAttempt() {
        this.noOfAttempts--;
    };

    get puzzle() {

        let puzzleForPlayer = "";
        let letterFound = false;

        this.word.forEach((letter) => {
            letterFound = this.guessedLetters.includes(letter);
            puzzleForPlayer += letterFound || letter === " " ? letter : "*";
        });

        return puzzleForPlayer;
    };
}