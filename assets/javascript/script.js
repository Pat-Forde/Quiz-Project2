document.addEventListener('DOMContentLoaded', () => {
  next_btn.classList.add('hide'); // Initially hide the 'Next' button
});

const welcomeDiv = document.getElementById("welcome");
const signupDiv = document.getElementById("user_signup");
const quizDiv = document.getElementById("active_quiz");
const resultsDiv = document.getElementById("resultsDisplay");
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





var myQuestions = [
  {
    question: "What is 10/2?",
    answers: {
      a: '3',
      b: '5',
      c: '115'
    },
    correctAnswer: 'b'
  },
  {
    question: "What is 30/3?",
    answers: {
      a: '3',
      b: '5',
      c: '10'
    },
    correctAnswer: 'c'
  }
];

/*  All Of The Below Code was used to test if a simple javascript quiz sourced from 
https://simplestepscode.com/javascript-quiz-tutorial/ will work within the structure of the
existing project.......

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

  function showQuestions(questions, quizContainer){
    // we'll need a place to store the output and the answer choices
    var output = [];
    var answers;

    // for each question...
    for(var i=0; i<questions.length; i++){
      
      // first reset the list of answers
      answers = [];

      // for each available answer...
      for(letter in questions[i].answers){

        // ...add an html radio button
        answers.push(
          '<label>'
            + '<input type="radio" name="question'+i+'" value="'+letter+'">'
            + letter + ': '
            + questions[i].answers[letter]
          + '</label>'
        );
      }

      // add this question and its answers to the output
      output.push(
        '<div class="question">' + questions[i].question + '</div>'
        + '<div class="answers">' + answers.join('') + '</div>'
      );
    }

    // finally combine our output list into one string of html and put it on the page
    quizContainer.innerHTML = output.join('');
  }


  function showResults(questions, quizContainer, resultsContainer){
    
    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
    
    // keep track of user's answers
    var userAnswer = '';
    var numCorrect = 0;
    
    // for each question...
    for(var i=0; i<questions.length; i++){

      // find selected answer
      userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
      
      // if answer is correct
      if(userAnswer===questions[i].correctAnswer){
        // add to the number of correct answers
        numCorrect++;
        
        // color the answers green
        answerContainers[i].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[i].style.color = 'red';
      }
    }

    // show number of correct answers out of total
    resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
  }

  // show questions right away
  showQuestions(questions, quizContainer);
  
  // on submit, show results
  submitButton.onclick = function(){
    showResults(questions, quizContainer, resultsContainer);
  }

}

*/