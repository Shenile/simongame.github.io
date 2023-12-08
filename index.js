var buttonColours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var isGameOver = false;

$(document).on("keypress", function () {
  if (isGameOver) {
    restartGame();
  } else if (!gameStarted) {
    startNewGame();
  }
});

$(".btn").on("click", function () {
  if (gameStarted && !isGameOver) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  level++;

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level " + level);
}

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevelIndex) {
  for (var i = 0; i <= currentLevelIndex; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      handleGameOver();
      return;
    }
  }

  if (currentLevelIndex === gamePattern.length - 1) {
    setTimeout(function () {
      userClickedPattern = [];
      nextSequence();
    }, 1000);
  }
}

function handleGameOver() {
  $("body").addClass("game-over");
  playSound("wrong");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over! Press Any Key To Restart");
  isGameOver = true;
}

// Function to restart the game
function restartGame() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  gameStarted = false;
  isGameOver = false;
  $("#level-title").text("Press A Key To Start");
}

// Function to start a new game
function startNewGame() {
  gameStarted = true;
  nextSequence();
  $("#level-title").text("Level " + level);
}
