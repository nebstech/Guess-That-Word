const wordTxt = document.querySelector('.word');
const hintTxt = document.querySelector('.hint span');
const timeText = document.querySelector('.time b')
const refreshBtn = document.querySelector('.refresh-button');
const enterBtn = document.querySelector('.check-button');
const userInput = document.querySelector('input[type="text"]');
let correctWord = null;
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
const secondModal = document.getElementById('newModal');
const newClose = document.getElementsByClassName('newclose')[0];
const thirdModal = document.getElementById('gameOverModal');
const resetBtn = document.getElementById('resetBtn');
let timer = null; 

const resetGame = () => {
   clearInterval(timer); // Clear any existing timer
   initGame(); // Start a new game
   thirdModal.style.display = 'none'; // Hide the game over modal
};

// Event listener for the "Play Again" button
resetBtn.addEventListener('click', resetGame);

const startTimer = maxTime => {
   clearInterval(timer); // Clear any existing timer before starting a new one
   timer = setInterval(() => {
      if (maxTime > 0) {
         maxTime--;
         timeText.innerHTML = maxTime; // Update timeText directly
      } else {
         clearInterval(timer); // Clear the timer when time is up
         thirdModal.style.display = 'block'; // Display the game over modal
         userInput.value = ''; // Reset the user input
      }
   }, 1000);
}

const initGame = () => {
   startTimer(25); // calling starttimer with init
   let randomWord = words[Math.floor(Math.random() * words.length)]; // grab random word from array
   let wordArr = randomWord.word.split(''); // split each letter of word
   for (let i = wordArr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random number
      // shuffle and swap letters
      [wordArr[i], wordArr[j]] = [wordArr[j], wordArr[i]]
   }
   correctWord = randomWord.word;
   wordTxt.innerHTML = wordArr.join(''); // passing shuffled word to HTML
   hintTxt.innerHTML = randomWord.hint; //pass hint
   userInput.value = "";
   userInput.setAttribute('maxlength', correctWord.length); // max length input allowed
   console.log(randomWord);
}

initGame();

refreshBtn.addEventListener('click', initGame); // runs init function to refresh word


enterBtn.addEventListener('click', function() {
   const userInputValue = userInput.value.trim().toLowerCase(); // get user input

   //checks if correct word was entered and prompts user if word is correct
   if (userInputValue === correctWord.toLowerCase()) {
      modal.style.display = 'block';
      setTimeout(function() {
         modal.style.display = 'none';
      }, 1000);
      userInput.value = '';
      initGame();

   }if (!userInputValue) {
      userInput.value = ''; // checks if there is text on the input

   // lets user know the word they entered is incorrect
   }else {
      secondModal.style.display = 'block';
      setTimeout(function() {
         secondModal.style.display = 'none';
      }, 1500);

      userInput.value = '';
   }
});

span.onclick = function() {
   modal.style.display = 'none';
   initGame(); // Reset the game
}
newClose.onclick = function() {
   secondModal.style.display = 'none';
}



   





// 1. Define the required variables to track state of game.
     // define initGame();
     // render function to render game over when next word is clicked


   // create JS that holds an array of all words
      // word: '...' hint: '...'
      // define var that randomizes words. 
      // get random obj from words.



// split each letter of words in words array.
  // shuffle letters randomlt



// Use selector to add randomized word to show up on HTML
   // pass shuffled words as word text



// grab inputfield and force to lowercase and give it a variable named check word
   // impliment hint text under word with selctor 


// create submit/check btn for user to submit answer 
  // create refresh btn that spits out a new rnadomized word
   // add check word function that validates if input was correct 



// create a correct word var and pass random word generated to it
    // check is user input is equaled to correct word 



// add alert that lets user know if the input was incorrect 
    // if users input is correct, spit out another word
    // return an alert to prompt user for input if nothing was typed

// set max input value to word length

// add timer 
  // call timer with init function
  // time decreases by 1
  // if correct reset timer // restart game