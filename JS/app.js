const wordTxt = document.querySelector('.word'); // Selects the element to display the shuffled word
const hintTxt = document.querySelector('.hint span'); // Selects the element to display the hint
const timeText = document.querySelector('.time b'); // Selects the element to display the time
const refreshBtn = document.querySelector('.refresh-button'); // Selects the refresh button
const enterBtn = document.querySelector('.check-button'); // Selects the enter button
const userInput = document.querySelector('input[type="text"]'); // Selects the user input field
let correctWord = null; // Variable to store the correct word
const modal = document.getElementById('myModal'); // Selects the modal for correct guesses
const span = document.getElementsByClassName('close')[0]; // Selects the close button for the modal
const secondModal = document.getElementById('newModal'); // Selects the modal for incorrect guesses
const newClose = document.getElementsByClassName('newclose')[0]; // Selects the close button for the second modal
const thirdModal = document.getElementById('gameOverModal'); // Selects the game over modal
const resetBtn = document.getElementById('resetBtn'); // Selects the reset button
let timer = null; // Variable to store the timer

document.addEventListener('DOMContentLoaded', () => {
   const startBtn = document.querySelector('.start');
   const mainContent = document.querySelector('main');
 
   startBtn.addEventListener('click', () => {
     startBtn.style.display = 'none'; // Hide the start button
     mainContent.style.display = 'block'; // Show the main content
     initGame(); // Initialize the game
   });
 });

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

   // Check if the timer has already expired
   if (timeText.innerHTML === '0') {
      thirdModal.style.display = 'block'; // Display the game over modal
      userInput.value = ''; // Reset the user input
      return; // Exit the function early
   }
}



refreshBtn.addEventListener('click', initGame); // runs init function to refresh word

enterBtn.addEventListener('click', checkUserInput); // calls checkUserInput function when Enter button is clicked

// Event listener to handle Enter key press in the input field
userInput.addEventListener('keypress', function(event) {
   // Check if the Enter key was pressed (key code 13)
   if (event.keyCode === 13) {
      // Prevent the default behavior of the Enter key (form submission)
      event.preventDefault();
      checkUserInput();
   }
});

function checkUserInput() {
   const userInputValue = userInput.value.trim().toLowerCase(); // get user input

   //checks if correct word was entered and prompts user if word is correct
   if (userInputValue === correctWord.toLowerCase()) {
      modal.style.display = 'block';
      setTimeout(function() {
         modal.style.display = 'none';
      }, 1000);
      userInput.value = '';
      initGame();
   } else if (!userInputValue) {
      userInput.value = ''; // checks if there is text on the input
   } else {
      secondModal.style.display = 'block';
      setTimeout(function() {
         secondModal.style.display = 'none';
      }, 1500);

      userInput.value = '';
   }
}

span.onclick = function() {
   modal.style.display = 'none';
   initGame(); // Reset the game
}
newClose.onclick = function() {
   secondModal.style.display = 'none';
}


