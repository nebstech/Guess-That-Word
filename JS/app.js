
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
let correctGuesses = 0;
// selecting theme container and giving it a var
let theme = document.querySelector('.themes-container');


document.querySelector('#theme-open').onclick = () => {
   theme.classList.add('active');
   document.body.style.paddingRight = '350px';
}

document.querySelector('#theme-close').onclick = () => {
   theme.classList.remove('active');
   document.body.style.paddingRight = '0px';
}


document.querySelectorAll('.theme-colors div').forEach(color => {
   color.onclick = () => {
   let background = window.getComputedStyle(color).backgroundColor;
   document.querySelector(':root').style.setProperty('--main-color', background);
   updateCanvasColor();
   }
});



// Selecting the canvas element and getting its 2D context
document.addEventListener('DOMContentLoaded', () => {
   // Selecting the canvas element and getting its 2D context
   let canvas = document.querySelector('canvas');
   let ctx = canvas.getContext('2d');

   // Setting canvas width and height to match window dimensions
   let width = canvas.width = window.innerWidth;
   let height = canvas.height = window.innerHeight;

   // Creating a string with characters for the matrix effect
   let str = 'A+js js:2 @dfs 17 tr YY ufds MSr $!& ^dfs $Ew er 3H # $ ^ . ;) ,: !';

   let matrix = str.split(''); // splitting each letter of str
   let font = 12; // Font size for rendering text
   let col = width / font;// Number of columns based on canvas width
   let arr = []; // Array to store vertical position

   // Initializing the arr array with 1 for each column
   for (let i = 0; i < col; i++) {
      arr[i] = 1;
   }

   // Function to draw the matrix effect
   const draw = () => {
     // Filling the canvas with a semi-transparent black color for fading effect
   ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
   ctx.fillRect(0, 0, width, height);
     // Setting text color to green and font style
   ctx.fillStyle = '#00FF00';
   ctx.font = `${font}px system-ui`;

   for (let i = 0; i < arr.length; i++) {
       // Selecting a random character from the matrix array
       let txt = matrix[Math.floor(Math.random() * matrix.length)];
       ctx.fillText(txt, i * font, arr[i] * font);

       // if text reaches bottom of screen reset the position
       if (arr[i] * font > height && Math.random() > 0.975) {
         arr[i] = 0;
      }
       arr[i]++; // vertical position for the next frame
      }
   }
 
   setInterval(draw, 30);
});

window.addEventListener('resize', () => location.reload());


document.addEventListener('DOMContentLoaded', () => {
   const startBtn = document.querySelector('.start');
   const mainContent = document.querySelector('main');
 
   startBtn.addEventListener('click', () => {
     startBtn.style.display = 'none'; // Hide the start button
     mainContent.style.display = 'block'; // Show the main content
   const backgroundAudio = document.getElementById('backgroundAudio');
if (backgroundAudio) {
   backgroundAudio.volume = 0.01; 
   backgroundAudio.play();
} else {
   console.error('audio element not found.');
}

     initGame(); // Initialize the game
   });
 });

const resetGame = () => {
   clearInterval(timer); // Clear any existing timer
   correctGuesses = 0; // // Reset correctGuesses to 0
   updateTally(correctGuesses);
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
         const gameOverAudio = document.getElementById('gameOverAudio');
         if (gameOverAudio) {
            gameOverAudio.volume = 0.05;
            gameOverAudio.play();
         } else {
            console.error('Game over audio element not found.');
         }
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
      const correctAudio = document.getElementById('correctAudio');
         if (correctAudio) {
            correctAudio.volume = 0.1;
            correctAudio.play();
         } else {
            console.error('audio element not found.');
         }
      initGame();

      correctGuesses++;
      updateTally(correctGuesses);
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

function checkGuess(userGuess, correctWord) {
   if (userGuess.toLowerCase() === correctWord.toLowerCase()) {
     // Increment correctGuesses if the guess is correct
   correctGuesses++;

     // Update UI to display the updated tally
   updateTally(correctGuesses);
   
     return true; // Return true for correct guess
   }
   
   return false; // Return false for incorrect guess
}

function updateTally(count) {
   const tallyElement = document.getElementById('correctGuesses');
   if (tallyElement) {
      tallyElement.textContent = count;
   }
}

const infoBtn = document.querySelector('.info-button');
const instructionsModal = document.getElementById('instructionsModal');

infoBtn.addEventListener('click', () => {
   // Pause the timer by clearing the interval
   clearInterval(timer);

   // Show the instructions modal
   instructionsModal.style.display = 'block';
});

// Close the instructions modal when the user clicks on the close button
const closeInstructionsBtn = document.querySelector('.close-instructions');
closeInstructionsBtn.addEventListener('click', () => {
   // Hide the instructions modal
   instructionsModal.style.display = 'none';

   // Resume the timer by starting it again
   startTimer(parseInt(timeText.innerHTML));
});



span.onclick = function() {
   modal.style.display = 'none';
   initGame(); // Reset the game
}
newClose.onclick = function() {
   secondModal.style.display = 'none';
}


