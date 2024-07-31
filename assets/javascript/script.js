/* Waits for DOM to load then hides the Next Button*/

document.addEventListener('DOMContentLoaded', () => {
  nextButton.classList.add('hide'); 
});



const welcomeDiv = document.getElementById("welcome");
const signupDiv = document.getElementById("user_signup");
const quizDiv = document.getElementById("active_quiz");
const resultsDiv = document.getElementById("resultsDisplay");


const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('questions');
const answerButtonsElement = document.getElementById('answers');

let shuffledQuestions, currentQuestionIndex;


/* Functions to display each div - initially for testing purposes linking to buttons placed on index page */
function displayWelcome (){
    welcomeDiv.style.display = "flex"
    signupDiv.style.display = "none";
    quizDiv.style.display = "none";
    resultsDiv.style.display = "none";
}

/* Runs this first so other divs are hidden on page load */
displayWelcome()

let btn1 = document.getElementById("btn_welcome");
btn1.addEventListener("click", displayWelcome);

function displaySignup (){
    welcomeDiv.style.display = "none"
    signupDiv.style.display = "flex";
    quizDiv.style.display = "none";
    resultsDiv.style.display = "none";
}

let btn2 = document.getElementById("btn_signup");
btn2.addEventListener("click", displaySignup);

function displayQuiz (){
    welcomeDiv.style.display = "none"
    signupDiv.style.display = "none";
    quizDiv.style.display = "flex";
    resultsDiv.style.display = "none";
}

let btn3 = document.getElementById("btn_quiz");
btn3.addEventListener("click", displayQuiz);

function displayResults (){
    welcomeDiv.style.display = "none"
    signupDiv.style.display = "none";
    quizDiv.style.display = "none";
    resultsDiv.style.display = "flex";
}

let btn4 = document.getElementById("btn_results");
btn4.addEventListener("click", displayResults);

// Modal for introduction and overview
var modal = document.getElementById("overviewModal");

// Modal Opening triggered by button press in welcome div
var btnModal = document.getElementById("btn_rules");
btnModal.onclick = function() {
  modal.style.display = "block";
}

// Modal closes when clicking on the span containing the X
var spanModalClose = document.getElementsByClassName("close")[0];
spanModalClose.onclick = function() {
  modal.style.display = "none";
}

// Modal also closes if outside the modal window is clicked
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let btnStart = document.getElementById("btn_register");
btnStart.addEventListener("click", displaySignup);

function nameEntered () {

let playerName = document.getElementById("playerName").value;
console.log (playerName);
displayQuiz ();
document.getElementById("welcomePlayer").innerHTML = "Welcome "  + playerName + " Here is your first question"

}

/* When start button is pressed 
Hide the start button adding hide class to it.
Shuffle the questions for randomness each game.
Set Current questions to 0 or reset if already played.
Remove the hide class from the question container so it displays (Will hide when results are called)
Call the next question function */

startButton.addEventListener('click', startGame);

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}







/* Quiz Questions */

const questions = [
  {
      question: 'What is the capital of France?',
      answers: [
          { text: 'Rome', correct: false },
          { text: 'Paris', correct: true },
          { text: 'Madrid', correct: false },
          { text: 'Berlin', correct: false }
      ]
  },
  {
      question: 'Which planet is known as the Red Planet?',
      answers: [
          { text: 'Venus', correct: false },
          { text: 'Mars', correct: true },
          { text: 'Jupiter', correct: false },
          { text: 'Saturn', correct: false }
      ]
  },
  {
      question: 'Who wrote "Romeo and Juliet"?',
      answers: [
          { text: 'Charles Dickens', correct: false },
          { text: 'William Shakespeare', correct: true },
          { text: 'Mark Twain', correct: false },
          { text: 'J.K. Rowling', correct: false }
      ]
  },
  {
      question: 'What is the largest mammal in the world?',
      answers: [
          { text: 'Elephant', correct: false },
          { text: 'Blue Whale', correct: true },
          { text: 'Giraffe', correct: false },
          { text: 'Hippopotamus', correct: false }
      ]
  },
  {
      question: 'What is the smallest prime number?',
      answers: [
          { text: '1', correct: false },
          { text: '2', correct: true },
          { text: '3', correct: false },
          { text: '5', correct: false }
      ]
  },
  {
      question: 'What is the chemical symbol for water?',
      answers: [
          { text: 'O2', correct: false },
          { text: 'H2O', correct: true },
          { text: 'CO2', correct: false },
          { text: 'HO', correct: false }
      ]
  },
  {
      question: 'Who painted the Mona Lisa?',
      answers: [
          { text: 'Vincent van Gogh', correct: false },
          { text: 'Leonardo da Vinci', correct: true },
          { text: 'Pablo Picasso', correct: false },
          { text: 'Michelangelo', correct: false }
      ]
  },
  {
      question: 'Which element has the atomic number 1?',
      answers: [
          { text: 'Helium', correct: false },
          { text: 'Hydrogen', correct: true },
          { text: 'Oxygen', correct: false },
          { text: 'Carbon', correct: false }
      ]
  },
  {
      question: 'What is the longest river in the world?',
      answers: [
          { text: 'Amazon', correct: false },
          { text: 'Nile', correct: true },
          { text: 'Yangtze', correct: false },
          { text: 'Mississippi', correct: false }
      ]
  },
  {
      question: 'Which country is known as the Land of the Rising Sun?',
      answers: [
          { text: 'China', correct: false },
          { text: 'Japan', correct: true },
          { text: 'South Korea', correct: false },
          { text: 'Thailand', correct: false }
      ]
  },
  {
      question: 'Who was the first President of the United States?',
      answers: [
          { text: 'Thomas Jefferson', correct: false },
          { text: 'George Washington', correct: true },
          { text: 'Abraham Lincoln', correct: false },
          { text: 'John Adams', correct: false }
      ]
  },
  {
      question: 'What is the square root of 64?',
      answers: [
          { text: '6', correct: false },
          { text: '8', correct: true },
          { text: '7', correct: false },
          { text: '9', correct: false }
      ]
  },
  {
      question: 'Which is the largest ocean on Earth?',
      answers: [
          { text: 'Atlantic Ocean', correct: false },
          { text: 'Pacific Ocean', correct: true },
          { text: 'Indian Ocean', correct: false },
          { text: 'Arctic Ocean', correct: false }
      ]
  },
  {
      question: 'What is the currency of Japan?',
      answers: [
          { text: 'Dollar', correct: false },
          { text: 'Yen', correct: true },
          { text: 'Euro', correct: false },
          { text: 'Pound', correct: false }
      ]
  },
  {
      question: 'Which continent is the Sahara Desert located in?',
      answers: [
          { text: 'Asia', correct: false },
          { text: 'Africa', correct: true },
          { text: 'South America', correct: false },
          { text: 'Australia', correct: false }
      ]
  },
  {
      question: 'Who is known as the Father of Computer Science?',
      answers: [
          { text: 'Albert Einstein', correct: false },
          { text: 'Alan Turing', correct: true },
          { text: 'Isaac Newton', correct: false },
          { text: 'Nikola Tesla', correct: false }
      ]
  },
  {
      question: 'What is the freezing point of water in degrees Celsius?',
      answers: [
          { text: '32', correct: false },
          { text: '0', correct: true },
          { text: '100', correct: false },
          { text: '-1', correct: false }
      ]
  },
  {
      question: 'Who wrote "To Kill a Mockingbird"?',
      answers: [
          { text: 'F. Scott Fitzgerald', correct: false },
          { text: 'Harper Lee', correct: true },
          { text: 'Ernest Hemingway', correct: false },
          { text: 'John Steinbeck', correct: false }
      ]
  },
  {
      question: 'What is the most abundant gas in Earth\'s atmosphere?',
      answers: [
          { text: 'Oxygen', correct: false },
          { text: 'Nitrogen', correct: true },
          { text: 'Carbon Dioxide', correct: false },
          { text: 'Argon', correct: false }
      ]
  },
  {
      question: 'Which planet is closest to the sun?',
      answers: [
          { text: 'Venus', correct: false },
          { text: 'Mercury', correct: true },
          { text: 'Earth', correct: false },
          { text: 'Mars', correct: false }
      ]
  }
];

