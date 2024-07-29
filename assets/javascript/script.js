document.addEventListener('DOMContentLoaded', () => {
  next_btn.classList.add('hide'); // Initially hide the 'Next' button
});

const welcomeDiv = document.getElementById("welcome");
const signupDiv = document.getElementById("user_signup");
const quizDiv = document.getElementById("active_quiz");
const resultsDiv = document.getElementById("results");
const startButton = document.getElementById('start_btn');
const nextButton = document.getElementById('next_btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer_buttons');
let shuffledQuestions ;
let currentQuestionIndex;




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

