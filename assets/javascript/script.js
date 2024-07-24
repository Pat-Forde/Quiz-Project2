
const welcomeDiv = document.getElementById("welcome");
const signupDiv = document.getElementById("user_signup");
const quizDiv = document.getElementById("active_quiz");
const resultsDiv = document.getElementById("results");




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