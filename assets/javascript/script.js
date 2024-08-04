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
  const questionElement = document.getElementById('question');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const quizAppElement = document.getElementById('quiz-app');
  const resultsElement = document.createElement('div');
  resultsElement.setAttribute('id', 'results');
  resultsElement.classList.add('results', 'hide');
  quizAppElement.appendChild(resultsElement);
  
  let shuffledQuestions, currentQuestionIndex;
  let score = 0;
  
  
  
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
  
  /*  Stores player name and displays it at top of quiz  */
  
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
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
  }
  
  /*
  Call resetState function to clear the quiz interface, ensuring a fresh start for each question.
  Call showQuestion to populate the quiz with the next question and answers
  */
  
  function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
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
  */
  
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    });
  }
  
  /*  Diables the answer buttons so first click is final.
  Changes buttons colors via CSS class green = correct red = wrong ansers
  Set a small delay before next button displays*/ 
  
  function selectAnswer(selectedButton) {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        setStatusClass(button, button.dataset.correct);
    });
  
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    setStatusClass(selectedButton, correct);
  
    setTimeout(() => {
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide');
        } else {
            concludeQuiz();
        }
    }, 900); 
   
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
  }
  
  /* Clears the buttons classes so colors from answers reset for next question */
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }
  
  /* End of quiz function - hide questions and show results div */
  
  function concludeQuiz() {
    questionContainerElement.classList.add('hide');
    nextButton.classList.add('hide');
  
    resultsElement.classList.remove('hide');
    resultsElement.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your score: ${score} out of ${shuffledQuestions.length}</p>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
    quizAppElement.appendChild(resultsElement);
  }
  
  /*If restart chosen hide results, display questions and reset scores and questions couunt */
  
  function restartQuiz() {
    resultsElement.classList.add('hide');
    score = 0;
    currentQuestionIndex = 0;
    startGame();
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
  
  