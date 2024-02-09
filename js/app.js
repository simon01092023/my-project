/*----- constants -----*/

const minWager = 1;
const bankAtStart = 100;

/*----- app's state (variables) -----*/

let bank;
let wager;
let diceRolled;
let roll;
let point;
let wagerPotAmount;

/*----- cached element references -----*/

const startOfGame = document.getElementById('startOfGame');
const reset = document.getElementById('reset');
const gameInput = document.getElementById('gameInput');
const gameOutput = document.getElementById('gameOutput');
const bankBalanceBoard = document.getElementById('bankBalanceBoard');
const pointBoard = document.getElementById('pointBoard');
const wagerPotBoard = document.getElementById('wagerPotBoard');
const gameStatus = document.getElementById('gameStatus');
const rollHistory = document.getElementById('rollHistory');
const listItem = document.createElement('li');
const bigDie1 = document.querySelector('#bigDie1');
const bigDie2 = document.querySelector('#bigDie2');
const diceSound = document.getElementById('diceSound');

/*----- event listeners -----*/

startOfGame.addEventListener('click', rollingDice);
reset.addEventListener('click', init);

/*----- functions -----*/
init()

function init() {
    bank = 100;
    wagerPotAmount = 0;
    point = 0;
    renderBank()
    clearTheBoard()
    diceSound.play()
}

function renderDice(roll1Value, roll2Value) {
    bigDie1.src = `img/die-${roll1Value}.png`
    bigDie2.src = `img/die-${roll2Value}.png`
    diceSound.play()
}
function renderBank() {
    bankBalanceBoard.textContent = bank;
    startOfGame.disabled = false;
}

function clearTheBoard() {
    rollHistory.textContent = '';
    gameStatus.textContent = '';
    gameOutput.textContent = '';
    wagerPotBoard.textContent = wagerPotAmount;
    pointBoard.textContent = point;
}

function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1;
    return roll
}

function rollDice() {
    const die1 = rollDie();
    const die2 = rollDie();
    renderDice(die1, die2)
    return die1 + die2;
}

function wagerSaved() {
    wager = Number(gameInput.value);
    if (point > 0) {
        // Allow wager to be 0 if there is a point assigned
        if (wager >= 0 && wager <= bank) {
            bank -= wager; // Subtract the wager from the bank
            wagerPotAmount += wager; // Add the wager to the pot
            renderBank();
            wagerPotBoard.innerHTML = wagerPotAmount;
            return true;
        } else {
            return false;
        }
    } else {
        // If there is no point assigned, wager must be at least minWager
        if (wager >= minWager && wager <= bank) {
            bank -= wager; // Subtract the wager from the bank
            wagerPotAmount += wager; // Add the wager to the pot
            renderBank();
            wagerPotBoard.innerHTML = wagerPotAmount;
            return true;
        } else {
            return false;
        }
    }
}

function playDiceSound() {

}

function checkPoint(roll) {
    if (point === 0) {
        if (roll === 7 || roll === 11) {
            diceRolled = 'win';
            gameOutput.innerHTML = `You rolled ${roll} on the come out and won double the pot amount of $${wagerPotAmount * 2}!`;
            bank += (wagerPotAmount * 2); // Add the wagerPotAmount to the bank
            wagerPotAmount = 0; // Reset the wagerPotAmount
            gameStatus.textContent = 'You win!';
            renderBank(); // Update the bank 


        } else if (roll === 2 || roll === 3 || roll === 12) {
            diceRolled = 'lose';
            gameOutput.innerHTML = `You rolled ${roll} and lost!`;
            gameStatus.textContent = 'You lose!';
            renderBank();// Update the bank 
        } else {
            point = roll;
            diceRolled = point;
            // Update the pointBoard in real time
            pointBoard.innerHTML = point;
        }
    } else {
        if (roll === point) {
            diceRolled = 'win';
            gameOutput.innerHTML = `You rolled your point ${roll} and won the pot $${wagerPotAmount}!`;
            bank += wagerPotAmount; // Add winning point pot to the bank
            wagerPotAmount = 0; // Reset pot 
            renderBank(); // Update the bank 
            point = 0;
            gameStatus.textContent = 'You win!';

        } else if (roll === 7) {
            if (diceRolled = 'lose') {
                if (bank === 0) {
                    gameOutput.innerHTML = gameOutput.innerHTML += "<br>Game over! Your bank balance is zero.<br>";
                    startOfGame.disabled = true; // Disable the button
                } else
                    gameOutput.innerHTML = `You rolled ${roll} and lost. Your point was ${point}.`;
                gameStatus.textContent = 'You lose!';
                return point = 0;
            }
        }
    }
}

function outputDiceRolled() {
    gameOutput.innerHTML += `<br>Wagered: $${wager}, Rolled: ${roll}, Point: ${point}, Balance: $${bank}.`;
    listItem.textContent = `Wagered: $${wager}, Rolled: ${roll}, Point: ${point}, Balance: $${bank}.`;
    rollHistory.appendChild(listItem);
    if (diceRolled === point) {
        pointBoard.innerHTML = `${point}`;
    } else {
        pointBoard.innerHTML = 0;
    }
    if (diceRolled === 'win' || diceRolled === 'lose') {
        setTimeout(() => {
            gameOutput.innerHTML = '';
            pointBoard.innerHTML = 0; // Clear the point display
        }, 7000);
    }
    if (bank === 0) {
        gameOutput.innerHTML = gameOutput.innerHTML += "<br>Game over! Your bank balance is zero.";
        startOfGame.disabled = true; // Disable the button
    }

}

function rollingDice(e) {
    if (wagerSaved()) {
        roll = rollDice();
        checkPoint(roll);
        outputDiceRolled();
        diceSound.play()
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



// startOfGame: This is the id of your button element.
// gameInput: This is the id of your input element where the user enters their wager.
// gameOutput: This is the id of the paragraph element where you display the game output.
// bankBalanceBoard: This is the id of the span element where you display the bank balance.
// pointBoard: This is the id of the span element where you display the point.
// wagerPotBoard: This is the id of the span element where you display the wager pot.