// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

// add variables to reference DOM elements
var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var startBtn = document.querySelector("#start");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

// reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav');
let sfxWrong = new Audio('assets/sfx/incorrect.wav');

function startQuiz() {
  // hide start screen
var startScreenEl = document.getElementById("start-screen");
startScreenEl.setAttribute("class", "hide");

  // un-hide questions section
questionsEl.removeAttribute("class");

  // start timer
timerId = setInterval(clockTick, 1000);

  // show starting time
timerEl.textContent = time;

  // call a function to show the next question
  getQuestion();

}

function getQuestion() {
  // get current question object from array
var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
var titleEl = document.getElementById("question-title");
titleEl.textContent = currentQuestion.title;

  // clear out any old question choices
choicesEl.innerHTML = "";

  // loop over the choices for each question
currentQuestion.choices.forEach(function(choice, i) { 

    // create a new button for each choice, setting the label and value for the button
  var choiceNode = document.createElement("button");
  choiceNode.setAttribute("class", "choice");
  choiceNode.setAttribute("value", choice);
  
  choiceNode.textContent = i + 1 + ". " + choice;

  // attach a click event listener to each choice
  choiceNode.onclick = questionClick;

  // display the choice button on the page
  choicesEl.appendChild(choiceNode); 

  });

}

function questionClick(event) {
  // identify the targeted button that was clicked on

  // if the clicked element is not a choice button, do nothing.


  // check if user guessed wrong
  // if () {
  // if they got the answer wrong, penalize time by subtracting 15 seconds from the timer
  // recall the timer is the score they get at the end
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

  // if they run out of time (i.e., time is less than zero) set time to zero so we can end quiz


  // display new time on page
  timerEl.textContent = time;
  feedbackEl.style.color = "red";
  feedbackEl.style.fontSize = "400%";

  // play "wrong" sound effect
  sfxWrong.play();

  // display "wrong" feedback on page
  feedbackEl.textContent = "Wrong!";

} else {
  // play "right" sound effect
  sfxRight.play();

  // display "right" feedback on page by displaying the text "Correct!" in the feedback element
  feedbackEl.textContent = "Correct!";
  feedbackEl.style.color = "green";
  feedbackEl.style.fontSize = "400%";

}
// flash right/wrong feedback on page for half a second
// set the feedback element to have the class of "feedback"
feedbackEl.setAttribute("class", "feedback");
setTimeout(function() {
  feedbackEl.setAttribute("class", "feedback hide");
}, 1000);

// after one second, remove the "feedback" class from the feedback element
// move to next question
currentQuestionIndex++;

// check if we've run out of questions
// if the time is less than zero and we have reached the end of the questions array,
// call a function that ends the quiz (quizEnd function)
// or else get the next question
if (currentQuestionIndex === questions.length) {
  quizEnd();
} else {
  getQuestion();
}

}


// define the steps of the QuizEnd function...when the quiz ends...
function quizEnd() {
  // stop the timer
  clearInterval(timerId);

  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide the "questions" section
  questionsEl.setAttribute("class", "hide");

}

// add the code in this function to update the time, it should be called every second
function clockTick() {
  // right here - update time
  time--;
  timerEl.textContent = time;

  // update the element to display the new time value
  // check if user ran out of time; if so, call the quizEnd() function
  if (time <= 0) {
    quizEnd();
  }
}

// complete the steps to save the high score
function saveHighScore() {

  // get the value of the initials input box
  var initials = initialsEl.value.trim();

  // make sure the value of the initials input box wasn't empty
  if (initials !== "") {

  // if it is not, check and see if there is a value of high scores in local storage
  var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

  // if there isn't any, then create a new array to store the high score
  var newScore = {
    score: time,
    initials: initials
  };

  // add the new initials and high score to the array

  // convert the array to a piece of text

  // store the high score in local storage

  // otherwise, if there are high scores stored in local storage,
  // retrieve the local storage value that has the high scores,
  // convert it back to an array,
  // add the new initials and high score to the array,
  // then convert the array back to a piece of text,
  // then store the new array (converted to text) back in local storage
  highscores.push(newScore);
  window.localStorage.setItem("highscores", JSON.stringify(highscores));

  // finally, redirect the user to the high scores page.
  window.location.href = "highscores.html";
}

}

// use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  // if the user presses the enter key, then call the saveHighscore function
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighScore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

// user clicks on an element containing choices
choicesEl.onclick = questionClick;

initialsEl.onkeyup = checkForEnter;
