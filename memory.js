//new game

//new game must reset:
//number of moves display
//show best score (from local storage)
//shuffle the cards

//flip the card over (add flipped to classList)
//addeventlistener('click') will flip the card over to reveal the back

//game should keep track of # of times a card is clicked
//if a card is clicked then moves++ (innerText = moves)

//only 2 cards shown at the same time
//if 2 cards are clicked then
//1. they need to stay face up for 1 second (setTimeout)
//2. must only work for two DIFFERENT cards (comparison)
//3. clicking the same card twice (if clicked same card then return)
//also means do not increment moves

//after staying face up for 1 second then the cards should flip back
//add match to classList if a match

//end game

//when all cards are flipped then the game ends

//store the lowest # of moves in localstorage (best score)


const card = document.querySelectorAll('.game-card'); //selects all the cards with class game-card
const newGame = document.querySelector("#new-game"); //selects id new game in header
const moves = document.querySelector("#moves"); //selects the id moves in the header
const bestScore = document.querySelector("#best-score"); //selects id best-score in header

let cards = [...card];
let localScore = localStorage.getItem("highScore"); //retrieves lowest # of moves score from localStorage
let currentScore = 0; //this will count how many times a card is clicked
let clicked = false;
let numMatches = 0;

let flippedCard = [];

//start new game

cards.forEach(card => card.addEventListener('click', flipCard));

newGame.addEventListener('click', function() {
    shuffle(); //shuffle the cards
    flippedCard = [];
    moves.innerText = "Moves: 0"; //reset # of moves to 0
    bestScore.innerText = "Best Score: " + localScore; //display best score
    currentScore = 0; //reset current score
    for(let card of cards) {
        card.classList.remove("flip"); //removes flipped from classList
        card.classList.remove("match"); //removes match from classList
        card.classList.remove("stop"); //removes stop from classList
    }
})

function shuffle() { //shuffle all the cards
    cards.forEach(card => { 
        let ramdomPos = Math.floor(Math.random() * 16);
        card.style.order = ramdomPos;
    });
}

function flipCard(e) {
    if(clicked) {
        return;
    }
    
    let currentCard = e.target.parentElement;
    currentCard.classList.add("flip"); //add flip to classList of currentCard
    flippedCard.push(currentCard); //add currentCard to flippedCard array
    currentCard.classList.add("stop"); //add stop to currentCard classList to stop this card from being clicked again

    if(flippedCard.length === 2) {
        currentScore+=2; //increment the current # of moves (score)
        moves.innerText = "Moves: " + currentScore; //update current # of moves
        
        if(flippedCard[0].dataset.character === flippedCard[1].dataset.character) { //check if data attributes match
            match(); //if they do match, then add match to classList
            numMatches++; //increment number of matches to keep track of when the player will be done
            if (numMatches === cards.length/2) {
                moves.innerText = "FINISHED! Final score: "; //if # matches equals total # of pairs (finished game)
                stopClick(); //stop click for all cards
                localStorage.setItem('highScore', currentScore); //update score in localStorage
                bestScore.innerText = "Best Score: " + localScore; //retrieve best score in localStorage
            }
        } else {
            unmatch(); //flip over cards that don't match
        }
    }
    
}

function match() {
    clicked = true;
    setTimeout(() => {
        flippedCard[0].classList.add('match'); //add match to both elements to tag as matched pair
        flippedCard[1].classList.add('match');
        flippedCard = []; //empty the array after finding match
        clicked = false; 
    }, 1000);
}

function unmatch() {
    clicked = true;
    setTimeout(() => {
        flippedCard[0].classList.add('close'); 
        flippedCard[1].classList.add('close');
        flippedCard[0].classList.remove('flip'); //removes close, flip, stop from classList
        flippedCard[1].classList.remove('flip');
        flippedCard[0].classList.remove('close');
        flippedCard[1].classList.remove('close');
        flippedCard[0].classList.remove('stop');
        flippedCard[1].classList.remove('stop');
        flipped = []; //empty the array after not getting a match
        clicked = false;
    }, 1000);
}

function stopClick() {
    for(let card of cards) {
        card.classList.add('stop');
    }
}

function enableClick() {
    for (let card of cards) {
        card.classList.remove('stop');
    }
}

//what doesn't work:
//only first pair will flip over and then flip back if they don't match
//all other cards will stay flipped over
//end game is not triggered when all cards are clicked