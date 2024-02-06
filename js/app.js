
/*----- constants -----*/
const minWager = 1;
const maxWager = 100;

/*----- app's state (variables) -----*/

let bank = 100;
//start with $100 in the bank 
let wager;
//Must implement wagering feature
let diceRolled;


/*----- cached element references -----*/

const startOfGame = document.getElementById('startGame')
const gameInput = document.getElementById('gameInput');
const gameOutput = document.getElementById('gameOutput');

/*----- event listeners -----*/

//startOfGame.addEventListener('start', runGame);

/*----- functions -----*/

function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
    //Generates a random number from 1 to 6 can you be used per die
};

function rollDice() {
    const die1 = rollDie();
    const die2 = rollDie();
    return die1 + die2;
    //returns the results of a pair of dice
}

function wagerSaved() {
    wager = Number(gameInput.value);
    //saves the value from the player prompt at start of game
    if (wager >= minWager && wager <= maxWager && wager <= bank) {
        return true;
    } else {
        return false;
    }
}

function bankTotal() {
    if (diceRolled == "win") {
        bank = bank + wager;
    } else if (diceRolled == "lose") {
        bank = bank - wager;
    } else {
        //console.log error here ?
    }

}

function outputDiceRolled() {
    gameOutput.textContent = `You $${wager} and your bank is now $${bank}.`
}

function rollingDice() {
    if (wagerSaved()) {
        const firstRoll = rollDice();
        //come out roll (first roll can = win, lose, or assign point)
        if (firstRoll === 7 || firstRoll === 11 || firstRoll === 12) {
            result = "win";
            //if win 
        } else if (firstRoll === 2 || firstRoll === 3) {
            result = "lose";
            // if lose 
        } else {
            //else assign a point(first roll = dice number for win) until end of game
            const point = firstRoll;
            let roll;
            while (roll !== point && roll !== 7)
                //game will loop until a win or lost
                if (roll === point) {
                    result = "win";
                } else {
                    result = "lose";
                }
        }
        bankTotal();
        //need to return and update bank balance 
        outputDiceRolled();
    } else {
        //catch all for wager amount 
        console.log(`Invalid wager amount. Please enter a number between ${minWager} and ${maxWager} your will not be able to exceed you bank total amount.`);
    }
}






// Additional Notes can use info for ReadMe 

// Get 2 separate values of the sum of the dice roll 
// 	1 for the sum of dice for the player 
// 	1 for the sum of the for computer  

// A sum function that returns the value 2 numbers generated 1 for each die rolled. 

// Now create a function that checks if the sum total is a winner 

// If player rolls a 7 or 11 you on first roll you win right away so that would be the first thing to check maybe with a if statement 
// Then check if the player loses on the first roll if the sum total of dice rolled equals 
// 2(snake eyes) or 12(double sixes)

// After that is checked then create a function makes the winning roll what number you first roll 7 or 11 and keep losing rolls as snake eyes and double sixes

// Now find a way to invoke the functions

// Add event listeners to buttons that say roll dice start game and maybe end game early (same as losing but maybe need to break out of a function.

//https://git.generalassemb.ly/SEI-CC/sei-1-22-wc/blob/main/Unit_1/project-1/project-1-requirements.md
