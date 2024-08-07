/* Waits for DOM to load then hides the Next Button*/

document.addEventListener('DOMContentLoaded', () => {
    nextButton.classList.add('hide'); 
  });
  
  const welcomeDiv = document.getElementById("welcome");
  const signupDiv = document.getElementById("user_signup");
  const quizDiv = document.getElementById("active_quiz");
  const startButton = document.getElementById('start-btn');
  const nextButton = document.getElementById('next-btn');
  const questionContainerElement = document.getElementById('question-container');
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const quizAppElement = document.getElementById('quiz-app');
  const resultsElement = document.createElement('div');
  resultsElement.setAttribute('id', 'results');
  resultsElement.classList.add('results', 'hide');
  quizAppElement.appendChild(resultsElement);
  let shuffledQuestions, currentQuestionIndex;
  let score = 100;
  
  /* Function to display initial div and hide the sign up and quiz divs */
  function displayWelcome (){
      welcomeDiv.style.display = "flex";
      signupDiv.style.display = "none";
      quizDiv.style.display = "none";  
  }
  
  /* Runs this first so other divs are hidden on page load */
  displayWelcome();
  
  /* Display signup div and hide welcome and quiz divs */
  function displaySignup (){
      welcomeDiv.style.display = "none";
      signupDiv.style.display = "flex";
      quizDiv.style.display = "none";  
  }
  
  /*Allow enter key to submit player name in signup */
  document.getElementById('playerName').addEventListener('keydown', function(event) {
    // Check if Enter was pressed
    if (event.keyCode === 13) {
      // Prevent the default action
      event.preventDefault();
      // Trigger the button click
      document.getElementById('signupButton').click();
    }
  });

 /* Display quiz div and hide welcome and signup divs */
  function displayQuiz (){
      welcomeDiv.style.display = "none";
      signupDiv.style.display = "none";
      quizDiv.style.display = "flex";
  }
  
  // Modal for introduction and overview
  let modal = document.getElementById("overviewModal");
  
  // Modal Opening triggered by button press in welcome div
  let btnModal = document.getElementById("btn_rules");
  btnModal.onclick = function() {
    modal.style.display = "block";
  };
  
  // Modal closes when clicking on the span containing the X
  let spanModalClose = document.getElementsByClassName("close")[0];
  spanModalClose.onclick = function() {
    modal.style.display = "none";
  };
  
  // Modal also closes if outside the modal window is clicked
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  
  let btnStart = document.getElementById("btn_register");
  btnStart.addEventListener("click", displaySignup);

  /*  Stores player name and displays it at top of quiz 
  If player attempts to skip alerts to enter a name */
  function nameEntered () {
  let playerName = document.getElementById("playerName").value;
  if (playerName == "") { alert("Please enter a name")}
  else displayQuiz ();
  document.getElementById("welcomePlayer").innerHTML = "It's great to have you here "  + playerName + ". ";
  }

  /* When start button is pressed 
  Hide the start button adding hide class to it.
  Shuffle the questions for randomness each game.
  Set Current questions to 0 or reset if already played.
  Remove the hide class from the question container so it displays (Will hide when results are called)
  Call the next question function 
  When next button is pressed
  Add 1 to the current question count.
  Call the next question function.
  */
  
  startButton.addEventListener('click', startGame);
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
  });
  
  function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    let playerName = document.getElementById("playerName").value;
    document.getElementById("welcomePlayer").innerHTML = "Select an answer "  + playerName + ". ";
  }
  
  /*
  Call resetState function to clear the quiz interface, ensuring a fresh start for each question.
  Call showQuestion to populate the quiz with the next question and answers
  */
  
  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    document.getElementById("welcomePlayer").innerHTML = "Remember - A pass is better than a wrong answer.";
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  /* 
  Update the text of the question element with the current question.
  Create a button display for each answer.
  Assign a data attribute to button with correct answer for evaluation.
  Add an event listener to each button to handle answer selection.
  Add a class to answer buttons and a different class to pass button for css styling
  */
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;  

        if (answer.pass) {
        button.classList.add('btnPass');
        button.dataset.pass = answer.pass;
        }
        else {
            button.classList.add('btn');
            }
        
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    });
  }
  
  /*  Diables the answer buttons so first click is final.
  Changes buttons colors via CSS class green = correct red = wrong answers
  */ 
  function selectAnswer(selectedButton) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);  
    });
  
/* Set up Scoring - 20 points for a correct answer, -10 points for a wrong answer */
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score = score+20;}
    else score = score-10;
    
    setStatusClass(selectedButton, correct);

    /* Set up scoring for pressing Pass button 
    A pass is worth 5 points but is set as 15to override the -10 from not getting answer correct above*/
    const pass = selectedButton.dataset.pass;
    if (pass)
        score=score+15;
    
    /* Set a small delay before next button displays and quiz finish is called if last question
    If questions max amount reached call the end of quiz function
    Uses the welcomeplayer message to provide a feedback / live score */
    setTimeout(() => {
        if (10 > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
            document.getElementById("welcomePlayer").innerHTML = "Your current score is " +score + " points";
        } else {
            concludeQuiz();
        }
    }, 900); 
  }
  
  /* Adds class of correct or wrong to the answers */
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
  }

  /* Clears the buttons classes so colours from answers reset for next question */
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  /* End of quiz function - hide questions and show results in a created element */
  function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
    welcomePlayer.classList.add('hide');
    resultsElement.classList.remove('hide');
    resultsElement.innerHTML = `
        <h3>Quiz Completed!</h3>
        <p>You scored: ${score} out of a possible 300!</p>
        <button class="restartButton" onclick="restartQuiz()">Restart Quiz</button>
        <button class="restartButton" onclick="resetQuiz()">New Player</button>
    `;
    quizAppElement.appendChild(resultsElement);
  }
  
  /*If restart chosen hide results, display questions and reset scores and questions couunt */
  function restartQuiz() {
    resultsElement.classList.add('hide');
    score = 100;
    currentQuestionIndex = 0;
    startGame();
    welcomePlayer.classList.remove('hide');
    let playerName = document.getElementById("playerName").value;
    document.getElementById("welcomePlayer").innerHTML = "Welcome back "  + playerName + ". ";
  }
  
  function resetQuiz() {
    resultsElement.classList.add('hide');
    score = 100;
    currentQuestionIndex = 0;
    startGame();
    welcomePlayer.classList.remove('hide');
    displayWelcome();
  }
  
  /* Quiz Questions */
  
  const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Rome', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Madrid', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Saturn', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Charles Dickens', correct: false },
            { text: 'Mark Twain', correct: false },
            { text: 'J.K. Rowling', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'What is the largest mammal in the world?',
        answers: [
            { text: 'Elephant', correct: false },
            { text: 'Giraffe', correct: false },
            { text: 'Hippopotamus', correct: false },
            { text: 'Blue Whale', correct: true },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'What is the smallest prime number?',
        answers: [
            { text: '1', correct: false },
            { text: '2', correct: true },
            { text: '3', correct: false },
            { text: '5', correct: false },
            { text: 'Pass (5 Points)', pass: true}
        ]
    },
    {
        question: 'What is the chemical symbol for water?',
        answers: [
            { text: 'O2', correct: false },
            { text: 'H2O', correct: true },
            { text: 'CO2', correct: false },
            { text: 'HO', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Who painted the Mona Lisa?',
        answers: [
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Vincent van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Michelangelo', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Which element has the atomic number 1?',
        answers: [
            { text: 'Helium', correct: false },
            { text: 'Oxygen', correct: false },
            { text: 'Hydrogen', correct: true },
            { text: 'Carbon', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'What is the longest river in the world?',
        answers: [
            { text: 'Amazon', correct: false },
            { text: 'Nile', correct: true },
            { text: 'Yangtze', correct: false },
            { text: 'Mississippi', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Which country is known as the Land of the Rising Sun?',
        answers: [
            { text: 'China', correct: false },
            { text: 'Japan', correct: true },
            { text: 'South Korea', correct: false },
            { text: 'Thailand', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Who was the first President of the United States?',
        answers: [
            { text: 'Thomas Jefferson', correct: false },
            { text: 'George Washington', correct: true },
            { text: 'Abraham Lincoln', correct: false },
            { text: 'John Adams', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'What is the square root of 64?',
        answers: [
            { text: '6', correct: false },
            { text: '7', correct: false },
            { text: '8', correct: true },
            { text: '9', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Which is the largest ocean on Earth?',
        answers: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'What is the currency of Japan?',
        answers: [
            { text: 'Dollar', correct: false },
            { text: 'Yen', correct: true },
            { text: 'Euro', correct: false },
            { text: 'Pound', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Which continent is the Sahara Desert located in?',
        answers: [
            { text: 'Asia', correct: false },
            { text: 'Africa', correct: true },
            { text: 'South America', correct: false },
            { text: 'Australia', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Who is known as the Father of Computer Science?',
        answers: [
            { text: 'Alan Turing', correct: true },
            { text: 'Albert Einstein', correct: false },
            { text: 'Isaac Newton', correct: false },
            { text: 'Nikola Tesla', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'What is the freezing point of water in degrees Celsius?',
        answers: [
            { text: '32', correct: false },
            { text: '0', correct: true },
            { text: '100', correct: false },
            { text: '-1', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answers: [
            { text: 'F. Scott Fitzgerald', correct: false },
            { text: 'Ernest Hemingway', correct: false },
            { text: 'Harper Lee', correct: true },
            { text: 'John Steinbeck', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'What is the most abundant gas in Earth\'s atmosphere?',
        answers: [
            { text: 'Oxygen', correct: false },
            { text: 'Nitrogen', correct: true },
            { text: 'Carbon Dioxide', correct: false },
            { text: 'Argon', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    },
    {
        question: 'Which planet is closest to the sun?',
        answers: [
            { text: 'Mercury', correct: true },
            { text: 'Venus', correct: false },
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: false },
            { text: 'Pass (5 Points)', pass: true } 
        ]
    }
  ];
  
  